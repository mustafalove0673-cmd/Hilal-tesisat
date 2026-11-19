import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Check, ShieldCheck, Star, Wrench } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { SafeImage } from '@/components/SafeImage';
import { SITE_IMAGES, SITE_INFO, TESTIMONIALS } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kurumsal & Hakkımızda | Hilal Tesisat Ankara',
  description:
    '15+ yıllık tecrübesiyle Ankara Pursaklar merkezli Hilal Tesisat hakkında kurumsal bilgiler, kalite standartları ve müşteri yorumları.',
  path: '/kurumsal',
});

export default function KurumsalPage() {
  return (
    <SubpageShell
      eyebrow="Kurumsal Kimlik & Değerler"
      title="Güvenli Yaşam İçin 15+ Yıllık Mühendislik Tecrübesi"
      description="Hilal Tesisat olarak Ankara’da doğalgaz, ısıtma sistemleri ve sıhhi tesisat alanlarında şeffaf fiyatlandırma, sertifikalı işçilik ve kesintisiz teknik destek sunuyoruz."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Kurumsal', path: '/kurumsal' },
      ]}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Top Corporate Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border border-white/80 shadow-xl">
              <SafeImage
                src={SITE_IMAGES.emblemMetal}
                alt="Hilal Tesisat Kurumsal Amblem"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1716]">
              Neden Hilal Tesisat?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#4B4441]">
              {SITE_INFO.addressLine2} merkezli firmamız, kurulduğu günden bu yana {SITE_INFO.happyClients}{' '}
              aşkın konut ve iş yerinde yüksek güvenlik standartlarını ön planda tutarak hizmet
              vermektedir. Her projede TS EN ve Başkentgaz yönetmeliklerine tam uyum gözetilir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Sertifikalı & Garantili İşçilik',
                  desc: 'Tüm mekanik ve doğalgaz uygulamalarımız resmi garanti ve test raporu ile teslim edilir.',
                },
                {
                  icon: Wrench,
                  title: 'Modern Teşhis Ekipmanları',
                  desc: 'Termal kamera, akustik dinleme ve endoskopik kanal görüntüleme ile kırmadan çözüm.',
                },
                {
                  icon: Award,
                  title: 'Şeffaf Fiyat Politikası',
                  desc: 'İşlem öncesinde ücretsiz keşif ve net fiyat bilgilendirmesi yapılır, sürpriz ek maliyet çıkmaz.',
                },
                {
                  icon: Check,
                  title: '7/24 Kesintisiz Destek',
                  desc: 'Acil su kaçağı, gaz kokusu veya kombi arızalarında Ankara içi hızlı müdahale.',
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="pearl-glass rounded-2xl p-5 space-y-2">
                    <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#4A0D13]/10 text-[#4A0D13]">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#1D1716]">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#57504D] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 rounded-full burgundy-cta px-6 py-3 text-sm font-medium text-white"
              >
                <span>Ekibimizle İletişime Geçin</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* All Reviews Section */}
        <section id="yorumlar" className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#7A353B]">Müşteri Deneyimleri</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#1D1716] mt-1">
              Müşterilerimizin Görüşleri
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((review) => (
              <article key={review.id} className="pearl-glass rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
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
                </div>
                <p className="text-sm text-[#423B39] leading-relaxed">“{review.quote}”</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#7D1A23] text-[#7D1A23]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SubpageShell>
  );
}
