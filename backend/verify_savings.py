import requests
import os
import time

url = "http://localhost:8000/optimize"

# Run for all scenarios
scenarios = [
    "scenario_1_dense_sp.csv",
    "scenario_2_spread_sp.csv",
    "scenario_3_heavy_load.csv"
]

for scenario in scenarios:
    csv_path = os.path.join("data_examples", scenario)
    if not os.path.exists(csv_path):
        print(f"Skipping {scenario}: Not found")
        continue

    print(f"\nTesting with {scenario}...")
    try:
        with open(csv_path, 'rb') as f:
            files = {'file': f}
            response = requests.post(url, files=files)
            
        if response.status_code == 200:
            data = response.json()
            print(f"  Savings: {data['savings_percent']}%")
            print(f"  Classic: {data['comparison']['classic']['distance_km']} km")
            print(f"  Quantum: {data['comparison']['quantum']['distance_km']} km")
        else:
            print(f"  Error: {response.status_code}")
    except Exception as e:
        print(f"  Exception: {e}")

