# Abisena / Panates — Hasta Takip Sistemi

**Teknik Case Study** • Poliklinik Hasta Randevu ve Takip Paneli
**Stack:** React 18 + TypeScript + Vite

PDF dokümantasyonunda tanımlanan tüm gereksinimleri karşılayan bir tek sayfalık (SPA) hasta takip uygulaması.

---

## Özellikler

| Gereksinim                  | Durum | Notlar                                                                 |
| --------------------------- | :---: | ---------------------------------------------------------------------- |
| React 18 (Next.js yok)      |  ✅   | Vite ile kuruldu                                                       |
| TypeScript (strict)         |  ✅   | `strict: true`, `noUnusedLocals`, `noUnusedParameters`                 |
| **GET — API** (listeleme)   |  ✅   | `https://v0-json-api-three.vercel.app/api/data` üzerinden çekilir       |
| **Ekle — Local**            |  ✅   | API çağrısı yok; local state'e yazılır, anında listede görünür         |
| **Düzenle — Local**         |  ✅   | Local state üzerinde immutable update                                  |
| **Sil — Local**             |  ✅   | Onay diyaloğu sonrası local state'ten kaldırılır                        |
| **Sıralama**                |  ✅   | Randevu tarihi (yeni/eski), ada göre (A→Z), skor (yüksek→düşük)        |
| **Filtreleme**              |  ✅   | Hasta durumuna göre (Bekliyor / Muayenede / Tamamlandı / İptal)         |
| **Arama**                   |  ✅   | Ad, tanı (TR/EN) ve etiketler üzerinde anlık arama                     |
| **TR / EN Çoklu Dil**       |  ✅   | Context tabanlı i18n, `localStorage`'a kalıcı, ilk yüklemede otomatik   |

---

## Veri Modeli — `PatientRecord`

PDF'te belirtilen tüm alanlar typed olarak modellendi: `id`, `fullName`, `birthDate`, `appointmentDate`, `createdAt`, `department`, `status`, `priority`, `bloodType`, `score`, `note_tr`, `note_en`, `diagnosis_tr`, `diagnosis_en`, `isInsured`, `isFollowUp`, `isVaccinated`, `tags`, `notes?`.

Tip tanımı: [`src/types/patient.ts`](src/types/patient.ts)

---

## Mimari

```
src/
├── api/patients.ts          # GET fetch (AbortController desteği)
├── hooks/usePatients.ts     # Local state CRUD + reload
├── i18n/
│   ├── strings.ts           # TR/EN string havuzu (tip güvenli)
│   └── I18nContext.tsx      # Context + provider + persistence
├── components/
│   ├── Header.tsx           # Logo, başlık, dil değiştirici
│   ├── Toolbar.tsx          # Arama + filtre + sıralama + yeni hasta
│   ├── PatientCard.tsx      # Kart görünümü (status/priority/score)
│   ├── PatientForm.tsx      # Add/Edit ortak form (controlled inputs)
│   ├── Modal.tsx            # ESC + overlay click ile kapanan dialog
│   └── ConfirmDialog.tsx    # Sil onay diyaloğu
├── types/patient.ts         # PatientRecord, draft, sabit listeler
├── utils/format.ts          # Tarih biçimleme, yaş hesabı
├── App.tsx                  # Sayfa iskeleti, state komposizyonu
├── App.css                  # Kompozisyon stilleri
├── index.css                # Tasarım token'ları (renk/spacing/dark)
└── main.tsx
```

### Tasarım kararları

- **Local CRUD:** API yalnızca okuma için kullanılır; PDF gereksinimi gereği yazma işlemleri local state üzerinde tutulur. Sayfa yenilendiğinde local değişiklikler sıfırlanır gerçek bir sistemde POST/PUT/DELETE noktaları aynı `usePatients` hook'una drop-in olarak eklenebilir.
- **Çift dil notlar/tanılar:** Veri modelinde zaten TR ve EN versiyonları bulunduğundan, kart görünümleri aktif dile göre doğru alanı seçer; arama her iki dildeki tanılarda da çalışır.
- **Form Validasyonu:** `fullName`, `diagnosis_tr`, `diagnosis_en` zorunlu — yerelleştirilmiş hata mesajları.
- **Erişilebilirlik:** Modal `role="dialog"` + `aria-modal`, ESC ile kapanma, focus trap girişi; tüm form alanlarında `aria-label` veya görünen label.
- **Dark mode:** `prefers-color-scheme` üzerinden otomatik.
- **Bağımlılık minimumda:** Yalnızca `react` + `react-dom`. UI kit / state library / routing yok — case'in kapsamına uygun olarak side-stack minimum tutuldu.

---

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run preview    # built bundle'ı önizle
```

Node 18+ gerekir. Build çıktısı `dist/` altına yazılır.

---

## Notlar

- API yanıtı `Array<PatientRecord>` formatında 50 örnek kayıt döner. Hata durumlarında (network/parse) UI bir hata kartı ve "Tekrar dene" butonu gösterir.
- Sıralama / filtreleme / arama tek bir `useMemo` zinciri ile hesaplanır; veri büyüse de re-render maliyeti küçüktür.
- `id` üretimi local kayıtlar için `loc-<base36-timestamp+random>` formatındadır; API'den gelen kayıtların `pat-XXX` id'leriyle çakışmaz.

---

Hazırlayan: Alperen Güntekin · Mayıs 2026
