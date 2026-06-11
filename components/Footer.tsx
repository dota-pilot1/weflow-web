import Image from "next/image";
import Link from "next/link";
import {
  COMPANY,
  FOOTER_CARE,
  FOOTER_CONTACT,
  FOOTER_SERVICE,
} from "@/lib/site";

function ExtLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-[var(--color-fg-mute)] hover:text-[var(--color-brand-700)] transition"
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pb-28 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="WEFLOW"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl font-extrabold tracking-tight">
                {COMPANY.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-[var(--color-fg-soft)] leading-relaxed">
              {COMPANY.tagline}
            </p>
            <ul className="mt-5 space-y-1.5 text-xs text-[var(--color-fg-mute)]">
              <li>대표 : {COMPANY.ceo}</li>
              <li>사업자등록번호 : {COMPANY.bizNumber}</li>
              <li>이메일 : {COMPANY.email}</li>
              <li>운영시간 : {COMPANY.hours}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[var(--color-fg)]">서비스</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_SERVICE.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-fg-mute)] hover:text-[var(--color-brand-700)] transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[var(--color-fg)]">
              WEFLOW 케어플랜
            </h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_CARE.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-fg-mute)] hover:text-[var(--color-brand-700)] transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[var(--color-fg)]">상담문의</h4>
            <ul className="mt-4 space-y-2">
              {FOOTER_CONTACT.map((item, idx) => (
                <li key={idx}>
                  <ExtLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-[var(--color-fg-mute)]">
            {COMPANY.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--color-fg-mute)]">
            <Link href="/privacy" className="hover:text-[var(--color-fg-soft)]">
              개인정보처리방침
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[var(--color-fg-soft)]">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
