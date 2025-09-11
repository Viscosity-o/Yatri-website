// Simplified map component with mock data visualization for better compatibility
import { useState, useEffect } from 'react';
import { MapService, TouristLocation, PointOfInterest } from '../../services/mapService';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  MapPin, 
  Users, 
  RefreshCw, 
  AlertTriangle,
  Navigation,
  Phone,
  Activity
} from 'lucide-react';

interface SimpleMapProps {
  height?: string;
  showHeatmap?: boolean;
  onTouristClick?: (tourist: TouristLocation) => void;
}

export function SimpleMap({ 
  height = '400px', 
  showHeatmap = false,
  onTouristClick 
}: SimpleMapProps) {
  const [tourists, setTourists] = useState<TouristLocation[]>([]);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const mapService = MapService.getInstance();

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

    const unsubscribe = mapService.subscribeToUpdates(({ tourists: newTourists, pois: newPois }) => {
      setTourists(newTourists);
      setPois(newPois);
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, []);

  const getStatusColor = (status: TouristLocation['status']) => {
    switch (status) {
      case 'safe': return 'bg-green-500';
      case 'alert': return 'bg-yellow-500';
      case 'missing': return 'bg-red-500';
      case 'emergency': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: TouristLocation['status']) => {
    switch (status) {
      case 'safe': return 'default';
      case 'alert': return 'secondary';
      case 'missing': return 'destructive';
      case 'emergency': return 'destructive';
      default: return 'default';
    }
  };

  // Calculate positions for visual representation
  const getVisualPosition = (coords: [number, number], index: number) => {
    const [lat, lng] = coords;
    const centerLat = 28.6139;
    const centerLng = 77.2090;
    
    // Convert coordinates to percentage positions
    const x = ((lng - centerLng) * 1000) + 50 + (index * 2) % 20;
    const y = ((centerLat - lat) * 1000) + 50 + (index * 3) % 20;
    
    return {
      left: Math.min(Math.max(x, 5), 90) + '%',
      top: Math.min(Math.max(y, 5), 90) + '%'
    };
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative" style={{ height }}>
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 rounded-lg">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Tourist Markers */}
            {tourists.map((tourist, index) => {
              const position = getVisualPosition(tourist.coordinates, index);
              return (
                <div
                  key={tourist.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={position}
                  onClick={() => onTouristClick?.(tourist)}
                >
                  <div className={`w-4 h-4 rounded-full ${getStatusColor(tourist.status)} border-2 border-white shadow-lg animate-pulse`}>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{tourist.name}</span>
                        <Badge variant={getStatusBadge(tourist.status) as any} className="text-xs">
                          {tourist.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{tourist.country}</div>
                        <div>{tourist.activity}</div>
                        <div>Last seen: {tourist.lastSeen}</div>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          <Navigation className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Points of Interest */}
            {pois.map((poi, index) => {
              const position = getVisualPosition(poi.coordinates, index + 100);
              return (
                <div
                  key={poi.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={position}
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  
                  {/* POI Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[180px]">
                      <h4 className="font-medium text-sm mb-1">{poi.name}</h4>
                      <p className="text-xs text-gray-600 mb-2">{poi.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {poi.touristCount} tourists
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Heatmap overlay for police dashboard */}
            {showHeatmap && (
              <div className="absolute inset-0">
                {/* High density areas */}
                <div className="absolute w-20 h-20 bg-red-500/20 rounded-full" style={{left: '30%', top: '25%'}}></div>
                <div className="absolute w-16 h-16 bg-orange-500/15 rounded-full" style={{left: '60%', top: '40%'}}></div>
                <div className="absolute w-24 h-24 bg-yellow-500/10 rounded-full" style={{left: '45%', top: '60%'}}></div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-20">
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

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
            <h4 className="font-medium text-sm mb-2">Status Legend</h4>
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
                <span>Missing/Emergency</span>
              </div>
              <div className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span>Points of Interest</span>
              </div>
            </div>
          </div>

          {/* Real-time indicator */}
          <div className="absolute bottom-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg z-20">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              LIVE
            </div>
          </div>

          {/* Activity indicator */}
          {loading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-30">
              <div className="text-center">
                <Activity className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-600">Loading live data...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}