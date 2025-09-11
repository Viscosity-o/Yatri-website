import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// We'll create custom CSS-based markers instead of using problematic image imports

interface Marker {
  lat: number;
  lng: number;
  title: string;
  description: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  priority?: 'High' | 'Medium' | 'Low';
  type?: string;
}

interface LeafletPoliceMapProps {
  markers?: Marker[];
  height?: string;
  className?: string;
}

export function LeafletPoliceMap({ 
  markers = [], 
  height = '100vh',
  className = '' 
}: LeafletPoliceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Create custom icons for different priorities using CSS-only approach
  const createCustomIcon = (color: string, priority?: string) => {
    const colorValue = getColorValue(color);
    const iconHtml = `
      <div style="position: relative; width: 24px; height: 24px;">
        <div style="
          background: ${colorValue};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          position: absolute;
          top: 2px;
          left: 2px;
          ${priority === 'High' ? 'animation: pulse 2s infinite;' : ''}
        "></div>
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 8px;
          z-index: 10;
        "></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'custom-police-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  const getColorValue = (color: string) => {
    switch (color) {
      case 'red': return '#ef4444';
      case 'orange': return '#f97316';
      case 'yellow': return '#eab308';
      case 'green': return '#22c55e';
      case 'blue': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [28.6139, 77.2090], // Delhi coordinates
      zoom: 12,
      zoomControl: false, // We'll add custom controls
      attributionControl: true
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add custom zoom controls
    const customZoomControl = L.control.zoom({
      position: 'topright'
    });
    customZoomControl.addTo(map);

    // Create markers layer
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      .custom-police-marker {
        background: transparent !important;
        border: none !important;
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: none;
      }
      
      .leaflet-popup-tip {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.7;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  // Update markers when props change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Add new markers
    markers.forEach((marker) => {
      const customIcon = createCustomIcon(marker.color, marker.priority);
      
      const leafletMarker = L.marker([marker.lat, marker.lng], {
        icon: customIcon
      });

      // Create popup content
      const popupContent = `
        <div class="p-4 min-w-[280px]">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-slate-900">${marker.title}</h3>
            <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              marker.priority === 'High' ? 'bg-red-100 text-red-800' :
              marker.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
              'bg-yellow-100 text-yellow-800'
            }">
              ${marker.priority || 'Normal'}
            </span>
          </div>
          <p class="text-sm text-slate-600 mb-3">${marker.description}</p>
          <div class="flex items-center text-xs text-slate-500 mb-3">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            ${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}
          </div>
          <div class="flex space-x-2">
            <button class="flex-1 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
              Respond
            </button>
            <button class="flex-1 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors">
              Details
            </button>
          </div>
        </div>
      `;

      leafletMarker.bindPopup(popupContent, {
        maxWidth: 320,
        className: 'custom-popup'
      });

      leafletMarker.addTo(markersLayerRef.current!);
    });

    // Fit bounds to markers if they exist
    if (markers.length > 0) {
      const group = new L.featureGroup();
      markers.forEach(marker => {
        group.addLayer(L.marker([marker.lat, marker.lng]));
      });
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [markers]);

  return (
    <div 
      ref={mapRef} 
      className={`leaflet-map ${className}`}
      style={{ height, width: '100%' }}
    />
  );
}