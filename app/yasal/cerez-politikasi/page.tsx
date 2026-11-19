import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';

export const metadata: Metadata = buildPageMetadata({
  title: 'Çerez Politikası | Hilal Tesisat',
  description:
    'Hilal Tesisat web sitesinde kullanılan zorunlu ve tercih çerezleri hakkında şeffaf bilgilendirme ve tarayıcı yönetim rehberi.',
  path: '/yasal/cerez-politikasi',
});

export default function CerezPolitikasiPage() {
  return (
    <SubpageShell
      eyebrow="Yasal Bilgilendirme"
      title="Çerez (Cookie) Politikası"
      description="Ziyaretçilerimize güvenli, hızlı ve kesintisiz bir web deneyimi sunmak amacıyla yalnızca şeffaf ve kontrollü çerez mekanizmaları kullanıyoruz."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Çerez Politikası', path: '/yasal/cerez-politikasi' },
      ]}
    >
      <article className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="pearl-glass rounded-3xl p-7 sm:p-10 space-y-6 text-sm leading-relaxed text-[#3B3432]">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              1. Çerez Nedir?
            </h2>
            <p>
              Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınız aracılığıyla
              cihazınıza kaydedilen küçük metin dosyalarıdır. Web sitemizde üçüncü taraf reklam
              takip çerezleri kullanılmamaktadır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              2. Kullandığımız Çerez Türleri
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Zorunlu ve Güvenlik Çerezleri:</strong> Form güvenliği, oturum bütünlüğü ve
                çerez onay tercihinizin hatırlanması için gereklidir.
              </li>
              <li>
                <strong>Performans ve Tercih Depolaması:</strong> Sayfa geçişlerinin akıcılığını ve
                seçtiğiniz hizmet filtrelerini korumak için kullanılır.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              3. Çerez Tercihlerini Yönetme
            </h2>
            <p>
              Tarayıcınızın gizlilik ayarlarından çerezleri dilediğiniz zaman silebilir veya
              engelleyebilirsiniz. Zorunlu çerezlerin devre dışı bırakılması halinde bazı form
              güvenlik özellikleri sınırlanabilir.
            </p>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
