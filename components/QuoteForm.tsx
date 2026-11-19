'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import { buildWhatsappHref, SERVICES, SITE_INFO } from '@/lib/site-data';
import { validateQuotePayload } from '@/lib/security';

interface QuoteFormProps {
  defaultServiceSlug?: string;
}

export function QuoteForm({ defaultServiceSlug = 'kombi-bakimi' }: QuoteFormProps) {
  const formStartedAtRef = useRef<number>(0);

  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState<string>(SITE_INFO.serviceDistricts[0]);
  const [serviceSlug, setServiceSlug] = useState(defaultServiceSlug);
  const [message, setMessage] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [website, setWebsite] = useState(''); // Honeypot

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    referenceCode: string;
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const clientCheck = validateQuotePayload({
      fullName,
      phone,
      email,
      district,
      serviceSlug,
      message,
      kvkkAccepted,
      website,
      formStartedAt: formStartedAtRef.current,
    });

    if (!clientCheck.ok) {
      setErrors(clientCheck.errors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          district,
          serviceSlug,
          message,
          kvkkAccepted,
          website,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message: string;
        referenceCode?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? { _form: payload.message });
        setSubmitting(false);
        return;
      }

      setSuccessData({
        referenceCode: payload.referenceCode || 'HLT-2026',
        message: payload.message,
      });
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setKvkkAccepted(false);
    } catch {
      setErrors({ _form: 'Bağlantı hatası oluştu. Lütfen telefon hattımızdan ulaşın.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (successData) {
    return (
      <div
        role="status"
        className="pearl-glass rounded-3xl p-8 sm:p-10 text-center space-y-4"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-900/10 text-emerald-800 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1817]">
          Talebiniz Başarıyla Alındı
        </h3>
        <p className="text-sm text-[#4D4644] max-w-md mx-auto leading-relaxed">
          {successData.message}
        </p>
        <div className="inline-block rounded-xl bg-white/85 border border-[#D9D0CA] px-5 py-2.5 text-xs font-medium text-[#36080D] tabular-nums">
          Başvuru Referans Kodu: <strong>{successData.referenceCode}</strong>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setSuccessData(null);
              formStartedAtRef.current = Date.now();
            }}
            className="mt-2 inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-2.5 text-sm font-medium text-white"
          >
            Yeni Talep Oluştur
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="pearl-glass w-full h-full rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-5"
    >
      <div className="flex items-center justify-between gap-4 border-b border-[#DED6D0] pb-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1817]">
            Ücretsiz Keşif ve Teklif Formu
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5350] mt-1">
            Formu doldurun, Pursaklar ve Ankara geneli uzman ekibimiz sizi arasın.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5A5350]">
          <Lock className="w-3.5 h-3.5 text-[#4A0D13]" aria-hidden="true" />
          <span>256-bit Şifreli & KVKK Uyumlu</span>
        </span>
      </div>

      {errors._form ? (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl bg-[#4A0D13]/10 border border-[#4A0D13]/25 px-4 py-3 text-xs sm:text-sm text-[#4A0D13]"
        >
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{errors._form}</span>
        </div>
      ) : null}

      {/* Anti-bot Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="quote-website">Website</label>
        <input
          id="quote-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-fullname" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
            Adınız Soyadınız *
          </label>
          <input
            id="quote-fullname"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Örn. Mehmet Yılmaz"
            className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
          />
          {errors.fullName ? (
            <p className="mt-1 text-xs text-[#8C1D28]">{errors.fullName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="quote-phone" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
            Telefon Numaranız *
          </label>
          <input
            id="quote-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0555 078 44 18"
            className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
          />
          {errors.phone ? (
            <p className="mt-1 text-xs text-[#8C1D28]">{errors.phone}</p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="quote-email" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
            E-posta (Opsiyonel)
          </label>
          <input
            id="quote-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
            className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-[#8C1D28]">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="quote-district" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
            İlçe (Ankara) *
          </label>
          <select
            id="quote-district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
          >
            {SITE_INFO.serviceDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district ? (
            <p className="mt-1 text-xs text-[#8C1D28]">{errors.district}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="quote-service" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
            Hizmet Türü *
          </label>
          <select
            id="quote-service"
            value={serviceSlug}
            onChange={(e) => setServiceSlug(e.target.value)}
            className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
          >
            {SERVICES.map((svc) => (
              <option key={svc.slug} value={svc.slug}>
                {svc.shortTitle}
              </option>
            ))}
          </select>
          {errors.serviceSlug ? (
            <p className="mt-1 text-xs text-[#8C1D28]">{errors.serviceSlug}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="quote-message" className="block text-xs font-semibold text-[#2B2422] mb-1.5">
          Talep ve Adres Detayınız *
        </label>
        <textarea
          id="quote-message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Kombi markası, daire/bina bilgisi veya yaşadığınız tesisat sorununu kısaca yazabilirsiniz..."
          className="w-full rounded-xl bg-white/90 border border-[#D4CBC4] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#5E1119]"
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-[#8C1D28]">{errors.message}</p>
        ) : null}
      </div>

      {/* KVKK Legal Consent */}
      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#4D4644]">
          <input
            type="checkbox"
            checked={kvkkAccepted}
            onChange={(e) => setKvkkAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-[#B5AAA3] accent-[#4A0D13] shrink-0"
          />
          <span>
            6698 sayılı Kanun kapsamında{' '}
            <Link href="/yasal/kvkk" className="font-semibold text-[#4A0D13] underline">
              KVKK Aydınlatma Metni
            </Link>{' '}
            ve{' '}
            <Link
              href="/yasal/gizlilik-politikasi"
              className="font-semibold text-[#4A0D13] underline"
            >
              Gizlilik Politikası
            </Link>
            ’nı okudum; tarafıma teklif ve randevu amacıyla ulaşılmasını onaylıyorum. *
          </span>
        </label>
        {errors.kvkkAccepted ? (
          <p className="text-xs text-[#8C1D28] pl-7">{errors.kvkkAccepted}</p>
        ) : null}
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full burgundy-cta px-6 py-3 text-sm font-medium text-white whitespace-nowrap transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            <span>{submitting ? 'Gönderiliyor...' : 'Güvenli Teklif Talebi Gönder'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>

          <a
            href={buildWhatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#1C5D36]/30 bg-white px-4.5 py-3 text-xs sm:text-sm font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white whitespace-nowrap transition-colors"
          >
            <span>WhatsApp’tan Yaz</span>
          </a>
        </div>
        <span className="text-xs text-[#6B635F] text-center sm:text-right whitespace-nowrap shrink-0">
          Acil 7/24:{' '}
          <a
            href={SITE_INFO.phoneHref}
            className="font-semibold text-[#36080D] tabular-nums whitespace-nowrap hover:underline"
          >
            {SITE_INFO.phoneDisplay}
          </a>
        </span>
      </div>
    </form>
  );
}
