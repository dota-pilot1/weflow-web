"use client";

export default function TestErrorPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-xl font-bold mb-4">에러 페이지 테스트</h1>
      <p className="text-sm text-[var(--color-fg-soft)] mb-6">
        아래 버튼을 누르면 인위적으로 렌더링 에러를 발생시켜 전역 에러 바운더리(error.tsx)가 작동하는지 테스트합니다.
      </p>
      <button
        type="button"
        onClick={() => {
          throw new Error("임의로 발생시킨 수동 검증용 테스트 에러입니다!");
        }}
        className="btn-primary bg-rose-600 hover:bg-rose-700"
      >
        에러 강제 발생시키기
      </button>
    </div>
  );
}
