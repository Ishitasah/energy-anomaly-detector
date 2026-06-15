import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import pickle

# Load dataset
df = pd.read_csv('data/Steel_industry_data.csv')

# Feature engineering
df['date'] = pd.to_datetime(df['date'], dayfirst=True)
df['hour'] = df['date'].dt.hour
df['day_of_week_num'] = df['date'].dt.dayofweek
df['is_weekend'] = (df['day_of_week_num'] >= 5).astype(int)

# Rolling features
df['rolling_mean_3h'] = df['Usage_kWh'].rolling(window=3).mean().ffill().bfill()
df['rolling_mean_24h'] = df['Usage_kWh'].rolling(window=24).mean().ffill().bfill()
df['deviation_from_mean'] = df['Usage_kWh'] - df['rolling_mean_24h']

# Select features
features = [
    'Usage_kWh', 'hour', 'is_weekend',
    'rolling_mean_3h', 'rolling_mean_24h',
    'deviation_from_mean', 'CO2(tCO2)',
    'Lagging_Current_Power_Factor'
]

X = df[features].dropna()

# Scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train Isolation Forest
model = IsolationForest(
    n_estimators=100,
    contamination=0.03,
    random_state=42
)
model.fit(X_scaled)

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump({'model': model, 'scaler': scaler, 'features': features}, f)

print('Model trained and saved!')

# Results
scores = model.decision_function(X_scaled)
predictions = model.predict(X_scaled)
anomaly_count = (predictions == -1).sum()
print(f'Total readings processed: {len(predictions)}')
print(f'Total anomalies detected: {anomaly_count} ({anomaly_count/len(predictions)*100:.1f}%)')
print(f'Peak Usage: {df["Usage_kWh"].max():.2f} kWh')
print(f'Average Usage: {df["Usage_kWh"].mean():.2f} kWh')