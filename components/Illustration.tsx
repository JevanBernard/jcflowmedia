import type { IllustrationKind } from "@/lib/site";

const C = {
  ink: "#1F1B18",
  ink2: "#2A2420",
  cream: "#FFF6EF",
  cream2: "#FBEADB",
  peach: "#F8CBA6",
  light: "#F58B4A",
  orange: "#E97D26",
  deep: "#D64F27",
  white: "#FFFFFF",
};

/**
 * Ilustrasi vektor sebagai pengganti foto yang belum diunggah.
 * Selalu ditampilkan dengan label "Ilustrasi" (PRD §8 Fotografi).
 */
export function Illustration({ kind, uid }: { kind: IllustrationKind; uid: string }) {
  const g = `g-${uid}`;
  const s = `s-${uid}`;
  const defs = (
    <defs>
      <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={C.light} />
        <stop offset=".5" stopColor={C.orange} />
        <stop offset="1" stopColor={C.deep} />
      </linearGradient>
      <linearGradient id={s} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.cream} />
        <stop offset="1" stopColor={C.peach} />
      </linearGradient>
    </defs>
  );

  const common = {
    viewBox: "0 0 400 500",
    preserveAspectRatio: "xMidYMid slice" as const,
    className: "h-full w-full",
    "aria-hidden": true,
    focusable: false,
  };

  switch (kind) {
    case "villa":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={`url(#${s})`} />
          <circle cx="282" cy="150" r="64" fill={`url(#${g})`} />
          <rect x="0" y="262" width="400" height="238" fill={C.cream2} />
          <rect x="48" y="196" width="230" height="16" rx="3" fill={C.ink} />
          <rect x="64" y="212" width="198" height="104" fill={C.white} />
          <rect x="80" y="230" width="58" height="86" fill={C.ink2} />
          <rect x="150" y="230" width="96" height="52" fill={C.peach} />
          <rect x="150" y="230" width="96" height="52" fill="none" stroke={C.ink} strokeWidth="3" />
          <line x1="198" y1="230" x2="198" y2="282" stroke={C.ink} strokeWidth="3" />
          <rect x="20" y="330" width="360" height="104" rx="6" fill={C.white} />
          <rect x="32" y="340" width="336" height="84" rx="4" fill={`url(#${g})`} opacity=".28" />
          {[356, 374, 392, 410].map((y, i) => (
            <path key={y} d={`M${60 + i * 14} ${y}h${120 - i * 18}`} stroke={C.white} strokeWidth="4" strokeLinecap="round" />
          ))}
          <path d="M330 470V300" stroke={C.ink} strokeWidth="6" strokeLinecap="round" />
          <path d="M330 300c-30-10-58 0-74 20M330 300c22-24 52-26 70-16M330 300c-8-30-30-46-56-46M330 300c20-28 18-50 6-66M330 300c34-2 54 18 58 40" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "villa2":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={`url(#${s})`} />
          <circle cx="120" cy="190" r="80" fill={`url(#${g})`} opacity=".95" />
          <path d="M0 330h400v170H0z" fill={C.cream2} />
          <path d="M150 330V180a50 50 0 0 1 100 0v150" fill={C.white} />
          <path d="M172 330V194a28 28 0 0 1 56 0v136" fill={C.ink} />
          <rect x="40" y="250" width="110" height="80" fill={C.white} />
          <rect x="250" y="250" width="110" height="80" fill={C.white} />
          <rect x="30" y="240" width="340" height="12" rx="3" fill={C.ink} />
          {[60, 100, 280, 320].map((x) => (
            <rect key={x} x={x} y="270" width="22" height="40" rx="11" fill={C.peach} />
          ))}
          <path d="M200 500V330" stroke={C.cream} strokeWidth="56" />
          {[40, 90, 310, 360].map((x, i) => (
            <ellipse key={x} cx={x} cy={400 + (i % 2) * 30} rx="34" ry="26" fill={C.ink2} opacity=".9" />
          ))}
        </svg>
      );
    case "interior":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={C.cream2} />
          <path d="M110 330V150a90 90 0 0 1 180 0v180z" fill={`url(#${s})`} />
          <circle cx="240" cy="190" r="38" fill={`url(#${g})`} />
          <path d="M110 330V150a90 90 0 0 1 180 0v180" fill="none" stroke={C.white} strokeWidth="10" />
          <line x1="200" y1="60" x2="200" y2="330" stroke={C.white} strokeWidth="6" />
          <rect x="0" y="380" width="400" height="120" fill={C.peach} opacity=".55" />
          <rect x="60" y="330" width="280" height="64" rx="16" fill={C.white} />
          <rect x="60" y="300" width="280" height="40" rx="14" fill={C.cream} />
          <rect x="80" y="282" width="80" height="36" rx="14" fill={C.white} stroke={C.cream2} strokeWidth="3" />
          <rect x="240" y="282" width="80" height="36" rx="14" fill={C.white} stroke={C.cream2} strokeWidth="3" />
          <rect x="60" y="394" width="280" height="14" rx="4" fill={C.ink} />
          <rect x="40" y="250" width="24" height="158" rx="6" fill={C.ink2} />
          <line x1="352" y1="0" x2="352" y2="210" stroke={C.ink} strokeWidth="3" />
          <path d="M326 236a26 26 0 0 1 52 0z" fill={C.ink} />
        </svg>
      );
    case "interior2":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={C.cream} />
          <rect x="0" y="0" width="400" height="340" fill={C.cream2} />
          <circle cx="200" cy="170" r="74" fill={`url(#${s})`} stroke={C.ink} strokeWidth="5" />
          <circle cx="226" cy="150" r="26" fill={`url(#${g})`} />
          <rect x="40" y="300" width="320" height="80" rx="26" fill={C.white} />
          <rect x="40" y="270" width="320" height="56" rx="22" fill={C.peach} />
          <rect x="72" y="380" width="10" height="34" fill={C.ink} />
          <rect x="318" y="380" width="10" height="34" fill={C.ink} />
          <ellipse cx="200" cy="460" rx="120" ry="16" fill={C.cream2} />
          <rect x="300" y="210" width="40" height="60" rx="8" fill={C.ink2} />
          <path d="M320 210c-12-40-36-60-60-64M320 210c4-46 20-70 44-80M320 210c-24-20-28-46-20-70" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={C.ink} />
          <circle cx="200" cy="210" r="120" fill={`url(#${g})`} opacity=".9" />
          <rect x="0" y="300" width="400" height="200" fill={C.ink2} />
          <path d="M0 300c80-20 140 10 200 0s130-22 200 0" stroke={C.light} strokeWidth="3" fill="none" opacity=".7" />
          <circle cx="200" cy="230" r="44" fill={C.white} />
          <path d="M188 208v44l36-22z" fill={C.ink} />
          <rect x="40" y="440" width="320" height="6" rx="3" fill={C.white} opacity=".25" />
          <rect x="40" y="440" width="128" height="6" rx="3" fill={`url(#${g})`} />
          <circle cx="168" cy="443" r="9" fill={C.white} />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          {defs}
          <rect width="400" height="500" fill={C.cream2} />
          <rect x="34" y="60" width="332" height="380" rx="18" fill={C.white} />
          <path d="M34 78a18 18 0 0 1 18-18h296a18 18 0 0 1 18 18v14H34z" fill={C.ink} />
          {[56, 72, 88].map((x) => (
            <circle key={x} cx={x} cy="76" r="4.5" fill={C.cream} opacity=".6" />
          ))}
          <rect x="54" y="110" width="292" height="160" rx="12" fill={`url(#${s})`} />
          <circle cx="290" cy="160" r="34" fill={`url(#${g})`} />
          <rect x="54" y="210" width="292" height="60" fill={C.ink2} opacity=".9" />
          <rect x="72" y="226" width="140" height="10" rx="5" fill={C.white} />
          <rect x="72" y="244" width="96" height="8" rx="4" fill={C.white} opacity=".5" />
          <rect x="54" y="292" width="200" height="12" rx="6" fill={C.ink} />
          <rect x="54" y="314" width="270" height="8" rx="4" fill={C.ink} opacity=".25" />
          <rect x="54" y="330" width="240" height="8" rx="4" fill={C.ink} opacity=".25" />
          <rect x="54" y="370" width="120" height="40" rx="20" fill={`url(#${g})`} />
          <rect x="186" y="370" width="100" height="40" rx="20" fill="none" stroke={C.ink} strokeOpacity=".25" strokeWidth="2" />
        </svg>
      );
  }
}
