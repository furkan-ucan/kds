import mysql.connector
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from statsmodels.tools.sm_exceptions import ConvergenceWarning
import json

# MySQL veritabanına bağlan
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='kds'
)
cursor = conn.cursor()

# SQL sorgusu ile veriyi çek
query = "SELECT oda_id, eski_doluluk_orani, tarih FROM oda_doluluk_log"
df = pd.read_sql(query, conn)

# Oda ID'lerini al
oda_ids = df['oda_id'].unique()

# Her oda için modeli eğit ve tahminler yap
oda_tahminleri = {}

for oda_id in oda_ids:
    # Bu oda için veriyi al
    df_oda = df[df['oda_id'] == oda_id].set_index('tarih')

    import warnings
    warnings.simplefilter('ignore', category=ConvergenceWarning)

    # Modeli oluştur ve eğit
    model = ARIMA(df_oda['eski_doluluk_orani'], order=(5, 1, 0))
    model_fit = model.fit()

    # Gelecekteki 12 ay için tahminler yap
    y_future = model_fit.predict(
        start=len(df_oda), end=len(df_oda)+11, typ='levels')

    # Tahminleri bir JSON dosyasına kaydet
    oda_tahminleri[oda_id] = y_future.tolist()

# Convert keys to str
oda_tahminleri_str_keys = {str(key): value for key, value in oda_tahminleri.items()}

# JSON dosyasına oda tahminlerini yaz
with open('oda_tahminleri.json', 'w') as f:
    json.dump(oda_tahminleri_str_keys, f)
# Grafik ayarları
plt.figure(figsize=(10, 6))
for oda_id, tahminler in oda_tahminleri.items():
    plt.plot_date(pd.date_range(start=df_oda.index[-1], periods=13, freq='M')[
                  1:], tahminler, '-', label=f'Oda {oda_id} Tahmini')

plt.title('Gelecekteki Oda Doluluk Oranı Tahminleri')
plt.xlabel('Tarih')
plt.ylabel('Eski Doluluk Oranı')
plt.legend()
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))
plt.gca().xaxis.set_major_locator(mdates.MonthLocator())
plt.xticks(rotation=45)
plt.show()

# Veritabanı bağlantısını kapat
conn.close()
