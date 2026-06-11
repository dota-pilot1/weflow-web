import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "WEFLOW | 문의로 이어지는 홈페이지를 만듭니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #eef4ff 0%, #ffffff 45%, #dbe6ff 100%)",
          position: "relative",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(96,165,250,0.55) 0%, rgba(96,165,250,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(147,197,253,0.5) 0%, rgba(147,197,253,0) 70%)",
          }}
        />

        {/* top — logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 18,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 30px rgba(29,78,216,0.35)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "white",
                opacity: 0.95,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: -1,
              color: "#1d4ed8",
            }}
          >
            WEFLOW
          </div>
        </div>

        {/* bottom — copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              fontWeight: 700,
              color: "#1d4ed8",
              background: "rgba(255,255,255,0.7)",
              border: "1px solid #dbe6ff",
              padding: "10px 18px",
              borderRadius: 9999,
              width: "fit-content",
            }}
          >
            홈페이지 · 랜딩 · 광고 · 운영
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#0b1f4d",
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>문의로 이어지는</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              홈페이지를 만듭니다
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#475569",
              fontWeight: 500,
            }}
          >
            단순 제작이 아닌, 문의 구조까지 설계합니다.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
