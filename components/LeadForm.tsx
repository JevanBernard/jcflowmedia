"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { Icon, WhatsAppGlyph } from "./Icon";
import { WaButton } from "./WaButton";
import { track, visitSource } from "@/lib/analytics";
import { href, pageKeyFromPath, type Locale, type Messages } from "@/lib/i18n";
import { site } from "@/lib/site";

type Kind = "contact" | "audit";
type FieldDef = {
  name: string;
  label: string;
  type: "text" | "url" | "select" | "textarea";
  required: boolean;
  hint?: string;
  autoComplete?: string;
  options?: string[];
  validate?: "url" | "contact";
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => /^\+?[\d\s\-()]{8,20}$/.test(v) && v.replace(/\D/g, "").length >= 8;
const isUrl = (v: string) => {
  try {
    const u = new URL(v.startsWith("http") ? v : `https://${v}`);
    return u.hostname.includes(".");
  } catch {
    return false;
  }
};

export function LeadForm({ kind, locale, f, waMessage }: { kind: Kind; locale: Locale; f: Messages["forms"]; waMessage: string }) {
  const uid = useId();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const fields: FieldDef[] =
    kind === "contact"
      ? [
          { name: "name", label: f.name, type: "text", required: true, autoComplete: "name" },
          { name: "business", label: f.business, type: "text", required: true, autoComplete: "organization" },
          { name: "business_type", label: f.businessType, type: "select", required: true, options: f.businessTypes },
          { name: "listing", label: f.listing, type: "url", required: false, validate: "url" },
          { name: "needs", label: f.needs, type: "textarea", required: true, hint: f.needsHint },
          { name: "contact", label: f.contact, type: "text", required: true, hint: f.contactHint, validate: "contact", autoComplete: "email" },
        ]
      : [
          { name: "name", label: f.name, type: "text", required: true, autoComplete: "name" },
          { name: "property", label: f.property, type: "text", required: true, autoComplete: "organization" },
          { name: "listing", label: f.listingRequired, type: "url", required: true, hint: f.listingHint, validate: "url" },
          { name: "contact", label: f.contact, type: "text", required: true, hint: f.contactHint, validate: "contact", autoComplete: "email" },
        ];

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    for (const fd of fields) {
      const v = String(data.get(fd.name) ?? "").trim();
      if (fd.required && !v) errs[fd.name] = f.errRequired;
      else if (v && fd.validate === "url" && !isUrl(v)) errs[fd.name] = f.errUrl;
      else if (v && fd.validate === "contact" && !isEmail(v) && !isPhone(v)) errs[fd.name] = f.errContact;
    }
    if (!data.get("consent")) errs.consent = f.errConsent;
    return errs;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Honeypot: bot mengisi field tersembunyi → pura-pura sukses
    if (data.get("botcheck")) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    const payload: Record<string, unknown> = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: kind === "contact" ? `Kontak baru dari website: ${data.get("business")}` : `Pendaftaran Audit Gratis: ${data.get("property")}`,
      from_name: "Website JC Flow Media",
      form: kind,
      language: locale,
      page: pathname,
      botcheck: "",
    };
    fields.forEach((fd) => (payload[fd.label] = String(data.get(fd.name) ?? "").trim()));
    payload[f.consent] = "Ya / Yes";

    try {
      if (!payload.access_key) throw new Error("Web3Forms key belum diatur (NEXT_PUBLIC_WEB3FORMS_KEY)");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || `HTTP ${res.status}`);
      if (kind === "contact") {
        track("form_contact_submit", { page: pageKeyFromPath(pathname), business_type: String(data.get("business_type") ?? "") });
      } else {
        track("form_audit_submit", { source: visitSource() });
      }
      form.reset();
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] bg-cream p-8 text-center outline-none sm:p-12">
        <span className="icon-dot mx-auto !size-16">
          <Icon name="check" width={30} height={30} strokeWidth={2.4} />
        </span>
        <p className="t-h3 mt-6">{kind === "contact" ? f.successTitle : f.successAuditTitle}</p>
        <p className="mx-auto mt-3 max-w-md text-muted">{kind === "contact" ? f.successBody : f.successAuditBody}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WaButton message={waMessage} position={`form_${kind}_success`} lang={locale} className="btn btn-primary">
            <WhatsAppGlyph /> WhatsApp
          </WaButton>
          {kind === "contact" && (
            <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
              {f.sendAnother}
            </button>
          )}
        </div>
      </div>
    );
  }

  const errorList = Object.keys(errors);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid gap-5" aria-busy={status === "sending"}>
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="flex gap-3 rounded-2xl bg-brand-ink/10 p-4 font-medium text-brand-ink outline-none">
          <Icon name="alert" width={22} height={22} className="flex-none" />
          {f.errSummary}
        </div>
      )}

      <div className={kind === "contact" ? "grid gap-5 sm:grid-cols-2" : "grid gap-5"}>
        {fields.map((fd) => {
          const id = `${uid}-${fd.name}`;
          const err = errors[fd.name];
          const describedBy = [fd.hint ? `${id}-hint` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
          const common = {
            id,
            name: fd.name,
            className: "input",
            required: fd.required,
            "aria-required": fd.required,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": describedBy,
            onChange: () => err && setErrors((x) => ({ ...x, [fd.name]: "" })),
          };
          const full = fd.type === "textarea" || fd.name === "contact" || fd.name === "listing";
          return (
            <div key={fd.name} className={`field ${kind === "contact" && full ? "sm:col-span-2" : ""}`}>
              <label htmlFor={id}>
                {fd.label}{" "}
                {fd.required ? (
                  <span className="text-brand-ink" aria-hidden="true">*</span>
                ) : (
                  <span className="font-normal text-muted">({f.optional})</span>
                )}
              </label>
              {fd.type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="" disabled>
                    {f.selectPlaceholder}
                  </option>
                  {fd.options!.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : fd.type === "textarea" ? (
                <textarea {...common} rows={4} />
              ) : (
                <input
                  {...common}
                  type={fd.type === "url" ? "url" : "text"}
                  inputMode={fd.type === "url" ? "url" : undefined}
                  autoComplete={fd.autoComplete ?? "off"}
                  placeholder={fd.type === "url" ? "https://" : undefined}
                />
              )}
              {fd.hint && (
                <p id={`${id}-hint`} className="hint">
                  {fd.hint}
                </p>
              )}
              {err && (
                <p id={`${id}-err`} className="err">
                  <Icon name="alert" width={16} height={16} className="mt-0.5 flex-none" /> {err}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot anti-spam */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${uid}-botcheck`}>Leave empty</label>
        <input id={`${uid}-botcheck`} type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label className="checkbox !mb-0 !font-normal" htmlFor={`${uid}-consent`}>
          <input
            id={`${uid}-consent`}
            type="checkbox"
            name="consent"
            value="yes"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-err` : undefined}
            onChange={() => errors.consent && setErrors((x) => ({ ...x, consent: "" }))}
          />
          <span>
            {f.consent}{" "}
            <Link href={href(locale, "/privasi")} className="font-semibold text-brand-ink underline underline-offset-4">
              {f.consentLink}
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id={`${uid}-consent-err`} className="err">
            <Icon name="alert" width={16} height={16} className="mt-0.5 flex-none" /> {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="flex flex-wrap items-center gap-3 rounded-2xl bg-brand-ink/10 p-4 font-medium text-brand-ink">
          <Icon name="alert" width={22} height={22} className="flex-none" />
          <span className="flex-1">{f.error}</span>
          <WaButton message={waMessage} position={`form_${kind}_error`} lang={locale} className="btn btn-primary btn-sm">
            <WhatsAppGlyph /> WhatsApp
          </WaButton>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary min-w-[200px]" disabled={status === "sending"}>
          {status === "sending" ? f.sending : kind === "contact" ? f.submitContact : f.submitAudit}
          {status !== "sending" && <Icon name="arrow" className="arrow" />}
        </button>
        <p className="text-sm text-muted">
          <span className="text-brand-ink">*</span> {f.required} · {site.email}
        </p>
      </div>
    </form>
  );
}
