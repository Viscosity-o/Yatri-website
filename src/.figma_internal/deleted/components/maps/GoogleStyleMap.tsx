import { useEffect, useState, useRef } from 'react';
import { MapService, TouristLocation, PointOfInterest, HeatmapData } from '../../services/mapService';
import { MapLoadingFallback } from './MapLoadingFallback';
import { createFallbackHeatmap } from './FallbackHeatmap';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  MapPin, 
  Users, 
  RefreshCw, 
  AlertTriangle,
  Navigation,
  Phone,
  Activity,
  Layers,
  Satellite,
  Map as MapIcon,
  Plus,
  Minus,
  RotateCcw,
  Shield,
  Clock
} from 'lucide-react';

// Leaflet imports with proper typing
let L: any = null;
let map: any = null;
let markersLayer: any = null;
let heatmapLayer: any = null;
let clustersLayer: any = null;

const loadLeafletDependencies = async () => {
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

    // Load heatmap plugin
    try {
      if (!document.querySelector('script[src*="leaflet-heat"]')) {
        const heatmapScript = document.createElement('script');
        heatmapScript.src = 'https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js';
        document.head.appendChild(heatmapScript);
        
        // Wait for heatmap script to load
        await new Promise((resolve) => {
          heatmapScript.onload = () => {
            console.log('Heatmap plugin loaded successfully');
            resolve(true);
          };
          heatmapScript.onerror = () => {
            console.log('Heatmap plugin failed to load, will use fallback');
            resolve(false);
          };
          setTimeout(() => {
            console.log('Heatmap plugin loading timeout, will use fallback');
            resolve(false);
          }, 3000);
        });
      }
      
      // Check if heatLayer is available
      setTimeout(() => {
        if (window.L && (window.L as any).heatLayer) {
          console.log('Heatmap plugin is available');
        } else {
          console.log('Heatmap plugin not available, using fallback');
        }
      }, 100);
      
    } catch (error) {
      console.log('Heatmap plugin loading error:', error);
    }

    // Load marker cluster plugin
    try {
      const clusterScript = document.createElement('script');
      clusterScript.src = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js';
      document.head.appendChild(clusterScript);
      
      const clusterCSS = document.createElement('link');
      clusterCSS.rel = 'stylesheet';
      clusterCSS.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css';
      document.head.appendChild(clusterCSS);
      
      const clusterDefaultCSS = document.createElement('link');
      clusterDefaultCSS.rel = 'stylesheet';
      clusterDefaultCSS.href = 'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css';
      document.head.appendChild(clusterDefaultCSS);
      
      // Wait for cluster script to load
      await new Promise((resolve) => {
        clusterScript.onload = resolve;
        clusterScript.onerror = resolve; // Continue even if fails
        setTimeout(resolve, 2000); // Timeout after 2 seconds
      });
    } catch (error) {
      console.log('Cluster plugin not available');
    }

    // Small delay to ensure everything is loaded
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  return L;
};

interface GoogleStyleMapProps {
  height?: string;
  showHeatmap?: boolean;
  showClusters?: boolean;
  showControls?: boolean;
  onTouristClick?: (tourist: TouristLocation) => void;
  mapStyle?: 'standard' | 'satellite' | 'terrain';
}

export function GoogleStyleMap({ 
  height = '500px',
  showHeatmap = false,
  showClusters = true,
  showControls = true,
  onTouristClick,
  mapStyle = 'standard'
}: GoogleStyleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [tourists, setTourists] = useState<TouristLocation[]>([]);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [currentMapStyle, setCurrentMapStyle] = useState(mapStyle);
  const [error, setError] = useState<string | null>(null);
  const [heatmapPluginLoaded, setHeatmapPluginLoaded] = useState(false);
  const mapService = MapService.getInstance();

  // Map tile layers
  const getTileLayer = (style: string) => {
    switch (style) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

  // Load map data
  const loadMapData = async () => {
    setLoading(true);
    try {
      const [touristData, poiData, heatData] = await Promise.all([
        mapService.fetchTouristLocations(),
        mapService.fetchPointsOfInterest(),
        showHeatmap ? mapService.fetchHeatmapData() : Promise.resolve([])
      ]);
      
      console.log('Map data loaded:', {
        tourists: touristData.length,
        pois: poiData.length,
        heatmapPoints: heatData.length,
        showHeatmap
      });
      
      setTourists(touristData);
      setPois(poiData);
      setHeatmapData(heatData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load map data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        const leaflet = await loadLeafletDependencies();
        if (!leaflet || !mapRef.current || map) return;

        const center = mapService.getCityCenter();
      
      // Create map
      map = leaflet.map(mapRef.current, {
        center: center,
        zoom: 12,
        zoomControl: false, // We'll add custom controls
        attributionControl: true,
        maxZoom: 18,
        minZoom: 8
      });

      // Add tile layer
      const tileConfig = getTileLayer(currentMapStyle);
      leaflet.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        maxZoom: 18,
        subdomains: 'abcd'
      }).addTo(map);

      // Add custom zoom controls
      const customZoomControl = leaflet.control({ position: 'topright' });
      customZoomControl.onAdd = function() {
        const div = leaflet.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = `
          <div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden;">
            <button id="zoom-in" style="display: block; width: 40px; height: 40px; border: none; background: white; cursor: pointer; border-bottom: 1px solid #e5e7eb;" title="Zoom in">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button id="zoom-out" style="display: block; width: 40px; height: 40px; border: none; background: white; cursor: pointer;" title="Zoom out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        `;
        
        leaflet.DomEvent.on(div.querySelector('#zoom-in'), 'click', () => map.zoomIn());
        leaflet.DomEvent.on(div.querySelector('#zoom-out'), 'click', () => map.zoomOut());
        leaflet.DomEvent.disableClickPropagation(div);
        
        return div;
      };
      customZoomControl.addTo(map);

      // Initialize layers
      markersLayer = leaflet.layerGroup().addTo(map);
      
      setMapLoaded(true);
      setError(null);
    } catch (err) {
      console.error('Failed to initialize map:', err);
      setError('Failed to load map. Please refresh the page.');
    }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
        map = null;
        markersLayer = null;
        heatmapLayer = null;
        clustersLayer = null;
        setMapLoaded(false);
      }
    };
  }, [currentMapStyle]);

  // Update markers when data changes
  useEffect(() => {
    if (!map || !L || !mapLoaded) return;

    // Clear existing layers
    if (markersLayer) markersLayer.clearLayers();
    if (heatmapLayer) map.removeLayer(heatmapLayer);
    if (clustersLayer) map.removeLayer(clustersLayer);

    // Create custom icons
    const createCustomIcon = (color: string, iconType: 'tourist' | 'poi' | 'emergency') => {
      const iconHtml = iconType === 'emergency' 
        ? '🚨' 
        : iconType === 'poi' 
          ? '📍' 
          : '👤';
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            ${iconType === 'emergency' ? 'animation: pulse 2s infinite;' : ''}
          ">${iconHtml}</div>
          ${iconType === 'emergency' ? `
            <style>
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            </style>
          ` : ''}
        `,
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });
    };

    // Add tourist markers
    if (showClusters && window.L && (window.L as any).markerClusterGroup) {
      // Use clustering
      clustersLayer = (window.L as any).markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster: any) {
          const count = cluster.getChildCount();
          const markers = cluster.getAllChildMarkers();
          const hasEmergency = markers.some((m: any) => m.options.touristData?.status === 'emergency' || m.options.touristData?.status === 'missing');
          
          const color = hasEmergency ? '#ef4444' : count > 10 ? '#f59e0b' : '#3b82f6';
          
          return L.divIcon({
            html: `
              <div style="
                background-color: ${color};
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                font-size: 14px;
              ">${count}</div>
            `,
            className: 'marker-cluster-custom',
            iconSize: [40, 40]
          });
        }
      });

      tourists.forEach(tourist => {
        const color = tourist.status === 'emergency' || tourist.status === 'missing' 
          ? '#ef4444' 
          : tourist.status === 'alert' 
            ? '#f59e0b' 
            : '#10b981';
        
        const iconType = tourist.status === 'emergency' || tourist.status === 'missing' 
          ? 'emergency' 
          : 'tourist';
        
        const marker = L.marker(tourist.coordinates, {
          icon: createCustomIcon(color, iconType),
          touristData: tourist
        });

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 250px; font-family: system-ui;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${tourist.name}</h3>
              <span style="
                background: ${color}; 
                color: white; 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 11px; 
                font-weight: 500;
              ">${tourist.status.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 12px; color: #6b7280; font-size: 14px;">
              <div style="margin-bottom: 4px;">🌍 ${tourist.country}</div>
              <div style="margin-bottom: 4px;">📍 ${tourist.activity}</div>
              <div style="margin-bottom: 4px;">⚠️ Risk: ${tourist.riskLevel.toUpperCase()}</div>
              <div style="margin-bottom: 4px;">🕒 Last seen: ${tourist.lastSeen}</div>
              <div style="font-size: 12px; color: #9ca3af;">ID: ${tourist.id}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button style="
                flex: 1;
                padding: 6px 12px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
              " onclick="console.log('Call tourist')">📞 Call</button>
              <button style="
                flex: 1;
                padding: 6px 12px;
                background: #10b981;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
              " onclick="console.log('Track tourist')">🧭 Track</button>
            </div>
          </div>
        `);

        marker.on('click', () => onTouristClick?.(tourist));
        clustersLayer.addLayer(marker);
      });

      map.addLayer(clustersLayer);
    } else {
      // Add individual markers
      tourists.forEach(tourist => {
        const color = tourist.status === 'emergency' || tourist.status === 'missing' 
          ? '#ef4444' 
          : tourist.status === 'alert' 
            ? '#f59e0b' 
            : '#10b981';
        
        const iconType = tourist.status === 'emergency' || tourist.status === 'missing' 
          ? 'emergency' 
          : 'tourist';
        
        const marker = L.marker(tourist.coordinates, {
          icon: createCustomIcon(color, iconType)
        });

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 250px; font-family: system-ui;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${tourist.name}</h3>
              <span style="
                background: ${color}; 
                color: white; 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 11px; 
                font-weight: 500;
              ">${tourist.status.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 12px; color: #6b7280; font-size: 14px;">
              <div style="margin-bottom: 4px;">🌍 ${tourist.country}</div>
              <div style="margin-bottom: 4px;">📍 ${tourist.activity}</div>
              <div style="margin-bottom: 4px;">⚠️ Risk: ${tourist.riskLevel.toUpperCase()}</div>
              <div style="margin-bottom: 4px;">🕒 Last seen: ${tourist.lastSeen}</div>
              <div style="font-size: 12px; color: #9ca3af;">ID: ${tourist.id}</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <button style="
                flex: 1;
                padding: 6px 12px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
              " onclick="console.log('Call tourist')">📞 Call</button>
              <button style="
                flex: 1;
                padding: 6px 12px;
                background: #10b981;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                cursor: pointer;
              " onclick="console.log('Track tourist')">🧭 Track</button>
            </div>
          </div>
        `);

        marker.on('click', () => onTouristClick?.(tourist));
        markersLayer.addLayer(marker);
      });
    }

    // Add POI markers
    pois.forEach(poi => {
      const marker = L.marker(poi.coordinates, {
        icon: createCustomIcon('#6366f1', 'poi')
      });

      marker.bindPopup(`
        <div style="padding: 8px; min-width: 200px; font-family: system-ui;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${poi.name}</h3>
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">${poi.description}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #3b82f6; font-size: 14px;">👥 ${poi.touristCount} tourists</span>
            <span style="
              background: #e5e7eb; 
              color: #374151; 
              padding: 2px 8px; 
              border-radius: 12px; 
              font-size: 11px; 
              font-weight: 500;
            ">${poi.type}</span>
          </div>
        </div>
      `);

      markersLayer.addLayer(marker);
    });

    // Add heatmap if enabled and data is available
    if (showHeatmap && heatmapData.length > 0) {
      console.log('Attempting to render heatmap with', heatmapData.length, 'data points');
      
      // Try to use the official heatmap plugin first
      if (window.L && (window.L as any).heatLayer) {
        console.log('Using official heatmap plugin');
        try {
          const heatPoints = heatmapData.map(point => [
            point.coordinates[0],
            point.coordinates[1],
            point.intensity
          ]);
          
          heatmapLayer = (window.L as any).heatLayer(heatPoints, {
            radius: 30,
            blur: 20,
            maxZoom: 17,
            gradient: {
              0.1: '#3b82f6',
              0.3: '#06b6d4', 
              0.5: '#10b981',
              0.7: '#f59e0b',
              0.9: '#ef4444',
              1.0: '#dc2626'
            },
            minOpacity: 0.4,
            max: 1.0
          });
          
          map.addLayer(heatmapLayer);
          console.log('Official heatmap layer added successfully');
        } catch (error) {
          console.error('Error with official heatmap plugin:', error);
          // Fall back to custom heatmap
          heatmapLayer = createFallbackHeatmap(heatmapData, map, L);
          if (heatmapLayer) {
            map.addLayer(heatmapLayer);
            console.log('Fallback heatmap layer added successfully');
          }
        }
      } else {
        console.log('Official heatmap plugin not available, using fallback');
        // Use fallback heatmap
        heatmapLayer = createFallbackHeatmap(heatmapData, map, L);
        if (heatmapLayer) {
          map.addLayer(heatmapLayer);
          console.log('Fallback heatmap layer added successfully');
        }
      }
    }

  }, [tourists, pois, heatmapData, mapLoaded, showHeatmap, showClusters, onTouristClick]);

  // Load initial data
  useEffect(() => {
    loadMapData();

    // Set up real-time updates
    const unsubscribe = mapService.subscribeToUpdates(({ tourists: newTourists, pois: newPois, heatmap: newHeatmap }) => {
      setTourists(newTourists);
      setPois(newPois);
      setHeatmapData(newHeatmap);
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, []);

  // Handle map style change
  const changeMapStyle = (style: 'standard' | 'satellite' | 'terrain') => {
    setCurrentMapStyle(style);
  };

  // Show loading fallback while map is initializing
  if (!mapLoaded && !error) {
    return (
      <MapLoadingFallback 
        height={height} 
        loadingText={showHeatmap ? "Loading heatmap visualization..." : "Loading cluster map..."}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="relative bg-red-50 rounded-lg overflow-hidden flex items-center justify-center" style={{ height }}>
        <div className="text-center p-6">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Map Loading Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height }}>
      {/* Map Container */}
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[1000]">
          <div className="text-center">
            <Activity className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading map data...</p>
          </div>
        </div>
      )}

      {/* Controls Panel */}
      {showControls && (
        <div className="absolute top-4 left-4 z-[1000]">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <MapIcon className="w-4 h-4 mr-2" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={currentMapStyle === 'standard' ? 'default' : 'outline'}
                  onClick={() => changeMapStyle('standard')}
                  className="text-xs px-2"
                >
                  <MapIcon className="w-3 h-3 mr-1" />
                  Map
                </Button>
                <Button
                  size="sm"
                  variant={currentMapStyle === 'satellite' ? 'default' : 'outline'}
                  onClick={() => changeMapStyle('satellite')}
                  className="text-xs px-2"
                >
                  <Satellite className="w-3 h-3 mr-1" />
                  Satellite
                </Button>
                <Button
                  size="sm"
                  variant={currentMapStyle === 'terrain' ? 'default' : 'outline'}
                  onClick={() => changeMapStyle('terrain')}
                  className="text-xs px-2"
                >
                  <Layers className="w-3 h-3 mr-1" />
                  Terrain
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={loadMapData}
                disabled={loading}
                className="w-full"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
              {showHeatmap && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    console.log('Force refreshing heatmap data...');
                    const heatData = await mapService.fetchHeatmapData();
                    console.log('New heatmap data:', heatData);
                    setHeatmapData(heatData);
                  }}
                  className="w-full text-xs"
                >
                  <Activity className="w-3 h-3 mr-1" />
                  Refresh Heatmap
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Panel */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Card className="shadow-lg">
            <CardContent className="p-3">
              <div className="text-xs text-gray-500 mb-2">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {tourists.length} tourists
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {pois.length} locations
                </div>
                {showHeatmap && (
                  <>
                    <div className="flex items-center">
                      <Activity className="w-3 h-3 mr-1" />
                      {heatmapData.length} heat points
                    </div>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                        heatmapData.length > 0 ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-xs">{heatmapData.length > 0 ? 'Heatmap Active' : 'Loading Heatmap'}</span>
                    </div>
                    {heatmapData.length > 0 && (
                      <div className="text-xs text-gray-500">
                        Plugin: {window.L && (window.L as any).heatLayer ? 'Official' : 'Fallback'}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Card className="shadow-lg">
          <CardContent className="p-3">
            <h4 className="font-medium text-sm mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Safe</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span>Alert</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Emergency/Missing</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span>Points of Interest</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Indicator */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <div className="bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            LIVE
          </div>
        </div>
      </div>
    </div>
  );
}