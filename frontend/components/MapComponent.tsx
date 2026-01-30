"use client";
import { useEffect, useState } from 'react';
import Map, { Source, Layer, Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// User needs to provide a token. 
// For this demo, we check if one is available in env, otherwise we show a warning.
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapComponent({ routes }: { routes: any[] }) {
  const [viewState, setViewState] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    zoom: 12
  });

  // Calculate center based on routes
  useEffect(() => {
    if (routes && routes.length > 0 && routes[0].route.length > 0) {
      const firstPoint = routes[0].route[0];
      setViewState(prev => ({
        ...prev,
        latitude: firstPoint.lat,
        longitude: firstPoint.lng
      }));
    }
  }, [routes]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-8 text-center">
        <p className="text-xl font-bold text-white mb-2">Mapbox Token Missing</p>
        <p className="mb-4">Please add NEXT_PUBLIC_MAPBOX_TOKEN to your frontend/.env.local file.</p>
        <div className="text-left text-xs bg-slate-950 p-4 rounded border border-slate-800 w-full max-w-md overflow-auto">
          <p className="font-mono mb-2 text-green-400">// frontend/.env.local</p>
          <p className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1...</p>
        </div>
      </div>
    );
  }

  // Prepare GeoJSON for lines
  const layers = routes.map((vehicleRoute, index) => {
    // GeoJSON format requires type Feature
    const coordinates = vehicleRoute.route.map((p: any) => [p.lng, p.lat]);
    const color = index % 2 === 0 ? '#3b82f6' : '#a855f7'; // Blue vs Purple

    const geojson = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      },
      properties: {}
    };

    return (
      <Source key={vehicleRoute.vehicle_id} id={`route-${vehicleRoute.vehicle_id}`} type="geojson" data={geojson as any}>
        <Layer
          id={`line-${vehicleRoute.vehicle_id}`}
          type="line"
          paint={{
            'line-color': color,
            'line-width': 4,
            'line-opacity': 0.8
          }}
        />
      </Source>
    );
  });
  
  // Markers for stops
  const markers = routes.flatMap((vehicleRoute, vIndex) => 
    vehicleRoute.route.map((point: any, pIndex: number) => (
      <Marker 
        key={`${vehicleRoute.vehicle_id}-${pIndex}`} 
        longitude={point.lng} 
        latitude={point.lat} 
        color={vIndex % 2 === 0 ? '#3b82f6' : '#a855f7'}
        scale={0.8}
      />
    ))
  );

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <NavigationControl position="top-right" />
      {layers}
      {markers}
    </Map>
  );
}
