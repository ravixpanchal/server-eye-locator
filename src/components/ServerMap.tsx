import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Settings } from "lucide-react";

interface ServerMapProps {
  servers: Array<{
    id: string;
    name: string;
    ip: string;
    location: string;
    coordinates: [number, number];
    status: 'online' | 'offline' | 'warning';
  }>;
}

export function ServerMap({ servers }: ServerMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  
  const initializeMap = async () => {
    if (!mapboxToken || !mapContainer.current) return;
    
    try {
      // Dynamic import of mapbox-gl
      const mapboxgl = (await import('mapbox-gl')).default;
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.accessToken = mapboxToken;
      
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [0, 20],
        zoom: 2,
        projection: 'globe' as any
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add atmosphere
      map.on('style.load', () => {
        map.setFog({
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02
        });
      });

      // Add server markers
      servers.forEach((server) => {
        const statusColor = server.status === 'online' ? '#10b981' : 
                           server.status === 'offline' ? '#ef4444' : '#f59e0b';
        
        // Create custom marker
        const el = document.createElement('div');
        el.className = 'server-marker';
        el.style.cssText = `
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${statusColor};
          border: 3px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          cursor: pointer;
          animation: ${server.status === 'online' ? 'pulse-green' : server.status === 'offline' ? 'pulse-red' : 'none'} 2s infinite;
        `;

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="text-sm">
            <h3 class="font-bold text-lg mb-2">${server.name}</h3>
            <p><strong>IP:</strong> ${server.ip}</p>
            <p><strong>Location:</strong> ${server.location}</p>
            <p><strong>Status:</strong> <span class="inline-block w-2 h-2 rounded-full ${
              server.status === 'online' ? 'bg-green-500' : 
              server.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
            } mr-1"></span>${server.status}</p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat(server.coordinates)
          .setPopup(popup)
          .addTo(map);
      });

      setShowTokenInput(false);
      
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  return (
    <Card className="card-glow h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Global Server Map
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 h-[400px] relative">
        {showTokenInput ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm z-10">
            <div className="bg-card p-6 rounded-lg border border-border max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Setup Mapbox
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your Mapbox public token to display the interactive map. 
                Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
              </p>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-xs"
                />
                <Button 
                  onClick={initializeMap}
                  disabled={!mapboxToken}
                  className="w-full btn-primary"
                >
                  Initialize Map
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        
        <div 
          ref={mapContainer} 
          className="w-full h-full rounded-b-lg"
          style={{ minHeight: '400px' }}
        />
      </CardContent>
    </Card>
  );
}