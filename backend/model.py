import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder

# ========================
# VERİ KAYNAĞI SEÇİMİ
# ========================
print("\n========================================")
print("       İKİNCİ EL ARAÇ FİYAT TAHMİN      ")
print("========================================")
print("\nHangi verilerle çalışmak istiyorsunuz?")
print("  1 - Karma       (sentetik + gerçek)")
print("  2 - Sadece Sentetik")
print("  3 - Sadece Gerçek")
print("========================================")
veri_secim = input("Seçiminiz (1/2/3): ").strip()

veri_map = {"1": "karma", "2": "sentetik", "3": "gercek"}
if veri_secim not in veri_map:
    print("Geçersiz seçim, karma mod ile devam ediliyor.")
    veri_secim = "1"
veri_modu = veri_map[veri_secim]

# ========================
# VERİYİ HAZIRLA
# ========================
df_tum = pd.read_csv("arac_verisi.csv")

if veri_modu == "sentetik":
    df = df_tum[df_tum["kaynak"] == "sentetik"].copy()
elif veri_modu == "gercek":
    df = df_tum[df_tum["kaynak"] == "gercek"].copy()
else:
    df = df_tum.copy()

df = df.reset_index(drop=True)
df_gosterim = df.copy()

print(f"\nKullanılan veri: {len(df)} araç ({veri_modu} mod)")

if len(df) < 10:
    print("⚠️  Uyarı: Veri sayısı çok az, tahminler güvenilir olmayabilir.")

encoders = {}
for sutun in ["marka", "model", "yakit", "vites"]:
    le = LabelEncoder()
    df[sutun] = le.fit_transform(df[sutun])
    encoders[sutun] = le

X = df.drop(["fiyat", "kaynak"], axis=1)
y = df["fiyat"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ========================
# MENÜ
# ========================
print("\n========================================")
print("       İKİNCİ EL ARAÇ FİYAT TAHMİN      ")
print("========================================")
print(f"Toplam veri: {len(df)} araç")
print("\n1 - Otomatik Test (veri setinin %20'si)")
print("2 - Manuel Araç Girişi")
print("========================================")
secim = input("Seçiminiz (1 veya 2): ").strip()

# ========================
# SEÇİM 1: OTOMATİK TEST
# ========================
if secim == "1":
    tahminler = model.predict(X_test)
    hata = mean_absolute_error(y_test, tahminler)

    print(f"\nOrtalama Hata Payı: {hata:,.0f} TL")
    print(f"Test edilen araç sayısı: {len(X_test)}")
    print("\n--- Tahmin Sonuçları ---")

    for i, (gercek, tahmin) in enumerate(zip(y_test, tahminler)):
        idx = X_test.index[i]
        marka = df_gosterim["marka"].iloc[idx]
        model_adi = df_gosterim["model"].iloc[idx]
        yil = df_gosterim["yil"].iloc[idx]
        km = df_gosterim["km"].iloc[idx]
        print(f"\n  Araç    : {marka} {model_adi} - Yıl: {yil} - KM: {km:,}")
        print(f"  Gerçek  : {gercek:>10,.0f} TL")
        print(f"  Tahmin  : {tahmin:>10,.0f} TL")
        print(f"  Fark    : {abs(gercek-tahmin):>10,.0f} TL")
        print(f"  {'-'*40}")

# ========================
# SEÇİM 2: MANUEL GİRİŞ
# ========================
elif secim == "2":
    print("\n--- Araç Bilgilerini Girin ---")
    print("(Büyük/küçük harf önemli değil)\n")

    marka = input("Marka (örn: Hyundai): ").strip().title()
    model_adi = input("Model (örn: Accent Blue): ").strip().title()
    yil = int(input("Yıl (örn: 2019): "))
    km = int(input("Kilometre (örn: 75000): "))

    print("\nYakıt Tipi:")
    print("  1. Benzin")
    print("  2. Dizel")
    print("  3. Hibrit")
    yakit_secim = input("Seçiminiz (1/2/3): ").strip()
    yakit_map = {"1": "Benzin", "2": "Dizel", "3": "Hibrit"}
    yakit = yakit_map[yakit_secim]

    print("\nVites Tipi:")
    print("  1. Manuel")
    print("  2. Otomatik")
    vites_secim = input("Seçiminiz (1/2): ").strip()
    vites_map = {"1": "Manuel", "2": "Otomatik"}
    vites = vites_map[vites_secim]

    # Marka ve model veri setinde var mı kontrol et
    marka_bilindi = marka in df_gosterim["marka"].values
    model_bilindi = model_adi in df_gosterim["model"].values

    try:
        marka_enc = encoders["marka"].transform([marka])[0]
        model_enc = encoders["model"].transform([model_adi])[0]
    except:
        marka_enc = 0
        model_enc = 0

    yakit_enc = encoders["yakit"].transform([yakit])[0]
    vites_enc = encoders["vites"].transform([vites])[0]

    girdi = pd.DataFrame([[marka_enc, model_enc, yil, km, yakit_enc, vites_enc]],
                         columns=["marka", "model", "yil", "km", "yakit", "vites"])

    tahmin = model.predict(girdi)[0]

    print(f"\n========================================")
    print(f"  {marka} {model_adi} | {yil} | {km:,} KM | {yakit} | {vites}")
    print(f"  Tahmini Fiyat: {tahmin:,.0f} TL")

    if not marka_bilindi:
        print(f"\n  ⚠️  '{marka}' markası veri setinde yok.")
        print(f"     Tahmin yıl, km, yakıt ve vites üzerinden yapıldı.")
    elif not model_bilindi:
        print(f"\n  ⚠️  '{model_adi}' modeli veri setinde yok.")
        print(f"     Tahmin {marka} markası + yıl, km, yakıt ve vites üzerinden yapıldı.")

    print(f"========================================")

    # Benzer araçları göster
    benzerler = df_gosterim[
        (df_gosterim["marka"] == marka) &
        (df_gosterim["model"] == model_adi)
    ]

    if not benzerler.empty:
        print(f"\nVeri setindeki benzer araçlar ({marka} {model_adi}):")
        for _, row in benzerler.iterrows():
            print(f"  {row['yil']} | {row['km']:,} KM | {row['yakit']} | {row['vites']} → {row['fiyat']:,.0f} TL")
    elif marka_bilindi:
        marka_araclari = df_gosterim[df_gosterim["marka"] == marka]
        print(f"\nBu model yok ama veri setindeki {marka} araçları:")
        for _, row in marka_araclari.iterrows():
            print(f"  {row['model']} | {row['yil']} | {row['km']:,} KM → {row['fiyat']:,.0f} TL")
    else:
        print(f"\n  Veri setinde bu marka/model hiç yok.")
        print(f"  Model tahmini yıl:{yil}, km:{km:,}, {yakit}, {vites} verilerine göre yaptı.")