from models.data_models import Order, Vehicle

def parse_input_csv(file_content_str: str):
    """
    Parses the input CSV content (already decoded string).
    The CSV format described has two sections or separate lines.
    Supports both comma (,) and semicolon (;) delimiters.
    """
    
    # We expect a string now, not bytes
    lines = file_content_str.splitlines()
    
    orders_data = []
    vehicles_data = []
    
    current_section = None
    headers = []
    delimiter = ',' # Default fallback
    
    # Simple parser state machine
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect delimiter from header lines
        if line.startswith("order_id") or line.startswith("vehicle_id"):
            if ";" in line:
                delimiter = ";"
            else:
                delimiter = ","

        if line.startswith("order_id"):
            current_section = "orders"
            headers = [h.strip() for h in line.split(delimiter)]
            continue
        elif line.startswith("vehicle_id"):
            current_section = "vehicles"
            headers = [h.strip() for h in line.split(delimiter)]
            continue
            
        if current_section == "orders":
            values = [v.strip() for v in line.split(delimiter)]
            # Ensure we have enough values
            if len(values) < len(headers):
                continue
                
            # Create dict from headers and values
            row = dict(zip(headers, values))
            
            try:
                orders_data.append(Order(
                    order_id=row['order_id'],
                    lat=float(row['lat']),
                    lng=float(row['lng']),
                    demand=int(row['demand']),
                    time_start=row['time_start'],
                    time_end=row['time_end']
                ))
            except (KeyError, ValueError):
                continue # Skip invalid rows
            
        elif current_section == "vehicles":
            values = [v.strip() for v in line.split(delimiter)]
            if len(values) < len(headers):
                continue

            row = dict(zip(headers, values))
            try:
                vehicles_data.append(Vehicle(
                    vehicle_id=row['vehicle_id'],
                    capacity=int(row['capacity']),
                    start_lat=float(row['start_lat']),
                    start_lng=float(row['start_lng'])
                ))
            except (KeyError, ValueError):
                continue
            
    return orders_data, vehicles_data
