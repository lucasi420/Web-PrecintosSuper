import os
import pandas as pd

archivos = [
    "clientes_cable.xlsx",
    "clientes_internet.xlsx",
    "clientes_gpon_borrados.xlsx",
    "probable_gpon.xlsx"
]

os.makedirs("data", exist_ok=True)

for archivo in archivos:
    path_excel = f"data/{archivo}"
    if os.path.exists(path_excel):
        df = pd.read_excel(path_excel)
        nombre_json = archivo.replace(".xlsx", ".json")
        df.to_json(f"data/{nombre_json}", orient="records", force_ascii=False, indent=2)
        print(f"✅ Convertido: {archivo} → {nombre_json}")
    else:
        print(f"⚠️ No se encontró: {archivo}")
