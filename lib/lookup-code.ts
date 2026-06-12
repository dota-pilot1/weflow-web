import { randomBytes } from "crypto";

// 0/O, 1/I/L 등 혼동되는 글자 제외한 31자
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/** 접수 조회 코드 생성 (예: WF-2J7KQR) */
export function generateLookupCode(): string {
  const bytes = randomBytes(6);
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return `WF-${body}`;
}

/** 사용자 입력 코드를 표준형으로 정규화 ("wf-2j7kqr", "2J7KQR" → "WF-2J7KQR") */
export function normalizeLookupCode(input: string): string | null {
  const raw = input.trim().toUpperCase().replace(/\s/g, "");
  const body = raw.startsWith("WF-") ? raw.slice(3) : raw;
  if (!/^[2-9A-Z]{6}$/.test(body)) return null;
  return `WF-${body}`;
}
