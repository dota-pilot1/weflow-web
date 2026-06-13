import { vi, describe, it, expect } from "vitest";
import { GET } from "@/app/api/reservations/booked/route";

vi.mock("@/lib/supabase/server", () => {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockImplementation(() => Promise.resolve({
      data: [{ desired_time: "10:00" }, { desired_time: "14:30" }],
      error: null,
    })),
  };
  return {
    supabaseAdmin: {
      from: vi.fn().mockReturnValue(mockQuery),
    },
  };
});

describe("GET /api/reservations/booked", () => {
  it("유효한 날짜가 들어오면 예약된 시간 목록을 가져온다", async () => {
    const req = new Request("http://localhost/api/reservations/booked?date=2026-06-15");
    const response = await GET(req);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({
      ok: true,
      bookedTimes: ["10:00", "14:30"],
    });
  });

  it("날짜 매개변수가 누락되면 400 에러를 반환한다", async () => {
    const req = new Request("http://localhost/api/reservations/booked");
    const response = await GET(req);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.error).toContain("날짜(YYYY-MM-DD) 형식이 필요합니다");
  });
});
