import "server-only";
import { createHmac } from "crypto";

// NCP(Naver Cloud Platform) SENS SMS — beauty-book 구현 포팅
// 발신번호는 NCP 콘솔에 사전등록된 번호여야 함.

const SENS_HOST = "https://sens.apigw.ntruss.com";

type SmsEnv = {
  serviceId: string;
  accessKey: string;
  secretKey: string;
  from: string;
};

/** 환경변수에서 SENS 설정을 읽음. 하나라도 비면 null (→ 미설정 = mock 동작) */
function readEnv(): SmsEnv | null {
  const serviceId = process.env.NCP_SENS_SERVICE_ID;
  const accessKey = process.env.NCP_ACCESS_KEY;
  const secretKey = process.env.NCP_SECRET_KEY;
  const from = process.env.NCP_SMS_FROM;
  if (!serviceId || !accessKey || !secretKey || !from) return null;
  return { serviceId, accessKey, secretKey, from };
}

/** provider 가 'sens' 가 아니면 실제 발송하지 않고 로그만 남김 */
function isMock(): boolean {
  return process.env.SMS_PROVIDER !== "sens";
}

function makeSignature(
  method: string,
  uri: string,
  timestamp: string,
  accessKey: string,
  secretKey: string
): string {
  const message = `${method} ${uri}\n${timestamp}\n${accessKey}`;
  return createHmac("sha256", secretKey).update(message).digest("base64");
}

/** 휴대폰 번호 정규화 — 하이픈/공백 제거, 숫자만 (예: "010-1234-5678" → "01012345678") */
function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export type SmsResult = { ok: true; mock: boolean } | { ok: false; error: string };

type SendOptions = {
  /** SMS(단문, ~90byte) | LMS(장문, ~2000byte). 기본 SMS */
  type?: "SMS" | "LMS";
  /** LMS 제목 (LMS일 때만 사용) */
  subject?: string;
};

/**
 * 단건 SMS/LMS 발송. 실패해도 예외를 던지지 않고 결과 객체로 반환 —
 * 폼 제출(예약/문의) 트랜잭션을 SMS 실패가 막지 않도록 하기 위함.
 */
export async function sendSms(
  to: string,
  content: string,
  options: SendOptions = {}
): Promise<SmsResult> {
  const phone = normalizePhone(to);
  const type = options.type ?? "SMS";

  if (isMock() || !readEnv()) {
    console.info(`[SMS:mock] type=${type} to=${phone} content=${content}`);
    return { ok: true, mock: true };
  }

  const env = readEnv()!;
  const uri = `/sms/v2/services/${env.serviceId}/messages`;
  const timestamp = String(Date.now());

  try {
    const res = await fetch(`${SENS_HOST}${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": env.accessKey,
        "x-ncp-apigw-signature-v2": makeSignature(
          "POST",
          uri,
          timestamp,
          env.accessKey,
          env.secretKey
        ),
      },
      body: JSON.stringify({
        type,
        from: env.from,
        content,
        ...(type === "LMS" && options.subject
          ? { subject: options.subject }
          : {}),
        messages: [{ to: phone }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[SMS] 발송 실패 status=${res.status} body=${body}`);
      return { ok: false, error: `SMS 발송 실패 (${res.status})` };
    }

    console.info(`[SMS] 발송 완료 to=${phone} status=${res.status}`);
    return { ok: true, mock: false };
  } catch (e) {
    console.error("[SMS] 발송 예외", e);
    return { ok: false, error: e instanceof Error ? e.message : "SMS 발송 오류" };
  }
}

/** 접수 완료 시 고객에게 보낼 조회코드 안내 메시지 (LMS) */
export function buildLookupSms(lookupCode: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://weflow-web-phi.vercel.app";
  return [
    `[WEFLOW] 접수가 완료되었습니다.`,
    ``,
    `조회코드: ${lookupCode}`,
    ``,
    `진행 상황은 아래 링크에서 조회코드와 휴대폰 번호 뒤 4자리로 확인하실 수 있어요.`,
    `${base}/lookup`,
  ].join("\n");
}

/** 접수 완료 고객에게 조회코드 안내 LMS 발송 (fire-and-forget 용 헬퍼) */
export async function sendLookupSms(
  phone: string,
  lookupCode: string
): Promise<SmsResult> {
  return sendSms(phone, buildLookupSms(lookupCode), {
    type: "LMS",
    subject: "WEFLOW 접수 완료",
  });
}
