from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class Order(BaseModel):
    order_id: str
    lat: float
    lng: float
    demand: int
    time_start: str
    time_end: str

class Vehicle(BaseModel):
    vehicle_id: str
    capacity: int
    start_lat: float
    start_lng: float

class RoutePoint(BaseModel):
    order_id: str
    lat: float
    lng: float
    arrival_time: Optional[str] = None
    departure_time: Optional[str] = None

class VehicleRoute(BaseModel):
    vehicle_id: str
    route: List[RoutePoint]
    distance_km: float
    duration_min: float
    load: int

class OptimizationResult(BaseModel):
    routes: List[VehicleRoute]
    total_distance_km: float
    total_duration_min: float
    savings_percent: float
    comparison: Dict[str, Any]
