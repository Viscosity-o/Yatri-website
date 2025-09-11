import React, { useEffect, useRef } from 'react';

interface Marker {
  lat: number;
  lng: number;
  title: string;
  description: string;
  color: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  priority?: 'High' | 'Medium' | 'Low';
  type?: string;
}

interface SimplePoliceMapProps {
  markers?: Marker[];
  height?: string;
  className?: string;
}

export function SimplePoliceMap({ 
  markers = [], 
  height = '100vh',
  className = '' 
}: SimplePoliceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

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

    // Dynamically import Leaflet to avoid build issues
    const initMap = async () => {
      try {
        // Load Leaflet CSS first
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
        
        const L = await import('leaflet');
        
        // Initialize map
        const map = L.map(mapRef.current!, {
          center: [28.6139, 77.2090], // Delhi coordinates
          zoom: 12,
          zoomControl: true,
          attributionControl: true
        });

        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add markers
        markers.forEach((marker) => {
          const colorValue = getColorValue(marker.color);
          
          // Create custom HTML for marker
          const iconHtml = `
            <div style="
              position: relative;
              width: 20px;
              height: 20px;
              background: ${colorValue};
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
              ${marker.priority === 'High' ? 'animation: pulse 2s infinite;' : ''}
            ">
              <div style="
                width: 6px;
                height: 6px;
                background: white;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "></div>
            </div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-police-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -10]
          });
          
          const leafletMarker = L.marker([marker.lat, marker.lng], {
            icon: customIcon
          });

          // Create popup content
          const popupContent = `
            <div style="padding: 12px; min-width: 200px; font-family: system-ui, sans-serif;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${marker.title}</h3>
                <span style="
                  display: inline-block;
                  padding: 2px 6px;
                  font-size: 10px;
                  font-weight: 500;
                  border-radius: 12px;
                  ${marker.priority === 'High' ? 'background: #fef2f2; color: #dc2626;' :
                    marker.priority === 'Medium' ? 'background: #fffbeb; color: #d97706;' :
                    'background: #fefce8; color: #ca8a04;'}
                ">${marker.priority || 'Normal'}</span>
              </div>
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${marker.description}</p>
              <div style="font-size: 10px; color: #9ca3af; margin-bottom: 8px;">
                📍 ${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)}
              </div>
              <div style="display: flex; gap: 6px;">
                <button style="
                  flex: 1;
                  padding: 6px 8px;
                  font-size: 11px;
                  font-weight: 500;
                  color: white;
                  background: #3b82f6;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                ">Respond</button>
                <button style="
                  flex: 1;
                  padding: 6px 8px;
                  font-size: 11px;
                  font-weight: 500;
                  color: #374151;
                  background: #f3f4f6;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                ">Details</button>
              </div>
            </div>
          `;

          leafletMarker.bindPopup(popupContent, {
            maxWidth: 250,
            className: 'custom-popup'
          });

          leafletMarker.addTo(map);
        });

        // Fit bounds to markers if they exist
        if (markers.length > 0) {
          const group = new L.FeatureGroup();
          markers.forEach(marker => {
            group.addLayer(L.marker([marker.lat, marker.lng]));
          });
          map.fitBounds(group.getBounds().pad(0.1));
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
          .custom-police-marker {
            background: transparent !important;
            border: none !important;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            border: none !important;
          }
          
          .leaflet-popup-tip {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }
          
          .leaflet-popup-content {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `;
        if (!document.querySelector('style[data-police-map]')) {
          style.setAttribute('data-police-map', 'true');
          document.head.appendChild(style);
        }

      } catch (error) {
        console.error('Failed to load map:', error);
        // Show fallback
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              background: #f8f9fa;
              color: #6c757d;
              font-family: system-ui, sans-serif;
            ">
              <div style="text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
                <h3 style="margin: 0 0 8px 0;">Map Loading...</h3>
                <p style="margin: 0; font-size: 14px;">Interactive map will appear here</p>
              </div>
            </div>
          `;
        }
      }
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers]);

  return (
    <div 
      ref={mapRef} 
      className={`police-map ${className}`}
      style={{ height, width: '100%', borderRadius: '8px' }}
    />
  );
}