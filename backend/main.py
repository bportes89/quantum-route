from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from models.data_models import OptimizationResult
from utils.csv_parser import parse_input_csv
from solvers.classic_solver import solve_classic_vrptw
from solvers.quantum_solver import solve_quantum_vrptw
from utils.distance import haversine
import uvicorn

app = FastAPI(title="QuantumRoute API", version="1.0.0")

def calculate_manual_route(orders, vehicles):
    """
    Calculates the distance if the driver follows the CSV order sequentially.
    Depot -> Order 1 -> Order 2 ... -> Order N -> Depot
    """
    if not vehicles or not orders:
        return 0.0, 0.0
        
    # Assume 1st vehicle does everything in order (simple baseline)
    v = vehicles[0]
    current_lat, current_lng = v.start_lat, v.start_lng
    
    total_dist = 0
    
    for o in orders:
        dist = haversine(current_lat, current_lng, o.lat, o.lng)
        total_dist += dist
        current_lat, current_lng = o.lat, o.lng
        
    # Return to depot
    total_dist += haversine(current_lat, current_lng, v.start_lat, v.start_lng)
    
    # Estimate time (assuming 30km/h city average for manual route which is usually inefficient)
    total_time = (total_dist / 30.0) * 60.0
    
    return total_dist, total_time

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "QuantumRoute API is running"}

@app.post("/optimize", response_model=OptimizationResult)
async def optimize_route(file: UploadFile = File(...)):
    try:
        content = await file.read()
        # Decode content if it's bytes
        try:
            content_str = content.decode('utf-8')
        except UnicodeDecodeError:
            content_str = content.decode('latin-1') # Try fallback encoding
            
        orders, vehicles = parse_input_csv(content_str)
        
        if not orders or not vehicles:
            from fastapi import HTTPException
            raise HTTPException(status_code=400, detail="Erro ao processar CSV. Verifique se há pedidos e veículos válidos e se o separador está correto (',' ou ';').")

        # Run Classic Solver
        classic_routes, classic_dist, classic_time = solve_classic_vrptw(orders, vehicles)
        
        # Run Quantum Solver (Simulated)
        quantum_routes, quantum_dist, quantum_time = solve_quantum_vrptw(orders, vehicles)
        
        # Calculate Manual Baseline (Sequence from CSV)
        manual_dist, manual_time = calculate_manual_route(orders, vehicles)

        # Compare
        # Savings: (Manual - Quantum) / Manual * 100
        # We compare against MANUAL because that's the real client pain point.
        if manual_dist > 0:
            savings = ((manual_dist - quantum_dist) / manual_dist) * 100
        elif classic_dist > 0:
             savings = ((classic_dist - quantum_dist) / classic_dist) * 100
        else:
            savings = 0.0
            
        return OptimizationResult(
            routes=quantum_routes, # We return the "Quantum" routes (which are better or equal)
            total_distance_km=round(quantum_dist, 2),
            total_duration_min=round(quantum_time, 2),
            savings_percent=round(savings, 2),
            comparison={
                "manual": {
                    "distance_km": round(manual_dist, 2),
                    "duration_min": round(manual_time, 2)
                },
                "classic": {
                    "distance_km": round(classic_dist, 2),
                    "duration_min": round(classic_time, 2)
                },
                "quantum": {
                    "distance_km": round(quantum_dist, 2),
                    "duration_min": round(quantum_time, 2)
                }
            }
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        from fastapi import HTTPException
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
