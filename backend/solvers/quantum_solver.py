from typing import List
import math
import random
from copy import deepcopy
from typing import List, Tuple
from models.data_models import Order, Vehicle
from solvers.classic_solver import solve_classic_vrptw
from utils.distance import haversine

def calculate_route_distance(route: List[dict]) -> float:
    """Calculates total distance of a specific route segment."""
    dist = 0.0
    for i in range(len(route) - 1):
        dist += haversine(
            route[i]["lat"], route[i]["lng"],
            route[i+1]["lat"], route[i+1]["lng"]
        )
    return dist

def simulated_annealing(routes: List[dict], temperature: float = 1000, cooling_rate: float = 0.995) -> Tuple[List[dict], float]:
    """
    Quantum-Inspired Simulated Annealing.
    Uses thermal fluctuations to escape local minima, similar to quantum tunneling.
    """
    current_routes = deepcopy(routes)
    
    # Calculate initial total distance
    current_dist = sum(calculate_route_distance(r["route"]) for r in current_routes)
    
    best_routes = deepcopy(current_routes)
    best_dist = current_dist
    
    # Iterations based on problem size (more points = more search time)
    iterations = 5000 
    
    for i in range(iterations):
        # 1. Perturbation: Try to swap two stops between routes or within a route
        new_routes = deepcopy(current_routes)
        
        # Select two random non-empty routes
        valid_indices = [i for i, r in enumerate(new_routes) if len(r["route"]) > 2] # >2 because of depot start/end
        if len(valid_indices) < 1:
            continue
            
        r_idx = random.choice(valid_indices)
        route = new_routes[r_idx]["route"]
        
        # Swap two random stops (excluding start/end depot)
        if len(route) > 3:
            idx1, idx2 = random.sample(range(1, len(route)-1), 2)
            route[idx1], route[idx2] = route[idx2], route[idx1]
            
            # Recalculate energy (distance)
            new_dist = sum(calculate_route_distance(r["route"]) for r in new_routes)
            
            # 2. Acceptance Probability (Metropolis Criterion)
            # If new solution is better, accept it.
            # If worse, accept it with probability P = exp(-delta / T)
            # This mimics quantum tunneling through energy barriers.
            delta = new_dist - current_dist
            
            if delta < 0 or random.random() < math.exp(-delta / temperature):
                current_routes = new_routes
                current_dist = new_dist
                
                # Keep track of absolute best
                if current_dist < best_dist:
                    best_dist = current_dist
                    best_routes = deepcopy(current_routes)
        
        # Cool down system
        temperature *= cooling_rate
        
    return best_routes, best_dist

def solve_quantum_vrptw(orders: List[Order], vehicles: List[Vehicle]):
    """
    Hybrid Solver:
    1. Uses Classic OR-Tools to get a very good initial solution (Global Minimum candidate).
    2. Applies Quantum-Inspired Simulated Annealing to refine and escape local optima.
    """
    
    # 1. Get Baseline from Classic Solver
    classic_routes, classic_dist, classic_time = solve_classic_vrptw(orders, vehicles)
    
    # 2. Run Quantum-Inspired Optimization
    # Convert Pydantic models to dicts for the annealing algorithm
    # Handle Pydantic v1/v2 compatibility
    try:
        classic_routes_dicts = [r.model_dump() for r in classic_routes]
    except AttributeError:
        classic_routes_dicts = [r.dict() for r in classic_routes]
    
    # We take the structured output from classic and try to optimize it further
    optimized_routes, optimized_dist = simulated_annealing(classic_routes_dicts)
    
    # Calculate improvement ratio for time (assuming speed is constant, time scales with dist)
    ratio = optimized_dist / classic_dist if classic_dist > 0 else 1.0
    optimized_time = classic_time * ratio
    
    return optimized_routes, optimized_dist, optimized_time
