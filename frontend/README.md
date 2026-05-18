# AI Tabanlı Araç Fiyat Değerleme ve Karar Destek Asistanı - Frontend

Bu proje, ikinci el araç ilanlarının analiz edilerek kullanıcıya fiyat tahmini, risk değerlendirmesi ve karar destek çıktıları sunan bir sistemin frontend arayüzüdür. Geliştirilen arayüz, kullanıcıdan alınan verileri işleyerek anlaşılır ve görsel olarak desteklenmiş sonuçlar sunmayı amaçlamaktadır.

---

## Projenin Amacı

Bu frontend uygulaması, kullanıcıların araç alım sürecinde daha bilinçli karar verebilmesi için:

* Tahmini piyasa değeri sunmak
* Araçla ilgili riskleri analiz etmek
* Fiyatı etkileyen faktörleri açıklamak

amacıyla tasarlanmıştır.

---

## Kullanılan Teknolojiler

* React
* TypeScript
* Tailwind CSS
* Vite

---

## Proje Yapısı

Proje, bileşen tabanlı bir yapı ile geliştirilmiştir:

* **HomePage**
  Kullanıcıdan araç bilgisi veya ilan linki alınan ana ekran

* **Dashboard**
  Analiz sonuçlarının gösterildiği ekran

* **Components**
  Tekrar kullanılabilir arayüz bileşenleri:

  * PriceGauge (Fiyat metriği)
  * RiskScoreCard (Risk analizi)
  * DecisionTable (Karar destek tablosu)
  * AISummaryCard (Yapay zeka değerlendirmesi)
  * VehicleInfoCard (Araç bilgileri)

---

## Projenin Çalıştırılması

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip ediniz:

1. Proje klasörünü açın
2. Terminal üzerinden aşağıdaki komutu çalıştırın:

```bash
npm install
```

3. Bağımlılıklar yüklendikten sonra uygulamayı başlatın:

```bash
npm run dev
```



---

## Kullanım

1. Ana ekranda:

   * Araç ilan linki girilebilir
   * veya manuel olarak araç bilgileri girilebilir

2. “Analyze” butonuna basılarak analiz süreci başlatılır

3. Dashboard ekranında:

   * Tahmini fiyat aralığı
   * Fiyatın piyasa konumu
   * Risk analizi
   * Yapay zeka değerlendirmesi
   * Karar destek tablosu

görüntülenir.

---

## Not

Bu proje, frontend prototip aşamasındadır.

* Analiz sonuçları örnek veri (mock data) ile oluşturulmaktadır
* Backend, veri çekme ve yapay zeka entegrasyonları bu sürümde aktif değildir
* Sistem, ilerleyen aşamalarda gerçek veri ve model entegrasyonu ile geliştirilecektir

---

## Geliştiriciler

* Elman Marefat
* Görkem Furkan Çağlayan

---
