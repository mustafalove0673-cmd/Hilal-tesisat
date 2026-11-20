'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ArrowRight, Lock, MessageCircle } from 'lucide-react';
import { buildWhatsappHref, SERVICES, SITE_INFO } from '@/lib/site-data';
import { validateQuotePayload } from '@/lib/security';
import { EASE_LUXURY } from './MotionPrimitives';

interface QuoteFormProps {
  defaultServiceSlug?: string;
}

const SPARK_OFFSETS = [
  { x: -34, y: -26, delay: 0.25 },
  { x: 36, y: -24, delay: 0.3 },
  { x: -38, y: 18, delay: 0.34 },
  { x: 38, y: 20, delay: 0.28 },
  { x: 0, y: -42, delay: 0.36 },
  { x: 0, y: 40, delay: 0.32 },
];

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

  return (
    <AnimatePresence mode="wait">
      {successData ? (
        <motion.div
          key="quote-success"
          role="status"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.45, ease: EASE_LUXURY }}
          className="bg-[#FAF7F5] border border-[#E6DCD5] shadow-[0_24px_60px_-20px_rgba(12,2,4,0.6)] w-full h-full rounded-2xl sm:rounded-3xl p-7 sm:p-9 flex flex-col items-center justify-center text-center space-y-4 text-[#1B1817]"
        >
          {/* Animated SVG Vector Stroke-Draw & Concentric Ripple Feedback */}
          <div className="relative flex items-center justify-center w-24 h-24">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-[#C8A287]/75 animate-success-ripple"
            />
            <span
              aria-hidden="true"
              className="absolute inset-2 rounded-full border border-[#1C5D36]/55 animate-success-ripple-delayed"
            />

            {SPARK_OFFSETS.map((spark, idx) => (
              <motion.span
                key={idx}
                aria-hidden="true"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: spark.x,
                  y: spark.y,
                  scale: [0.3, 1.15, 0.4],
                }}
                transition={{
                  duration: 0.95,
                  delay: spark.delay,
                  ease: EASE_LUXURY,
                }}
                className={`absolute w-2 h-2 rounded-full ${
                  idx % 2 === 0 ? 'bg-[#C8A287]' : 'bg-[#1C5D36]'
                }`}
              />
            ))}

            <motion.div
              initial={{ scale: 0.72, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.42, ease: EASE_LUXURY }}
              className="relative z-10 w-18 h-18 rounded-full bg-gradient-to-br from-[#1C5D36] to-[#134226] shadow-[0_14px_30px_-8px_rgba(28,93,54,0.55)] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 52 52"
                className="w-11 h-11"
                fill="none"
                aria-hidden="true"
              >
                <motion.circle
                  cx="26"
                  cy="26"
                  r="22"
                  stroke="rgba(233, 209, 192, 0.55)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, ease: EASE_LUXURY }}
                />
                <motion.path
                  d="M15 27.2 L22.4 34.4 L37.2 19.2"
                  stroke="#FFFFFF"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.48, delay: 0.22, ease: EASE_LUXURY }}
                />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE_LUXURY }}
            className="space-y-2"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B1817]">
              Talebiniz Başarıyla Alındı
            </h3>
            <p className="text-sm text-[#423B39] max-w-md mx-auto leading-relaxed">
              {successData.message}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE_LUXURY }}
            className="rounded-xl bg-white/95 border border-[#4A0D13]/20 px-5 py-2.5 text-xs font-medium text-[#36080D] tabular-nums shadow-sm"
          >
            Başvuru Referans Kodu: <strong>{successData.referenceCode}</strong>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38, ease: EASE_LUXURY }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-1"
          >
            <a
              href={buildWhatsappHref(`Başvuru Referans Kodu: ${successData.referenceCode}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1C5D36] hover:bg-[#174D2C] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Referans Kodunu WhatsApp’tan İlet</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSuccessData(null);
                formStartedAtRef.current = Date.now();
              }}
              className="inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-2.5 text-xs sm:text-sm font-medium text-white"
            >
              Yeni Talep Oluştur
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="quote-form"
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#FAF7F5] border border-[#E6DCD5] shadow-[0_24px_60px_-20px_rgba(12,2,4,0.6)] w-full h-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between gap-4.5 text-[#1B1817]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#4A0D13]/12 pb-3.5">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1B1817]">
                Ücretsiz Keşif ve Teklif Formu
              </h3>
              <p className="text-xs text-[#4A4240] mt-0.5">
                Formu doldurun, Pursaklar Saray Cumhuriyet ve Ankara geneli ekibimiz sizi arasın.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#9E162C] font-medium shrink-0">
              <Lock className="w-3.5 h-3.5 text-[#A81830]" aria-hidden="true" />
              <span>KVKK Uyumlu</span>
            </span>
          </div>

          {errors._form ? (
            <div
              role="alert"
              className="flex items-center gap-2.5 rounded-xl bg-[#4A0D13]/12 border border-[#4A0D13]/30 px-4 py-3 text-xs sm:text-sm text-[#4A0D13]"
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
              <label
                htmlFor="quote-fullname"
                className="block text-xs font-semibold text-[#2B2422] mb-1.5"
              >
                Adınız Soyadınız *
              </label>
              <input
                id="quote-fullname"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Örn. Mehmet Yılmaz"
                className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#A81830]"
              />
              {errors.fullName ? (
                <p className="mt-1 text-xs text-[#8C1D28]">{errors.fullName}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="quote-phone"
                className="block text-xs font-semibold text-[#2B2422] mb-1.5"
              >
                Telefon Numaranız *
              </label>
              <input
                id="quote-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0535 078 44 18"
                className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#A81830]"
              />
              {errors.phone ? <p className="mt-1 text-xs text-[#8C1D28]">{errors.phone}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="quote-email"
                className="block text-xs font-semibold text-[#2B2422] mb-1.5"
              >
                E-posta (Opsiyonel)
              </label>
              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@eposta.com"
                className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#A81830]"
              />
              {errors.email ? <p className="mt-1 text-xs text-[#8C1D28]">{errors.email}</p> : null}
            </div>

            <div>
              <label
                htmlFor="quote-district"
                className="block text-xs font-semibold text-[#2B2422] mb-1.5"
              >
                İlçe (Ankara) *
              </label>
              <select
                id="quote-district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#A81830]"
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
              <label
                htmlFor="quote-service"
                className="block text-xs font-semibold text-[#2B2422] mb-1.5"
              >
                Hizmet Türü *
              </label>
              <select
                id="quote-service"
                value={serviceSlug}
                onChange={(e) => setServiceSlug(e.target.value)}
                className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#A81830]"
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
            <label
              htmlFor="quote-message"
              className="block text-xs font-semibold text-[#2B2422] mb-1.5"
            >
              Talep ve Adres Detayınız *
            </label>
            <textarea
              id="quote-message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kombi markası, daire/bina bilgisi veya yaşadığınız tesisat sorununu kısaca yazabilirsiniz..."
              className="w-full rounded-xl bg-white/95 border border-[#CBBDB6] px-4 py-3 text-sm text-[#1B1817] focus:outline-none focus:ring-2 focus:ring-[#A81830]"
            />
            {errors.message ? (
              <p className="mt-1 text-xs text-[#8C1D28]">{errors.message}</p>
            ) : null}
          </div>

          {/* KVKK Legal Consent */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#3B3331]">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(e) => setKvkkAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#B5AAA3] accent-[#A81830] shrink-0"
              />
              <span>
                6698 sayılı Kanun kapsamında{' '}
                <Link href="/yasal/kvkk" className="font-semibold text-[#A81830] underline">
                  KVKK Aydınlatma Metni
                </Link>{' '}
                ve{' '}
                <Link
                  href="/yasal/gizlilik-politikasi"
                  className="font-semibold text-[#A81830] underline"
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#1C5D36]/35 bg-white px-4.5 py-3 text-xs sm:text-sm font-semibold text-[#1C5D36] hover:bg-[#1C5D36] hover:text-white whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp ile Destek Al</span>
              </a>
            </div>
            <span className="text-xs text-[#544B48] text-center sm:text-right whitespace-nowrap shrink-0">
              Acil 7/24:{' '}
              <a
                href={SITE_INFO.phoneHref}
                className="font-semibold text-[#9E162C] tabular-nums whitespace-nowrap hover:underline"
              >
                {SITE_INFO.phoneDisplay}
              </a>
            </span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
