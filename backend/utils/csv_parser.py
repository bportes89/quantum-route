import pandas as pd
from io import BytesIO
from models.data_models import Order, Vehicle

def parse_input_csv(file_content_str: str):
    """
    Parses the input CSV content (already decoded string).
    The CSV format described has two sections or separate lines.
    """
    
    # We expect a string now, not bytes
    lines = file_content_str.splitlines()
    
    orders_data = []
    vehicles_data = []
    
    current_section = None
    headers = []
    
    # Simple parser state machine
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if line.startswith("order_id"):
            current_section = "orders"
            headers = line.split(',')
            continue
        elif line.startswith("vehicle_id"):
            current_section = "vehicles"
            headers = line.split(',')
            continue
            
        if current_section == "orders":
            values = line.split(',')
            # Create dict from headers and values
            row = dict(zip(headers, values))
            orders_data.append(Order(
                order_id=row['order_id'],
                lat=float(row['lat']),
                lng=float(row['lng']),
                demand=int(row['demand']),
                time_start=row['time_start'],
                time_end=row['time_end']
            ))
            
        elif current_section == "vehicles":
            values = line.split(',')
            row = dict(zip(headers, values))
            vehicles_data.append(Vehicle(
                vehicle_id=row['vehicle_id'],
                capacity=int(row['capacity']),
                start_lat=float(row['start_lat']),
                start_lng=float(row['start_lng'])
            ))
            
    return orders_data, vehicles_data
