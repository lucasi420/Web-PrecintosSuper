import os
import pandas as pd
import json
from datetime import datetime
from zoneinfo import ZoneInfo  # Python 3.9+

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

        # Eliminar columnas 'Unnamed'
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

        # Convertir NaN a None
        df = df.where(pd.notnull(df), None)

        # Fecha/hora en Argentina
        ahora_arg = datetime.now(ZoneInfo("America/Argentina/Buenos_Aires"))
        fecha_actualizacion = ahora_arg.strftime("%Y-%m-%d %H:%M:%S")

        # Crear objeto JSON
        output = {
            "actualizado": fecha_actualizacion,
            "clientes": df.to_dict(orient="records")
        }

        nombre_json = archivo.replace(".xlsx", ".json")
        with open(f"data/{nombre_json}", "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        print(f"✅ Convertido: {archivo} → {nombre_json}")
    else:
        print(f"⚠️ No se encontró: {archivo}")
