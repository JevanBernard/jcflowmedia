import type { SVGProps } from "react";

/** Satu set ikon garis: stroke 1.8, sudut membulat, satu warna (PRD §8). */
const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  chevronL: <path d="m15 6-6 6 6 6" />,
  chevronR: <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.5v.01" /></>,
  camera: <><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6l1.4-2h5l1.4 2h1.6A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" /><circle cx="12" cy="12.5" r="3.5" /></>,
  social: <><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><path d="M16.8 7.2v.01" /></>,
  design: <><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" /><path d="m13.5 7.5 3 3" /></>,
  brand: <><path d="M12 3.5 14.4 9l5.6.5-4.3 3.7 1.3 5.6L12 15.9l-5 2.9 1.3-5.6L4 9.5 9.6 9z" /></>,
  web: <><rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M3 9h18M7 6.8v.01M9.5 6.8v.01" /></>,
  seo: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2M8.5 11h5M11 8.5v5" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="3" /><path d="M8 3v4M16 3v4M4 10h16" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  file: <><path d="M14 3.5H7.5A2.5 2.5 0 0 0 5 6v12a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 18V8.5z" /><path d="M14 3.5v5h5M9 13h6M9 16.5h4" /></>,
  gift: <><rect x="4" y="8.5" width="16" height="11.5" rx="2.5" /><path d="M12 8.5V20M4 12.5h16M12 8.5S10.5 4 8 4.6c-2 .5-1.4 3.9 4 3.9zm0 0s1.5-4.5 4-3.9c2 .5 1.4 3.9-4 3.9z" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="3" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" /></>,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.2 6.8v.01" /></>,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  heart: <path d="M12 19.5s-7.5-4.6-7.5-10a4.2 4.2 0 0 1 7.5-2.6 4.2 4.2 0 0 1 7.5 2.6c0 5.4-7.5 10-7.5 10z" />,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  layers: <><path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8z" /><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" /></>,
  bag: <><path d="M5.5 8.5h13l-1 11a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></>,
  building: <><rect x="4.5" y="3.5" width="15" height="17" rx="2" /><path d="M9 20.5v-4h6v4M8.5 7.5h1M14.5 7.5h1M8.5 11h1M14.5 11h1" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {paths[name]}
    </svg>
  );
}

export function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12.04 2.5a9.43 9.43 0 0 0-8.1 14.27L2.5 21.5l4.86-1.4A9.44 9.44 0 1 0 12.04 2.5zm0 17.2a7.77 7.77 0 0 1-3.96-1.09l-.28-.17-2.88.83.85-2.8-.19-.29a7.78 7.78 0 1 1 6.46 3.52zm4.27-5.82c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.16.23-.6.76-.74.92-.14.15-.27.17-.5.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.17-1.4-1.31-1.63-.14-.24-.01-.36.1-.48.11-.1.24-.27.35-.4.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.4-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.4h-.45a.86.86 0 0 0-.62.29c-.21.23-.82.8-.82 1.95s.84 2.27.96 2.42c.12.16 1.65 2.52 4 3.53.56.24 1 .39 1.34.5.56.18 1.08.15 1.48.09.45-.07 1.38-.56 1.58-1.11.2-.55.2-1.02.14-1.12-.06-.1-.21-.16-.45-.27z" />
    </svg>
  );
}
