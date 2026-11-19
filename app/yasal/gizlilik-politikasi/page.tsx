import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { SITE_INFO } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'Gizlilik Politikası | Hilal Tesisat',
  description:
    'Hilal Tesisat web sitesi gizlilik politikası, veri güvenliği önlemleri ve kullanıcı bilgilerinin korunmasına ilişkin esaslar.',
  path: '/yasal/gizlilik-politikasi',
});

export default function GizlilikPolitikasiPage() {
  return (
    <SubpageShell
      eyebrow="Yasal Bilgilendirme"
      title="Gizlilik Politikası"
      description="Ziyaretçilerimizin gizliliğini korumak ve kişisel bilgilerinizi güncel siber güvenlik standartlarıyla güvence altına almak temel taahhüdümüzdür."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'Gizlilik Politikası', path: '/yasal/gizlilik-politikasi' },
      ]}
    >
      <article className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="pearl-glass rounded-3xl p-7 sm:p-10 space-y-6 text-sm leading-relaxed text-[#3B3432]">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              1. Gizlilik Taahhüdümüz
            </h2>
            <p>
              <strong>{SITE_INFO.brandName}</strong> web sitesini ziyaret eden kullanıcılarımızın
              paylaştığı tüm iletişim ve talep bilgileri gizli tutulur. Site trafiğimiz SSL/TLS
              şifreleme ve modern güvenlik başlıkları (CSP, HSTS, hız sınırlama ve form doğrulama)
              ile korunmaktadır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              2. Toplanan Bilgilerin Kullanımı
            </h2>
            <p>
              İletişim veya teklif formunda belirttiğiniz bilgiler yalnızca teknik keşif, servis
              randevusu ve müşteri memnuniyeti iletişimi için kullanılır. 6563 sayılı Elektronik
              Ticaretin Düzenlenmesi Hakkında Kanun uyarınca açık onayınız olmaksızın ticari
              elektronik ileti gönderilmez.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              3. İletişim ve Güncelleme Talepleri
            </h2>
            <p>
              Gizlilik politikamız veya kayıtlı bilgilerinizin güncellenmesi/silinmesi için{' '}
              <strong>{SITE_INFO.email}</strong> adresinden veya{' '}
              <strong>{SITE_INFO.phoneDisplay}</strong> numaralı hattan bizimle iletişime
              geçebilirsiniz.
            </p>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
