export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing circle */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-[var(--color-brand-100)] opacity-40 animate-ping" />
        {/* Inner rotating gradient circle */}
        <div
          className="w-12 h-12 rounded-full border-4 border-[var(--color-brand-500)] animate-spin"
          style={{
            borderTopColor: "transparent",
            boxShadow: "0 0 15px var(--color-brand-radial-glow-1)",
          }}
        />
      </div>
      <div className="flex flex-col items-center text-center mt-2">
        <p className="text-sm font-semibold tracking-tight text-[var(--color-fg-soft)]">
          페이지를 불러오는 중입니다
        </p>
        <p className="text-xs text-[var(--color-fg-mute)] mt-1">
          잠시만 기다려주세요…
        </p>
      </div>
    </div>
  );
}
