import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

#global degiskenler
model = None
encoders = {}
df_gosterim = None

def modeli_egit(veri_modu="karma"):
    global model, encoders, df_gosterim
    
    # CSV oku
    df_tum = pd.read_csv("arac_verisi.csv")
    
    # Veri filtreleme
    if veri_modu == "sentetik":
        df = df_tum[df_tum["kaynak"] == "sentetik"].copy()
    elif veri_modu == "gercek":
        df = df_tum[df_tum["kaynak"] == "gercek"].copy()
    else:
        df = df_tum.copy()
        
    df = df_tum.reset_index(drop=True)
    
    # Gorsel veri kopyasi
    df_gosterim = df.copy()
    
    #Encode islemleri
    encoders = {}
    for sutun in ["marka", "model", "yakit", "vites"]:
        le = LabelEncoder()
        df[sutun] = le.fit_transform(df[sutun])
        encoders[sutun] = le
        
    #Girdi ve hedef
    X = df.drop(["fiyat", "kaynak"] axis=1)
    y = df["fiyat"]
    
    #Egitim/test
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )
    
    #Egit
    model.fit(X_train, y_train)
    return model

def fiyat_tahmin_et(marka, model_adi, yil,km, yakit, vites):
    global model, encoders, df_gosterim
    
    #Marka/model veri setinde var mi?
    marka_bilindi = marka in df_gosterim["marka"].values
    model_bilindi = model_adi in df_gosterim["model"].values
    
    #Encode islemleri
    try:
        marka_enc = encoders["marka"].transform([marka])[0]
        model_enc = encoders["model"].transform([model_adi])[0]
    except:
        marka_enc = 0
        model_enc = 0
        
    yakit_enc = encoders["yakit"].transform([yakit])[0]
    vites_enc = encoders["vites"].transform([vites])[0]
    
    #Dataframe olustur
    girdi = pd.DataFrame(
        [[marka_enc, model_enc, yil, km, yakit_enc, vites_enc]],
        columns=["marka", "model", "yil", "km", "yakit", "vites"]
    )
    
    #tahmin
    tahmin = model.predict(girdi)[0]
    
    #benzer araclar
    benzerler = df_gosterim[
        (df_gosterim["marka"] == marka) &
        (df_gosterim["model"] == model_adi)
        ]
    
    benzer_liste = []
    
    if not benzerler.empty:
        for _, row in benzerler.iterrows():
            benzer_liste.append({
                "yil": int(row["yil"]),
                "km": int(row["km"]),
                "fiyat": int(row["fiyat"])
            })

    return {
        "tahmini_fiyat": round(tahmin),
        "marka_bilindi": marka_bilindi,
        "model_bilindi": model_bilindi,
        "benzer_araclar": benzer_liste
    }