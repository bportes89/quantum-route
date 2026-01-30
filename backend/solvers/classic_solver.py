from typing import List, Tuple
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
from models.data_models import Order, Vehicle, VehicleRoute, RoutePoint, OptimizationResult
from utils.distance import create_distance_matrix, haversine
import numpy as np

def parse_time_to_minutes(time_str):
    h, m = map(int, time_str.split(':'))
    return h * 60 + m

def format_minutes_to_time(minutes):
    h = int(minutes // 60)
    m = int(minutes % 60)
    return f"{h:02d}:{m:02d}"

def solve_classic_vrptw(orders: List[Order], vehicles: List[Vehicle]):
    # 1. Prepare Data
    # Combine depot (start locations) and orders into a single list of locations.
    # Note: VRPTW usually assumes a single depot or multi-depot. 
    # For simplicity, if vehicles start at different locations, it's a multi-depot problem.
    # However, let's assume they start at the first vehicle's start location as the "Depot" 
    # or handle the locations index mapping carefully.
    
    # Let's map all unique locations.
    # OR-Tools uses indices. 0 is usually the depot.
    # If vehicles have different start locations, we can use a "dummy" depot with 0 distance to all start points?
    # Or just treat the first vehicle's start as the depot if they are the same.
    # The prompt says: vehicle_id, capacity, start_lat, start_lng.
    # If multiple vehicles, we check if they are same start.
    
    # For MVP: Assume all vehicles start at the same location (the depot).
    # If not, we might need to adjust. Let's assume the first vehicle's start is the depot.
    
    depot_lat = vehicles[0].start_lat
    depot_lng = vehicles[0].start_lng
    
    locations = [(depot_lat, depot_lng)] # Index 0 is Depot
    
    # Map orders to indices
    # orders will be indices 1 to N
    for order in orders:
        locations.append((order.lat, order.lng))
        
    distance_matrix = create_distance_matrix(locations)
    
    # Time Matrix: assume 40km/h => 1km = 1.5 min
    time_matrix = (distance_matrix * 1.5).astype(int) # integers for OR-Tools
    
    data = {}
    data['time_matrix'] = time_matrix
    data['distance_matrix'] = distance_matrix
    data['num_vehicles'] = len(vehicles)
    data['depot'] = 0
    
    # Demands
    # Depot has 0 demand
    demands = [0] + [o.demand for o in orders]
    data['demands'] = demands
    data['vehicle_capacities'] = [v.capacity for v in vehicles]
    
    # Time Windows
    # Convert "08:00" to minutes from 00:00
    # Depot time window: Assume 00:00 to 23:59 (0 to 1440)
    time_windows = [(0, 1440)] 
    for order in orders:
        start = parse_time_to_minutes(order.time_start)
        end = parse_time_to_minutes(order.time_end)
        time_windows.append((start, end))
        
    data['time_windows'] = time_windows
    
    # 2. Create Routing Index Manager
    manager = pywrapcp.RoutingIndexManager(len(data['time_matrix']),
                                           data['num_vehicles'], data['depot'])

    # 3. Create Routing Model
    routing = pywrapcp.RoutingModel(manager)

    # 4. Define Weight/Cost Callbacks
    def time_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)
    
    # Define cost of each arc (time)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    
    # 5. Add Capacity Constraint
    def demand_callback(from_index):
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,  # null capacity slack
        data['vehicle_capacities'],  # vehicle maximum capacities
        True,  # start cumul to zero
        'Capacity')
    
    # 6. Add Time Window Constraint
    routing.AddDimension(
        transit_callback_index,
        30,  # allow waiting time
        1440,  # maximum time per vehicle
        False,  # Don't force start cumul to zero
        'Time')
    time_dimension = routing.GetDimensionOrDie('Time')
    
    # Add time window constraints for each location except depot
    for location_idx, (start, end) in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(start, end)
        
    # Add time window constraints for each vehicle start node
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(data['time_windows'][0][0],
                                                data['time_windows'][0][1])

    # Instantiate route start and end times to produce feasible times.
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))

    # 7. Solve
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 5 # Short time for demo

    solution = routing.SolveWithParameters(search_parameters)

    # 8. Parse Solution
    result_routes = []
    total_dist = 0
    total_time = 0
    
    if solution:
        for vehicle_id in range(data['num_vehicles']):
            index = routing.Start(vehicle_id)
            route_points = []
            route_dist = 0
            route_load = 0
            
            # Start Point
            # route_points.append(RoutePoint(order_id="Depot", lat=depot_lat, lng=depot_lng))
            
            while not routing.IsEnd(index):
                node_index = manager.IndexToNode(index)
                
                # Get Time
                time_var = time_dimension.CumulVar(index)
                arrival_time = format_minutes_to_time(solution.Min(time_var))
                
                # Get info
                if node_index == 0:
                    oid = "Depot"
                    lat, lng = depot_lat, depot_lng
                else:
                    # Orders are shifted by 1 in locations list
                    order = orders[node_index - 1]
                    oid = order.order_id
                    lat, lng = order.lat, order.lng
                    route_load += order.demand
                
                route_points.append(RoutePoint(
                    order_id=oid,
                    lat=lat,
                    lng=lng,
                    arrival_time=arrival_time
                ))
                
                previous_index = index
                index = solution.Value(routing.NextVar(index))
                route_dist += routing.GetArcCostForVehicle(previous_index, index, vehicle_id)
            
            # End Point
            node_index = manager.IndexToNode(index)
            time_var = time_dimension.CumulVar(index)
            arrival_time = format_minutes_to_time(solution.Min(time_var))
            
            route_points.append(RoutePoint(
                order_id="Depot",
                lat=depot_lat,
                lng=depot_lng,
                arrival_time=arrival_time
            ))
            
            # Calculate distance in km (route_dist is in time units actually if we used time as cost)
            # But wait, we used 'transit_callback_index' which is time_matrix.
            # So route_dist is time in minutes.
            # We need actual distance.
            
            # Re-calculate distance for the route
            actual_dist_km = 0
            curr_idx = routing.Start(vehicle_id)
            while not routing.IsEnd(curr_idx):
                next_idx = solution.Value(routing.NextVar(curr_idx))
                if routing.IsEnd(next_idx):
                    break # or add distance to depot
                
                from_node = manager.IndexToNode(curr_idx)
                to_node = manager.IndexToNode(next_idx)
                actual_dist_km += data['distance_matrix'][from_node][to_node]
                curr_idx = next_idx
            # Add return to depot distance if needed (yes usually)
            from_node = manager.IndexToNode(curr_idx) # Last visited
            to_node = manager.IndexToNode(routing.End(vehicle_id)) # Should be depot?
            # routing.End(vehicle_id) corresponds to a node (usually depot in this setup)
            # Actually routing.IsEnd check handles the loop, but let's be careful.
            # The loop above stops when next is End. We need distance from last to End.
            
            # Let's just fix the distance calculation by iterating the route_points
            # We already have route_points with lat/lng
            
            # Better:
            actual_dist_km = 0
            for k in range(len(route_points) - 1):
                p1 = route_points[k]
                p2 = route_points[k+1]
                actual_dist_km += haversine(p1.lat, p1.lng, p2.lat, p2.lng)

            total_dist += actual_dist_km
            total_time += route_dist # route_dist is time cost
            
            result_routes.append(VehicleRoute(
                vehicle_id=vehicles[vehicle_id].vehicle_id,
                route=route_points,
                distance_km=round(actual_dist_km, 2),
                duration_min=route_dist,
                load=route_load
            ))
            
    return result_routes, total_dist, total_time

