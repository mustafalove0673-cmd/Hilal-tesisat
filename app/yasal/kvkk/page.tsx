import React from 'react';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { SubpageShell } from '@/components/SubpageShell';
import { SITE_INFO } from '@/lib/site-data';

export const metadata: Metadata = buildPageMetadata({
  title: 'KVKK Aydınlatma Metni | Hilal Tesisat',
  description:
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Hilal Tesisat müşteri ve ziyaretçi kişisel verileri aydınlatma metni.',
  path: '/yasal/kvkk',
});

export default function KvkkPage() {
  return (
    <SubpageShell
      eyebrow="Yasal Bilgilendirme · 6698 Sayılı Kanun"
      title="KVKK Aydınlatma Metni"
      description="Kişisel verilerinizin güvenliği bizim için önceliklidir. 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca veri işleme esaslarımız aşağıdadır."
      breadcrumbs={[
        { name: 'Ana Sayfa', path: '/' },
        { name: 'KVKK Aydınlatma Metni', path: '/yasal/kvkk' },
      ]}
    >
      <article className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="pearl-glass rounded-3xl p-7 sm:p-10 space-y-6 text-sm leading-relaxed text-[#3B3432]">
          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              1. Veri Sorumlusunun Kimliği
            </h2>
            <p>
              İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)
              uyarınca veri sorumlusu sıfatıyla <strong>{SITE_INFO.brandName}</strong> (Adres:{' '}
              {SITE_INFO.fullAddress}, E-posta: {SITE_INFO.email}, Tel: {SITE_INFO.phoneDisplay})
              tarafından işlenen kişisel verilerinize ilişkin olarak sizleri bilgilendirmek
              amacıyla hazırlanmıştır.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              2. İşlenen Kişisel Veriler ve İşleme Amaçları
            </h2>
            <p>
              Web sitemizde yer alan keşif/teklif formları, telefon ve e-posta kanalları üzerinden
              paylaştığınız ad-soyad, telefon numarası, e-posta adresi, ilçe/adres bilgisi ve talep
              içerikleriniz yalnızca;
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Talep ettiğiniz tesisat, kombi, petek temizliği veya doğalgaz hizmetine ilişkin keşif ve fiyat teklifi sunulması,</li>
              <li>Servis randevularının planlanması ve teknik ekibin yönlendirilmesi,</li>
              <li>6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında garanti ve faturalandırma süreçlerinin yürütülmesi,</li>
              <li>5651 sayılı Kanun ve bilgi güvenliği mevzuatı uyarınca sistem güvenliğinin sağlanması</li>
            </ul>
            <p>amaçlarıyla sınırlı olarak işlenmektedir.</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi
            </h2>
            <p>
              Verileriniz elektronik ortamda (iletişim formu, bülten kaydı) veya telefon aracılığıyla;
              KVKK m. 5/2-c (bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması),
              m. 5/2-ç (veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi) ve açık rızanızın
              bulunması hukuki sebeplerine dayanılarak işlenmektedir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              4. Veri Aktarımı ve Saklama Süresi
            </h2>
            <p>
              Kişisel verileriniz üçüncü kişilere pazarlama amacıyla kesinlikle satılmaz veya
              kiralanmaz. Veriler yalnızca yasal zorunluluk halinde yetkili kamu kurumlarıyla (ör.
              Başkentgaz proje onay süreçleri, vergi mevzuatı gereklilikleri) mevzuat sınırları
              içinde paylaşılır ve yasal zamanaşımı sürelerinin dolmasının ardından imha edilir.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#1D1716]">
              5. KVKK Madde 11 Kapsamındaki Haklarınız
            </h2>
            <p>
              KVKK’nın 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme,
              işlenmişse bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, eksik
              veya yanlış işlenmişse düzeltilmesini isteme, silinmesini/yok edilmesini talep etme
              haklarına sahipsiniz. Taleplerinizi <strong>{SITE_INFO.email}</strong> adresine
              iletebilirsiniz.
            </p>
          </section>
        </div>
      </article>
    </SubpageShell>
  );
}
