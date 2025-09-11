import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer';
import { DivIcon } from 'leaflet';
import { MapService, TouristLocation, HeatmapData } from '../../services/mapService';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  RefreshCw, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  MapPin,
  Activity,
  Shield,
  Phone,
  Navigation
} from 'lucide-react';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Custom icons for emergency situations
const createEmergencyIcon = (color: string, icon: string) => new DivIcon({
  html: `
    <div style="
      background-color: ${color};
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      animation: pulse 2s infinite;
    ">
      ${icon}
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    </style>
  `,
  className: 'emergency-icon',
  iconSize: [35, 35],
  iconAnchor: [17.5, 17.5],
  popupAnchor: [0, -17.5]
});

interface HeatmapStats {
  totalIncidents: number;
  highRiskAreas: number;
  activeAlerts: number;
  responseTime: string;
}

interface PoliceHeatMapProps {
  height?: string;
  showStats?: boolean;
}

function HeatmapControls({ 
  onRefresh, 
  loading, 
  lastUpdate,
  stats 
}: { 
  onRefresh: () => void;
  loading: boolean;
  lastUpdate: Date;
  stats: HeatmapStats;
}) {
  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Card className="w-64 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Threat Analysis</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={onRefresh}
              disabled={loading}
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <CardDescription className="text-xs">
            Updated: {lastUpdate.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 p-2 rounded">
              <div className="text-lg font-bold text-red-600">{stats.totalIncidents}</div>
              <div className="text-xs text-red-800">Active Incidents</div>
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <div className="text-lg font-bold text-orange-600">{stats.highRiskAreas}</div>
              <div className="text-xs text-orange-800">High Risk Areas</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-lg font-bold text-blue-600">{stats.activeAlerts}</div>
              <div className="text-xs text-blue-800">Active Alerts</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="text-lg font-bold text-green-600">{stats.responseTime}</div>
              <div className="text-xs text-green-800">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function HeatmapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
      <h4 className="font-medium text-sm mb-3">Tourist Density Heat Map</h4>
      <div className="space-y-2">
        <div className="flex items-center text-xs">
          <div className="w-4 h-3 mr-2 bg-gradient-to-r from-blue-300 to-blue-500"></div>
          <span>Low Density</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-3 mr-2 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          <span>Medium Density</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-4 h-3 mr-2 bg-gradient-to-r from-red-500 to-red-700"></div>
          <span>High Density</span>
        </div>
      </div>
      <div className="border-t pt-2 mt-3">
        <div className="flex items-center text-xs">
          <div className="w-3 h-3 rounded-full mr-2 bg-red-600 animate-pulse"></div>
          <span>Emergency Incidents</span>
        </div>
        <div className="flex items-center text-xs">
          <div className="w-3 h-3 rounded-full mr-2 bg-orange-500"></div>
          <span>Missing Persons</span>
        </div>
      </div>
    </div>
  );
}

export function PoliceHeatMap({ 
  height = '500px',
  showStats = true 
}: PoliceHeatMapProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [emergencyTourists, setEmergencyTourists] = useState<TouristLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [stats, setStats] = useState<HeatmapStats>({
    totalIncidents: 0,
    highRiskAreas: 0,
    activeAlerts: 0,
    responseTime: '24s'
  });

  const mapService = MapService.getInstance();

  const loadHeatmapData = async () => {
    setLoading(true);
    try {
      const [heatData, tourists] = await Promise.all([
        mapService.fetchHeatmapData(),
        mapService.fetchTouristLocations()
      ]);

      // Filter emergency and missing tourists
      const emergencies = tourists.filter(t => 
        t.status === 'emergency' || t.status === 'missing' || t.status === 'alert'
      );

      setHeatmapData(heatData);
      setEmergencyTourists(emergencies);

      // Calculate stats
      const highRiskAreas = heatData.filter(point => point.intensity > 0.6).length;
      setStats({
        totalIncidents: emergencies.length,
        highRiskAreas: Math.ceil(highRiskAreas / 20), // Group points into areas
        activeAlerts: emergencies.filter(t => t.status === 'alert').length,
        responseTime: '24s'
      });

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load heatmap data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHeatmapData();

    // Set up real-time updates
    const unsubscribe = mapService.subscribeToUpdates(({ tourists, heatmap }) => {
      const emergencies = tourists.filter(t => 
        t.status === 'emergency' || t.status === 'missing' || t.status === 'alert'
      );
      
      setHeatmapData(heatmap);
      setEmergencyTourists(emergencies);
      
      const highRiskAreas = heatmap.filter(point => point.intensity > 0.6).length;
      setStats(prev => ({
        ...prev,
        totalIncidents: emergencies.length,
        highRiskAreas: Math.ceil(highRiskAreas / 20),
        activeAlerts: emergencies.filter(t => t.status === 'alert').length,
      }));
      
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, []);

  const getEmergencyIcon = (status: TouristLocation['status']) => {
    switch (status) {
      case 'emergency': return '🚨';
      case 'missing': return '❓';
      case 'alert': return '⚠️';
      default: return '🚨';
    }
  };

  const getEmergencyColor = (status: TouristLocation['status']) => {
    switch (status) {
      case 'emergency': return '#dc2626';
      case 'missing': return '#ea580c';
      case 'alert': return '#d97706';
      default: return '#dc2626';
    }
  };

  const getStatusBadgeVariant = (status: TouristLocation['status']) => {
    switch (status) {
      case 'emergency': return 'destructive';
      case 'missing': return 'destructive';
      case 'alert': return 'secondary';
      default: return 'destructive';
    }
  };

  const center = mapService.getCityCenter();

  // Convert heatmap data to the format expected by react-leaflet-heatmap-layer
  const heatmapPoints = heatmapData.map(point => [
    point.coordinates[0],
    point.coordinates[1],
    point.intensity
  ]);

  return (
    <div className="relative">
      {showStats && (
        <HeatmapControls
          onRefresh={loadHeatmapData}
          loading={loading}
          lastUpdate={lastUpdate}
          stats={stats}
        />
      )}

      <div className="relative" style={{ height }}>
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

          {/* Heatmap Layer */}
          {heatmapPoints.length > 0 && (
            <HeatmapLayer
              points={heatmapPoints}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => m[2]}
              radius={25}
              blur={15}
              max={1}
              gradient={{
                0.2: 'blue',
                0.4: 'cyan',
                0.6: 'lime',
                0.8: 'yellow',
                1.0: 'red'
              }}
            />
          )}

          {/* Emergency Incident Markers */}
          {emergencyTourists.map((tourist) => (
            <Marker
              key={tourist.id}
              position={tourist.coordinates}
              icon={createEmergencyIcon(
                getEmergencyColor(tourist.status),
                getEmergencyIcon(tourist.status)
              )}
            >
              <Popup>
                <div className="p-3 min-w-[280px]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-red-700">INCIDENT ALERT</h3>
                    <Badge variant={getStatusBadgeVariant(tourist.status)}>
                      {tourist.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-600" />
                      <span className="font-medium">{tourist.name}</span>
                      <span className="text-gray-500 ml-2">({tourist.country})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {tourist.activity}
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                      <span className="font-medium text-red-600">
                        Risk Level: {tourist.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Activity className="w-4 h-4 mr-2" />
                      Last seen: {tourist.lastSeen}
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg mb-4">
                    <div className="text-xs font-medium text-red-800 mb-1">INCIDENT DETAILS</div>
                    <div className="text-sm text-red-700">
                      Tourist ID: {tourist.id}
                    </div>
                    <div className="text-xs text-red-600 mt-1">
                      Coordinates: {tourist.coordinates[0].toFixed(4)}, {tourist.coordinates[1].toFixed(4)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Phone className="w-3 h-3 mr-1" />
                      Emergency Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Navigation className="w-3 h-3 mr-1" />
                      Dispatch Unit
                    </Button>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full mt-2">
                    <Shield className="w-3 h-3 mr-1" />
                    Generate E-FIR
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <HeatmapLegend />

      {/* Real-time Data Indicator */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
        <div className="flex items-center text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          LIVE DATA
        </div>
      </div>
    </div>
  );
}