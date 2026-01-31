from fastapi import FastAPI, UploadFile, File, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from models.data_models import OptimizationResult
from utils.csv_parser import parse_input_csv
from solvers.classic_solver import solve_classic_vrptw
from solvers.quantum_solver import solve_quantum_vrptw
import uvicorn

app = FastAPI(title="QuantumRoute API", version="1.0.0")

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
        
        # Run Classic Solver
        classic_routes, classic_dist, classic_time = solve_classic_vrptw(orders, vehicles)
        
        # Run Quantum Solver (Simulated)
        quantum_routes, quantum_dist, quantum_time = solve_quantum_vrptw(orders, vehicles)
        
        # Compare
        # Savings: (Classic - Quantum) / Classic * 100
        if classic_dist > 0:
            savings = ((classic_dist - quantum_dist) / classic_dist) * 100
        else:
            savings = 0.0
            
        return OptimizationResult(
            routes=quantum_routes, # We return the "Quantum" routes (which are better or equal)
            total_distance_km=round(quantum_dist, 2),
            total_duration_min=round(quantum_time, 2),
            savings_percent=round(savings, 2),
            comparison={
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
