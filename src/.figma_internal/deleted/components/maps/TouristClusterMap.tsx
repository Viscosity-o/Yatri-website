import { useEffect, useRef, useState } from 'react';
import { MapService, TouristLocation, PointOfInterest } from '../../services/mapService';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  User, 
  MapPin, 
  AlertTriangle, 
  Phone, 
  Navigation, 
  RefreshCw,
  Users,
  Building,
  Utensils,
  Car,
  Plus
} from 'lucide-react';

// Lazy load map components
import { lazy, Suspense } from 'react';

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })));
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })));
const Marker = lazy(() => import('react-leaflet').then(module => ({ default: module.Marker })));
const Popup = lazy(() => import('react-leaflet').then(module => ({ default: module.Popup })));

// Leaflet components that need dynamic import
let L: any = null;
let MarkerClusterGroup: any = null;

const loadLeafletComponents = async () => {
  if (typeof window !== 'undefined') {
    L = await import('leaflet');
    MarkerClusterGroup = (await import('react-leaflet-cluster')).default;
    
    // Fix for default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }
};

// Custom marker icons
const createCustomIcon = (color: string, icon: string) => {
  if (!L) return null;
  return new L.DivIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
      ">
        ${icon}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const touristStatusColors = {
  safe: '#10b981', // green
  alert: '#f59e0b', // yellow
  missing: '#ef4444', // red
  emergency: '#dc2626' // dark red
};

const poiTypeIcons = {
  monument: '🏛️',
  hotel: '🏨',
  restaurant: '🍽️',
  transport: '🚇',
  hospital: '🏥',
  police: '👮'
};

interface TouristClusterMapProps {
  height?: string;
  showControls?: boolean;
  onTouristClick?: (tourist: TouristLocation) => void;
}

// Map bounds management removed to avoid React hook conflicts

export function TouristClusterMap({ 
  height = '400px', 
  showControls = true,
  onTouristClick 
}: TouristClusterMapProps) {
  const [tourists, setTourists] = useState<TouristLocation[]>([]);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const mapService = MapService.getInstance();

  useEffect(() => {
    loadLeafletComponents().then(() => {
      setLeafletLoaded(true);
    });
  }, []);

  const loadMapData = async () => {
    setLoading(true);
    try {
      const [touristData, poiData] = await Promise.all([
        mapService.fetchTouristLocations(),
        mapService.fetchPointsOfInterest()
      ]);
      setTourists(touristData);
      setPois(poiData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load map data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMapData();

    // Set up real-time updates
    const unsubscribe = mapService.subscribeToUpdates(({ tourists: newTourists, pois: newPois }) => {
      setTourists(newTourists);
      setPois(newPois);
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, []);

  const getTouristStatusIcon = (status: TouristLocation['status']) => {
    switch (status) {
      case 'safe': return '👤';
      case 'alert': return '⚠️';
      case 'missing': return '❓';
      case 'emergency': return '🚨';
      default: return '👤';
    }
  };

  const getStatusBadgeVariant = (status: TouristLocation['status']) => {
    switch (status) {
      case 'safe': return 'default';
      case 'alert': return 'secondary';
      case 'missing': return 'destructive';
      case 'emergency': return 'destructive';
      default: return 'default';
    }
  };

  const center = mapService.getCityCenter();

  if (!leafletLoaded) {
    return (
      <div className="relative" style={{ height }}>
        <Card className="h-full">
          <CardContent className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="relative mb-4">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto" />
                <RefreshCw className="w-6 h-6 text-blue-600 animate-spin absolute -bottom-1 -right-1" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Loading Tourist Map</h3>
              <p className="text-sm text-gray-500">Fetching real-time location data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const MapContent = () => (
    <div className="relative">
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Button
              size="sm"
              variant="outline"
              onClick={loadMapData}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {tourists.length} tourists
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {pois.length} locations
            </div>
          </div>
        </div>
      )}

      <div className="relative" style={{ height }}>
        <Suspense fallback={
          <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
          </div>
        }>
          <MapContainer
            center={center}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Tourist Markers with Clustering */}
            {MarkerClusterGroup && (
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={(cluster: any) => {
                  const count = cluster.getChildCount();
                  const emergencyCount = cluster.getAllChildMarkers().filter((marker: any) => 
                    marker.options.touristData?.status === 'emergency' || 
                    marker.options.touristData?.status === 'missing'
                  ).length;
                  
                  const color = emergencyCount > 0 ? '#ef4444' : '#3b82f6';
                  
                  return new L.DivIcon({
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
                      ">
                        ${count}
                      </div>
                    `,
                    className: 'custom-cluster-icon',
                    iconSize: [40, 40]
                  });
                }}
              >
                {tourists.map((tourist) => {
                  const icon = createCustomIcon(
                    touristStatusColors[tourist.status],
                    getTouristStatusIcon(tourist.status)
                  );
                  
                  return icon ? (
                    <Marker
                      key={tourist.id}
                      position={tourist.coordinates}
                      icon={icon}
                      eventHandlers={{
                        click: () => onTouristClick?.(tourist)
                      }}
                      // @ts-ignore - Custom property for cluster filtering
                      touristData={tourist}
                    >
                      <Popup>
                        <div className="p-2 min-w-[250px]">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-lg">{tourist.name}</h3>
                            <Badge variant={getStatusBadgeVariant(tourist.status)}>
                              {tourist.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="w-4 h-4 mr-2" />
                              {tourist.country}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              {tourist.activity}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Risk Level: {tourist.riskLevel.toUpperCase()}
                            </div>
                            <div className="text-xs text-gray-500">
                              Last seen: {tourist.lastSeen}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {tourist.id}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Navigation className="w-3 h-3 mr-1" />
                              Track
                            </Button>
                            <Button size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ) : null;
                })}
              </MarkerClusterGroup>
            )}

            {/* Points of Interest */}
            {pois.map((poi) => {
              const icon = createCustomIcon('#6366f1', poiTypeIcons[poi.type] || '📍');
              
              return icon ? (
                <Marker
                  key={poi.id}
                  position={poi.coordinates}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-lg mb-2">{poi.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{poi.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-1" />
                          {poi.touristCount} tourists
                        </div>
                        <Badge variant="outline">
                          {poi.type}
                        </Badge>
                      </div>

                      <Button size="sm" className="w-full">
                        <Plus className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ) : null;
            })}
          </MapContainer>
        </Suspense>
      </div>

      {/* Legend */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3">
          <h4 className="font-medium text-sm mb-2">Tourist Status</h4>
          <div className="space-y-1">
            {Object.entries(touristStatusColors).map(([status, color]) => (
              <div key={status} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="capitalize">{status}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center text-xs">
              <div 
                className="w-3 h-3 rounded-full mr-2 border border-gray-300"
                style={{ backgroundColor: '#6366f1' }}
              ></div>
              <span>Points of Interest</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <MapContent />;
}