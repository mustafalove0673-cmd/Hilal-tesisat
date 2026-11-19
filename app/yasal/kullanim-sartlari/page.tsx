import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { SITE_INFO } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kullanım Şartları ve Yasal Uyarılar | Hilal Tesisat',
  description:
    'Hilal Tesisat web sitesi kullanım koşulları, hizmet bilgilendirme esasları, fikri mülkiyet hakları ve garanti koşulları.',
  path: '/yasal/kullanim-sartlari',
});

export default function KullanimSartlariPage() {
  return (
    <SubpageShell
      eyebrow="Yasal Bilgilendirme"
      title="Kullanım Şartları ve Yasal Uyarılar"
      description="Web sitemizi kullanmadan önce lütfen aşağıdaki hizmet bilgilendirme, garanti ve fikri mülkiyet koşullarını inceleyiniz."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Kullanım Şartları', path: '/yasal/kullanim-sartlari' },
      ]}
    >
      <article className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="pearl-glass rounded-3xl p-7 sm:p-10 space-y-6 text-sm leading-relaxed text-[#3B3432]">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              1. Bilgilendirme ve Keşif Esası
            </h2>
            <p>
              Bu web sitesinde yer alan tüm hizmet açıklamaları, örnek proje görselleri ve teknik
              bilgiler ön bilgilendirme amaçlıdır. Kesin fiyatlandırma, metraj ve uygulama takvimi
              uzman ekibimiz tarafından yerinde yapılacak teknik keşif ve karşılıklı mutabakat
              sonrasında belirlenir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              2. İşçilik ve Parça Garantisi Sınırları
            </h2>
            <p>
              {SITE_INFO.brandName} tarafından sunulan hizmetlerde işçilik garantisi, yalnızca yetkili
              ekibimiz tarafından gerçekleştirilen ve servis formu ile kayıt altına alınan işlemleri
              kapsar. Kullanıcı hatası, yetkisiz üçüncü kişi müdahalesi veya şebeke/tesisat dışı
              mücbir sebeplerden doğan arızalar garanti kapsamı dışındadır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              3. Fikri Mülkiyet Hakları
            </h2>
            <p>
              Site üzerindeki marka adı, logo, özgün görseller, metinler ve yazılım tasarımları 5846
              sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır; izinsiz kopyalanamaz
              veya ticari amaçla kullanılamaz.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              4. Yetkili Mahkeme
            </h2>
            <p>
              İşbu koşulların uygulanmasından doğabilecek uyuşmazlıklarda Türkiye Cumhuriyeti
              kanunları geçerli olup, Ankara Mahkemeleri ve Tüketici Hakem Heyetleri yetkilidir.
            </p>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
