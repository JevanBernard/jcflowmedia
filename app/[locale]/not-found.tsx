import Link from "next/link";
import { FlowRibbon } from "@/components/Blocks";
import { Icon, WhatsAppGlyph } from "@/components/Icon";
import { WaButton } from "@/components/WaButton";
import { getMessages } from "@/lib/i18n";

/** 404 bilingual (F7): tautan ke beranda dan WhatsApp. */
export default function NotFound() {
  const id = getMessages("id");
  const n = id.notFound;
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <p className="grad-num select-none text-[clamp(7rem,28vw,18rem)]" aria-hidden="true">
          404
        </p>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div lang="id">
            <h1 className="t-h2">{n.titleId}</h1>
            <p className="t-lead mt-3">{n.bodyId}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                {n.homeId} <Icon name="arrow" className="arrow" />
              </Link>
              <WaButton message={id.wa.messages.notFound} position="404" lang="id" className="btn btn-ghost">
                <WhatsAppGlyph /> WhatsApp
              </WaButton>
            </div>
          </div>
          <div lang="en">
            <p className="t-h2" role="heading" aria-level={2}>
              {n.titleEn}
            </p>
            <p className="t-lead mt-3">{n.bodyEn}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en" className="btn btn-primary">
                {n.homeEn} <Icon name="arrow" className="arrow" />
              </Link>
              <WaButton message={getMessages("en").wa.messages.notFound} position="404" lang="en" className="btn btn-ghost">
                <WhatsAppGlyph /> WhatsApp
              </WaButton>
            </div>
          </div>
        </div>
      </div>
      <FlowRibbon id="ribbon-404" className="pointer-events-none absolute -right-20 top-10 w-[600px] max-w-none opacity-80" />
    </section>
  );
}
