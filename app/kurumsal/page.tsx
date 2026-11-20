import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Star, Users } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { SafeImage } from '@/components/SafeImage';
import { AwwwardsFadeUpCard } from '@/components/MotionPrimitives';
import { computeStaggeredRevealDelay } from '@/lib/awwwards-motion';
import { SITE_IMAGES, SITE_INFO, TESTIMONIALS } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kurumsal & Hakkımızda | Hilal Tesisat Ankara',
  description:
    '15+ yıllık tecrübesiyle Ankara Pursaklar merkezli Hilal Tesisat hakkında kurumsal bilgiler, kalite standartları ve müşteri yorumları.',
  path: '/kurumsal',
});

const ENGINEERING_PILLARS = [
  {
    code: '01',
    title: 'Başkentgaz Yetkili Mühendislik',
    desc: 'ZetaCAD proje çizimi, sızdırmazlık testi ve gaz açım işlemlerinde mevzuata %100 uyumlu resmi mühendislik hizmeti.',
  },
  {
    code: '02',
    title: 'Kırmadan Akustik & Termal Teşhis',
    desc: 'Termal kamera, akustik dinleme ve HD endoskopik kanal görüntüleme ile duvar ve fayanslara zarar vermeden kesin nokta tespiti.',
  },
  {
    code: '03',
    title: 'Şeffaf Keşif & Sabit Fiyat',
    desc: 'Çalışmaya başlamadan önce yerinde ücretsiz keşif yapılır; malzeme kalitesi ve işçilik bedeli açıkça paylaşılır.',
  },
  {
    code: '04',
    title: 'Yazılı Garanti & 7/24 Servis',
    desc: 'Tüm mekanik uygulamalarımız 1–2 yıl servis garantisi taşır; acil durumlarda Ankara geneli 30–45 dakikada ekip yönlendirilir.',
  },
];

export default function KurumsalPage() {
  return (
    <SubpageShell
      eyebrow="Kurumsal Kimlik & Değerler"
      title="Güvenli Yaşam İçin 15+ Yıllık Mühendislik Tecrübesi"
      description="Hilal Tesisat olarak Ankara’da doğalgaz, ısıtma sistemleri ve sıhhi tesisat alanlarında şeffaf fiyatlandırma, sertifikalı işçilik ve kesintisiz teknik destek sunuyoruz."
      heroImage={SITE_IMAGES.corporateTeam}
      heroImageAlt="Hilal Tesisat Mekanik ve Sıhhi Tesisat Mühendislik Ekibi"
      heroMetricValue="15+ Yıllık Tecrübe"
      heroMetricLabel="1000+ Mutlu Müşteri"
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Kurumsal', path: '/kurumsal' },
      ]}
    >
      <div className="mx-auto max-w-[1280px] px-3.5 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        {/* Split Architectural Manifesto + 3D Crest Showcase */}
        <section className="pearl-glass rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-56 sm:w-72 mix-blend-multiply [mask-image:radial-gradient(closest-side,black_58%,transparent_98%)]">
              <SafeImage
                src={SITE_IMAGES.emblemMetal}
                alt="Hilal Tesisat 3D Kurumsal Amblem"
                className="w-full aspect-square object-contain brightness-[1.08] contrast-[1.04]"
              />
            </div>
            <div className="mt-2 flex items-center gap-6 text-center">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#4A0D13]/10 text-[#4A0D13]">
                  <Award className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <div className="font-sans text-lg font-bold text-[#1D1716] leading-none tabular-nums">
                    {SITE_INFO.experienceYears}
                  </div>
                  <div className="text-[11px] text-[#5A5350]">Yıllık Tecrübe</div>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-[#D8CFC9]" aria-hidden="true" />
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#4A0D13]/10 text-[#4A0D13]">
                  <Users className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="text-left">
                  <div className="font-sans text-lg font-bold text-[#1D1716] leading-none tabular-nums">
                    {SITE_INFO.happyClients}
                  </div>
                  <div className="text-[11px] text-[#5A5350]">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-semibold text-[#7A353B]">Neden Hilal Tesisat?</span>
              <span className="h-[1px] w-14 bg-[#B99E96]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1716] leading-[1.12] text-balance">
              Estetik Mimariye Saygılı, Standartlara %100 Uyumlu Mekanik Çözümler
            </h2>
            <p className="text-xs sm:text-base leading-relaxed text-[#4B4441]">
              {SITE_INFO.addressLine2} merkezli firmamız, kurulduğu günden bu yana{' '}
              {SITE_INFO.happyClients} aşkın konut, villa ve ticari işletmede yüksek emniyet
              standartlarını ön planda tutmaktadır. Her proje TS EN yönetmeliklerine ve Başkentgaz
              iç tesisat şartnamesine göre test edilerek teslim edilir.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/#iletisim"
                className="inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-3 text-xs sm:text-sm font-medium text-white"
              >
                <span>Ekibimizle İletişime Geçin</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/projelerimiz"
                className="rounded-full bg-white/90 border border-[#D4CBC4] px-5 py-3 text-xs sm:text-sm font-medium text-[#2A1F1D] hover:border-[#4A0D13] transition-colors"
              >
                Projelerimizi İnceleyin
              </Link>
            </div>
          </div>
        </section>

        {/* Deep Burgundy Engineering Standards Showcase (Zero Plain Small Icon Boxes!) */}
        <section className="rounded-tl-[64px] rounded-br-[64px] rounded-tr-[24px] rounded-bl-[24px] sm:rounded-tl-[110px] sm:rounded-br-[110px] sm:rounded-tr-[32px] sm:rounded-bl-[32px] overflow-hidden bg-gradient-to-br from-[#2B0509] via-[#4A0D13] to-[#1C0306] text-[#F8F5F2] shadow-2xl border border-[#C8A287]/25">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[340px]">
              <SafeImage
                src={SITE_IMAGES.bannerGas}
                alt="Hassas Pirinç ve Bakır Doğalgaz Kollektör İşçiliği"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#2B0509] via-[#2B0509]/30 to-transparent"
              />
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div>
                <span className="text-xs font-medium text-[#C8A287]">Kalite İlkelerimiz</span>
                <h2 className="font-display text-2xl sm:text-4xl font-semibold text-white mt-1">
                  Dört Temel Mühendislik Güvencemiz
                </h2>
              </div>

              <div className="divide-y divide-white/15">
                {ENGINEERING_PILLARS.map((pillar) => (
                  <div
                    key={pillar.code}
                    className="py-4 first:pt-1 last:pb-1 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-5 flex items-baseline gap-2.5">
                      <span className="font-sans text-xs font-semibold text-[#C8A287] tabular-nums">
                        {pillar.code}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="sm:col-span-7 text-xs sm:text-sm text-[#DFD3CC] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Verified Client Testimonials */}
        <section id="yorumlar" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[#7A353B]">Müşteri Deneyimleri</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1716] mt-1">
                Müşterilerimizin Görüşleri
              </h2>
            </div>
            <p className="text-xs text-[#5E5451]">
              Ankara genelinde hizmet verdiğimiz gerçek konut ve iş yeri sahipleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((review, idx) => (
              <AwwwardsFadeUpCard
                as="article"
                key={review.id}
                testId="kurumsal-testimonial-card"
                delay={computeStaggeredRevealDelay(idx, 3, 0.075, 0.32)}
                y={36}
                duration={0.72}
                className="pearl-glass rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                      <SafeImage
                        src={review.avatar}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1D1716]">{review.name}</h3>
                      <p className="text-xs text-[#6B625E]">
                        {review.district} · {review.service}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#423B39] leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className="w-3.5 h-3.5 fill-[#7D1A23] text-[#7D1A23]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </AwwwardsFadeUpCard>
            ))}
          </div>
        </section>
      </div>
    </SubpageShell>
  );
}
