"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "로그인에 실패했습니다.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "네트워크 오류");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-soft)] px-4">
      <form
        onSubmit={submit}
        className="card w-full max-w-md p-8"
      >
        <h1 className="text-2xl font-extrabold">WEFLOW 관리자</h1>
        <p className="mt-1 text-sm text-[var(--color-fg-mute)]">
          관리자 계정으로 로그인하세요.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50/60 p-3">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                DEV
              </span>
              <span className="text-xs font-semibold text-amber-800">
                테스트 계정 자동 입력
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("badeagle85@gmail.com");
                  setPassword("1111");
                }}
                className="rounded-md border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
              >
                관리자
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="mt-1.5 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--color-fg-soft)]">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1.5 w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-100)]"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary mt-6 w-full disabled:opacity-50"
        >
          {submitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
