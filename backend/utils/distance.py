import numpy as np
from math import radians, cos, sin, asin, sqrt

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    # haversine formula 
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    
    # TORTUOSITY FACTOR (Urban Logistics)
    # Trucks don't fly in straight lines. Real roads are winding.
    # 1.3 is a standard industry factor for urban areas (São Paulo/NYC).
    urban_factor = 1.3
    
    return c * r * urban_factor

def create_distance_matrix(locations):
    """
    Creates a distance matrix for a list of locations [(lat, lng), ...]
    """
    size = len(locations)
    matrix = np.zeros((size, size))
    for i in range(size):
        for j in range(size):
            if i != j:
                matrix[i][j] = haversine(locations[i][0], locations[i][1], 
                                         locations[j][0], locations[j][1])
    return matrix
