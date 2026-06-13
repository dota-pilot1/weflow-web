/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi, describe, it, expect, beforeEach } from "vitest";
import { POST } from "@/app/api/reservations/route";
import { supabaseAdmin } from "@/lib/supabase/server";

// Mock Supabase admin client with support for query chaining
vi.mock("@/lib/supabase/server", () => {
  const queryChain = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockImplementation(() => Promise.resolve({ data: [], error: null })),
    single: vi.fn().mockImplementation(() => Promise.resolve({ data: { id: "test-reservation-id" }, error: null })),
  };

  return {
    supabaseAdmin: {
      from: vi.fn().mockReturnValue(queryChain),
    },
  };
});

// Mock lookup code generator
vi.mock("@/lib/lookup-code", () => {
  return {
    generateLookupCode: () => "WF-TEST12",
  };
});

describe("POST /api/reservations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("정상적인 입력이 들어오면 예약을 생성하고 200 응답과 lookupCode를 반환한다", async () => {
    const payload = {
      name: "테스터",
      phone: "010-1234-5678",
      desiredDate: "2026-06-15",
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: true,
      message: "문의 내용입니다.",
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({
      ok: true,
      id: "test-reservation-id",
      lookupCode: "WF-TEST12",
    });

    // Supabase insert parameter validation
    expect(supabaseAdmin.from).toHaveBeenCalledWith("reservations");
  });

  it("필수 입력 필드가 누락되면 400 에러를 반환한다", async () => {
    const payload = {
      name: "테스터",
      // phone 누락
      desiredDate: "2026-06-15",
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: true,
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("필수 항목이 누락되었습니다");
  });

  it("개인정보 동의가 누락되면 400 에러를 반환한다", async () => {
    const payload = {
      name: "테스터",
      phone: "010-1234-5678",
      desiredDate: "2026-06-15",
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: false, // 동의 미제공
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("동의가 필요합니다");
  });

  it("희망 일정 날짜 형식이 올바르지 않으면 400 에러를 반환한다", async () => {
    const payload = {
      name: "테스터",
      phone: "010-1234-5678",
      desiredDate: "2026/06/15", // yyyy-mm-dd 형식 위반
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: true,
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("날짜 형식이 올바르지 않습니다");
  });

  it("Supabase DB에러 발생 시 400 에러와 함께 에러 메시지를 반환한다", async () => {
    // Force DB error
    const queryChain = supabaseAdmin.from("reservations") as any;
    vi.mocked(queryChain.single).mockResolvedValueOnce({
      data: null,
      error: { message: "Database constraint error" } as any,
    });

    const payload = {
      name: "테스터",
      phone: "010-1234-5678",
      desiredDate: "2026-06-15",
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: true,
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toBe("Database constraint error");
  });

  it("동일한 날짜와 시간대에 이미 예약이 있으면 400 에러를 반환한다", async () => {
    // Mock check query to return an existing reservation row
    const queryChain = supabaseAdmin.from("reservations") as any;
    vi.mocked(queryChain.limit).mockResolvedValueOnce({
      data: [{ id: "existing-reservation-id" }],
      error: null,
    } as any);

    const payload = {
      name: "테스터",
      phone: "010-1234-5678",
      desiredDate: "2026-06-15",
      desiredTime: "10:00",
      projectType: "homepage",
      industry: "gym",
      agreeTerms: true,
    };

    const req = new Request("http://localhost/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await POST(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("이미 예약 완료된 시간대입니다");
  });
});
