import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  MapIcon, 
  Satellite, 
  Layers, 
  Navigation, 
  RotateCcw,
  Search,
  Plus,
  Minus,
  Target
} from 'lucide-react';

// Leaflet imports with proper typing
let L: any = null;
let map: any = null;

const loadLeaflet = async () => {
  if (typeof window !== 'undefined' && !L) {
    // Load Leaflet
    const leaflet = await import('leaflet');
    L = leaflet.default;
    
    // Fix default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Load CSS if not already loaded
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }
  return L;
};

interface SimpleWorldMapProps {
  height?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function SimpleWorldMap({ 
  height = '100vh',
  initialCenter = [20, 0], // World view
  initialZoom = 2
}: SimpleWorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const [currentCenter, setCurrentCenter] = useState<[number, number]>(initialCenter);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Popular locations for quick navigation
  const popularLocations = [
    { name: 'New York', coords: [40.7128, -74.0060] as [number, number] },
    { name: 'London', coords: [51.5074, -0.1278] as [number, number] },
    { name: 'Tokyo', coords: [35.6762, 139.6503] as [number, number] },
    { name: 'Sydney', coords: [-33.8688, 151.2093] as [number, number] },
    { name: 'Paris', coords: [48.8566, 2.3522] as [number, number] },
    { name: 'Dubai', coords: [25.2048, 55.2708] as [number, number] },
    { name: 'Delhi', coords: [28.6139, 77.2090] as [number, number] },
    { name: 'São Paulo', coords: [-23.5505, -46.6333] as [number, number] }
  ];

  // Map tile layers
  const getTileLayer = (style: string) => {
    switch (style) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
        };
      case 'terrain':
        return {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
        };
      default:
        return {
          url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        };
    }
  };

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        const leaflet = await loadLeaflet();
        if (!leaflet || !mapRef.current || map) return;

        // Create map
        map = leaflet.map(mapRef.current, {
          center: initialCenter,
          zoom: initialZoom,
          zoomControl: false, // We'll add custom controls
          attributionControl: true,
          maxZoom: 18,
          minZoom: 1,
          worldCopyJump: true,
          maxBounds: [[-90, -180], [90, 180]]
        });

        // Add tile layer
        const tileConfig = getTileLayer(mapStyle);
        leaflet.tileLayer(tileConfig.url, {
          attribution: tileConfig.attribution,
          maxZoom: 18,
          subdomains: 'abcd'
        }).addTo(map);

        // Add custom zoom controls
        const customZoomControl = leaflet.control({ position: 'bottomright' });
        customZoomControl.onAdd = function() {
          const div = leaflet.DomUtil.create('div', 'leaflet-bar leaflet-control');
          div.innerHTML = `
            <div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden;">
              <button id="zoom-in" style="display: block; width: 44px; height: 44px; border: none; background: white; cursor: pointer; border-bottom: 1px solid #e5e7eb;" title="Zoom in">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <button id="zoom-out" style="display: block; width: 44px; height: 44px; border: none; background: white; cursor: pointer;" title="Zoom out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          `;
          
          leaflet.DomEvent.on(div.querySelector('#zoom-in'), 'click', (e: Event) => {
            e.stopPropagation();
            map.zoomIn();
          });
          leaflet.DomEvent.on(div.querySelector('#zoom-out'), 'click', (e: Event) => {
            e.stopPropagation();
            map.zoomOut();
          });
          leaflet.DomEvent.disableClickPropagation(div);
          
          return div;
        };
        customZoomControl.addTo(map);

        // Track map changes
        map.on('zoomend', () => {
          setCurrentZoom(map.getZoom());
        });

        map.on('moveend', () => {
          const center = map.getCenter();
          setCurrentCenter([center.lat, center.lng]);
        });

        // Add click handler to show coordinates with location info
        map.on('click', async (e: any) => {
          const lat = e.latlng.lat.toFixed(6);
          const lng = e.latlng.lng.toFixed(6);
          
          // Create custom marker icon
          const customIcon = leaflet.divIcon({
            html: `
              <div style="
                background: #3b82f6;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 12px;
                font-weight: bold;
              ">📍</div>
            `,
            className: 'custom-location-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12]
          });
          
          // Add temporary marker with enhanced popup
          const marker = leaflet.marker([e.latlng.lat, e.latlng.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div style="padding: 16px; font-family: system-ui; min-width: 250px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div style="
                    width: 32px; 
                    height: 32px; 
                    background: linear-gradient(135deg, #3b82f6, #1e40af); 
                    border-radius: 50%; 
                    margin-right: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 16px;
                  ">🌍</div>
                  <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Dropped Pin</h4>
                </div>
                
                <div style="background: #f9fafb; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                  <div style="font-size: 14px; color: #374151; line-height: 1.5;">
                    <div style="margin-bottom: 6px;">
                      <strong>📍 Coordinates:</strong>
                    </div>
                    <div style="font-family: monospace; background: white; padding: 8px; border-radius: 4px; font-size: 12px;">
                      ${lat}, ${lng}
                    </div>
                  </div>
                </div>
                
                <div style="font-size: 12px; color: #6b7280; margin-bottom: 12px;">
                  <div style="margin-bottom: 4px;">🗺️ Zoom Level: ${map.getZoom()}</div>
                  <div>📏 Approximate accuracy: ${map.getZoom() > 15 ? 'Very High' : map.getZoom() > 10 ? 'High' : map.getZoom() > 5 ? 'Medium' : 'Low'}</div>
                </div>
                
                <div style="display: flex; gap: 8px;">
                  <button onclick="
                    navigator.clipboard.writeText('${lat}, ${lng}').then(() => {
                      this.textContent = '✓ Copied!';
                      setTimeout(() => this.textContent = '📋 Copy', 2000);
                    });
                  " style="
                    flex: 1;
                    padding: 8px 12px;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                  ">📋 Copy</button>
                  <button onclick="
                    const googleMapsUrl = 'https://www.google.com/maps?q=${lat},${lng}';
                    window.open(googleMapsUrl, '_blank');
                  " style="
                    flex: 1;
                    padding: 8px 12px;
                    background: #10b981;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                    cursor: pointer;
                  ">🔗 Google Maps</button>
                </div>
              </div>
            `)
            .openPopup();

          // Remove marker after 15 seconds
          setTimeout(() => {
            try {
              map.removeLayer(marker);
            } catch (error) {
              // Marker might already be removed
            }
          }, 15000);
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('Failed to initialize map:', error);
      } finally {
        setLoading(false);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        map = null;
        setMapLoaded(false);
      }
    };
  }, []);

  // Update tile layer when style changes
  useEffect(() => {
    if (!map || !L) return;

    // Remove all tile layers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Add new tile layer
    const tileConfig = getTileLayer(mapStyle);
    L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);
  }, [mapStyle]);

  // Navigate to location
  const navigateToLocation = (coords: [number, number], zoom: number = 10) => {
    if (map) {
      map.setView(coords, zoom);
    }
  };

  // Reset to world view
  const resetToWorldView = () => {
    if (map) {
      map.setView(initialCenter, initialZoom);
    }
  };

  // Simple search function using predefined locations
  const searchLocation = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simple search in popular locations
    const query = searchQuery.toLowerCase();
    const found = popularLocations.find(loc => 
      loc.name.toLowerCase().includes(query)
    );
    
    if (found) {
      navigateToLocation(found.coords, 10);
      setSearchQuery('');
    } else {
      // Try to parse coordinates
      const coordMatch = searchQuery.match(/(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lng = parseFloat(coordMatch[2]);
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          navigateToLocation([lat, lng], 12);
          setSearchQuery('');
        }
      }
    }
    
    setTimeout(() => setIsSearching(false), 500);
  };

  if (loading) {
    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Loading Interactive Map</h3>
          <p className="text-gray-500">Preparing your world exploration experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height }}>
      {/* Map Container */}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

      {/* Map Style Controls */}
      <div className="absolute top-4 left-4 z-[1000]">
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <MapIcon className="w-4 h-4 mr-2" />
              Map Style
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            <div className="flex flex-col space-y-1">
              <Button
                size="sm"
                variant={mapStyle === 'standard' ? 'default' : 'outline'}
                onClick={() => setMapStyle('standard')}
                className="justify-start text-xs"
              >
                <MapIcon className="w-3 h-3 mr-2" />
                Standard
              </Button>
              <Button
                size="sm"
                variant={mapStyle === 'satellite' ? 'default' : 'outline'}
                onClick={() => setMapStyle('satellite')}
                className="justify-start text-xs"
              >
                <Satellite className="w-3 h-3 mr-2" />
                Satellite
              </Button>
              <Button
                size="sm"
                variant={mapStyle === 'terrain' ? 'default' : 'outline'}
                onClick={() => setMapStyle('terrain')}
                className="justify-start text-xs"
              >
                <Layers className="w-3 h-3 mr-2" />
                Terrain
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Navigation */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Card className="shadow-lg max-w-xs">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Search & Navigate
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {/* Search Input */}
            <div className="flex space-x-1">
              <input
                type="text"
                placeholder="Search city or coordinates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
                className="flex-1 px-2 py-1 border rounded text-xs"
                style={{ fontSize: '12px' }}
              />
              <Button
                size="sm"
                onClick={searchLocation}
                disabled={isSearching || !searchQuery.trim()}
                className="px-2"
              >
                {isSearching ? '⏳' : '🔍'}
              </Button>
            </div>
            
            {/* Quick Navigation */}
            <div>
              <div className="text-xs font-medium mb-1 text-gray-600">Quick Access:</div>
              <div className="grid grid-cols-2 gap-1">
                {popularLocations.map((location) => (
                  <Button
                    key={location.name}
                    size="sm"
                    variant="outline"
                    onClick={() => navigateToLocation(location.coords)}
                    className="text-xs justify-start p-1"
                  >
                    📍 {location.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={resetToWorldView}
              className="w-full text-xs"
            >
              <Target className="w-3 h-3 mr-2" />
              Reset to World View
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Card className="shadow-lg">
          <CardContent className="p-3">
            <div className="text-xs text-gray-600 space-y-1">
              <div className="font-medium">Map Information</div>
              <div>Zoom Level: {currentZoom}</div>
              <div>Center: {currentCenter[0].toFixed(4)}, {currentCenter[1].toFixed(4)}</div>
              <div className="text-gray-500 text-[10px] mt-2">
                Click anywhere to get coordinates
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <Card className="shadow-lg max-w-xs">
          <CardContent className="p-3">
            <div className="text-xs text-gray-600 space-y-1">
              <div className="font-medium mb-2 flex items-center">
                🗺️ Interactive World Map
              </div>
              <div>• <strong>Drag</strong> to pan around the world</div>
              <div>• <strong>Scroll</strong> or use +/- buttons to zoom</div>
              <div>• <strong>Click anywhere</strong> to drop a pin</div>
              <div>• <strong>Search</strong> cities or enter coordinates</div>
              <div>• <strong>Switch styles</strong> (Satellite, Terrain)</div>
              <div className="pt-2 mt-2 border-t border-gray-200 text-[10px] text-gray-500">
                Zoom: {currentZoom} | Style: {mapStyle}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}