import os
import pandas as pd
from datetime import datetime

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

        # Crear objeto con fecha de actualización
        output = {
            "actualizado": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "clientes": df.to_dict(orient="records")
        }

        nombre_json = archivo.replace(".xlsx", ".json")
        pd.json.dump(output, open(f"data/{nombre_json}", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print(f"✅ Convertido: {archivo} → {nombre_json}")
    else:
        print(f"⚠️ No se encontró: {archivo}")
