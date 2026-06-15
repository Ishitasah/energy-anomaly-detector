from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load model on startup
with open('model.pkl', 'rb') as f:
    saved = pickle.load(f)
    model = saved['model']
    scaler = saved['scaler']
    features = saved['features']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame(data)

    df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
    df['is_weekend'] = pd.to_datetime(df['timestamp']).dt.dayofweek >= 5
    df['rolling_mean_3h'] = df['Usage_kWh'].rolling(3).mean().ffill().bfill()
    df['rolling_mean_24h'] = df['Usage_kWh'].rolling(24).mean().ffill().bfill()
    df['deviation_from_mean'] = df['Usage_kWh'] - df['rolling_mean_24h']

    X = df[features].fillna(0)
    X_scaled = scaler.transform(X)

    predictions = model.predict(X_scaled)
    scores = model.decision_function(X_scaled)

    results = []
    for i in range(len(df)):
        results.append({
            'timestamp': str(df.iloc[i].get('timestamp', '')),
            'usage': float(df.iloc[i]['Usage_kWh']),
            'is_anomaly': bool(predictions[i] == -1),
            'anomaly_score': float(scores[i]),
            'severity': 'high' if scores[i] < -0.2 else 'medium' if scores[i] < 0 else 'low'
        })

    return jsonify(results)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(port=5001, debug=True)