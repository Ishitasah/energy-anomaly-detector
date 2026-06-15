import pandas as pd
import requests
import json

df = pd.read_csv('data/Steel_industry_data.csv')
df['date'] = pd.to_datetime(df['date'], dayfirst=True)

readings = []
for _, row in df.iterrows():
    readings.append({
        'timestamp': str(row['date']),
        'Usage_kWh': float(row['Usage_kWh']),
        'CO2(tCO2)': float(row['CO2(tCO2)']),
        'Lagging_Current_Power_Factor': float(row['Lagging_Current_Power_Factor'])
    })

batch_size = 100
total = len(readings)
print(f'Total readings to send: {total}')

for i in range(0, total, batch_size):
    batch = readings[i:i+batch_size]
    res = requests.post('http://localhost:5000/api/readings/batch', 
                       json={'readings': batch})
    print(f'Sent {min(i+batch_size, total)}/{total} — {res.json()}')

print('Seeding complete!')