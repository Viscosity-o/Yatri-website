import { useState } from 'react';
import { useAuth } from '../Router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { GoogleStyleMap } from '../components/maps/GoogleStyleMap';
import { SimplePoliceMap } from '../components/maps/SimplePoliceMap';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  FileText, 
  User, 
  Navigation, 
  Shield,
  LogOut,
  Search,
  Filter,
  Send,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Camera,
  Route,
  Users,
  Settings,
  Activity,
  Radio,
  Signal,
  Target,
  Menu,
  ChevronLeft,
  ChevronRight,
  Layers,
  RotateCcw,
  Plus,
  Upload,
  Video,
  MessageCircle
} from 'lucide-react';
import p2 from '../p2.jpg';


// Mock data
const mockAlerts = [
  {
    id: 'ALERT-2024-001',
    type: 'SOS Emergency',
    tourist: { 
      name: 'John Anderson', 
      id: 'TID-US-2024-001', 
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      nationality: 'USA',
      age: 34,
      phone: '+1-555-0123',
      hotel: 'Hotel Taj Palace',
      emergency_contact: 'Sarah Anderson (Wife) - +1-555-0124'
    },
    location: { lat: 28.6139, lng: 77.2090, address: 'India Gate, Central Delhi', zone: 'Zone-A' },
    timestamp: '2024-01-15T16:22:15Z',
    timeAgo: '2 min ago',
    priority: 'High',
    status: 'active',
    assignedUnit: 'PCR-203',
    eta: '4 min',
    confidence: 95,
    time: '16:22',
    description: 'Tourist activated emergency SOS signal'
  },
  {
    id: 'ALERT-2024-002',
    type: 'Geo-fence Violation',
    tourist: { 
      name: 'Emma Wilson', 
      id: 'TID-UK-2024-002', 
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      nationality: 'UK',
      age: 28,
      phone: '+44-7700-123456',
      hotel: 'Hotel Imperial',
      emergency_contact: 'James Wilson (Husband) - +44-7700-123457'
    },
    location: { lat: 28.6562, lng: 77.2410, address: 'Red Fort Restricted Area', zone: 'Zone-B' },
    timestamp: '2024-01-15T16:14:30Z',
    timeAgo: '8 min ago',
    priority: 'Medium',
    status: 'investigating',
    assignedUnit: 'PCR-156',
    eta: '2 min',
    confidence: 87,
    time: '16:14',
    description: 'Tourist entered restricted area'
  },
  {
    id: 'ALERT-2024-003',
    type: 'Medical Emergency',
    tourist: { 
      name: 'Maria Garcia', 
      id: 'TID-ES-2024-003', 
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      nationality: 'Spain',
      age: 42,
      phone: '+34-600-123456',
      hotel: 'Hotel Oberoi',
      emergency_contact: 'Carlos Garcia (Brother) - +34-600-123457'
    },
    location: { lat: 28.6289, lng: 77.2065, address: 'Connaught Place Metro Station', zone: 'Zone-C' },
    timestamp: '2024-01-15T16:05:45Z',
    timeAgo: '18 min ago',
    priority: 'High',
    status: 'resolved',
    assignedUnit: 'AMB-102',
    eta: 'Arrived',
    confidence: 92,
    time: '16:05',
    description: 'Tourist requires medical assistance'
  }
];

const mockTimeline = [
  { time: '16:22', location: 'India Gate Gardens', action: 'SOS Signal Activated', status: 'critical' },
  { time: '16:21', location: 'India Gate Main Area', action: 'Entered restricted zone', status: 'warning' },
  { time: '16:15', location: 'India Gate Entrance', action: 'Geo-fence entry detected', status: 'info' },
  { time: '15:45', location: 'Hotel Taj Palace', action: 'Left accommodation', status: 'info' }
];

const mockTourists = [
  { 
    id: 'TID-US-2024-001', 
    name: 'John Anderson', 
    nationality: 'USA', 
    age: 34,
    contact: '+1-555-0123', 
    location: 'India Gate', 
    lastSeen: '2 min ago', 
    status: 'At Risk',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    hotel: 'Hotel Taj Palace',
    emergency_contact: 'Sarah Anderson (Wife) - +1-555-0124'
  },
  { 
    id: 'TID-UK-2024-002', 
    name: 'Emma Wilson', 
    nationality: 'UK', 
    age: 28,
    contact: '+44-7700-123456', 
    location: 'Red Fort', 
    lastSeen: '8 min ago', 
    status: 'Safe',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    hotel: 'Hotel Imperial',
    emergency_contact: 'James Wilson (Husband) - +44-7700-123457'
  },
  { 
    id: 'TID-ES-2024-003', 
    name: 'Maria Garcia', 
    nationality: 'Spain', 
    age: 42,
    contact: '+34-600-123456', 
    location: 'Connaught Place', 
    lastSeen: '18 min ago', 
    status: 'Safe',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    hotel: 'Hotel Oberoi',
    emergency_contact: 'Carlos Garcia (Brother) - +34-600-123457'
  },
  { 
    id: 'TID-DE-2024-004', 
    name: 'Hans Mueller', 
    nationality: 'Germany', 
    age: 56,
    contact: '+49-30-12345678', 
    location: 'Humayun Tomb', 
    lastSeen: '45 min ago', 
    status: 'Safe',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    hotel: 'Hotel Leela Palace',
    emergency_contact: 'Anna Mueller (Wife) - +49-30-87654321'
  },
  { 
    id: 'TID-JP-2024-005', 
    name: 'Yuki Tanaka', 
    nationality: 'Japan', 
    age: 29,
    contact: '+81-3-1234-5678', 
    location: 'Lotus Temple', 
    lastSeen: '1 hour ago', 
    status: 'Safe',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    hotel: 'Hotel Shangri-La',
    emergency_contact: 'Hiroshi Tanaka (Father) - +81-3-8765-4321'
  }
];

const mockCases = [
  { id: '1234', type: 'SOS Emergency', description: 'Tourist emergency assistance required', location: 'India Gate', assignedOfficer: 'Officer Sharma', date: 'Jan 15, 2024', status: 'Open', priority: 'High' },
  { id: '1235', type: 'Lost Tourist', description: 'Tourist separated from group', location: 'Red Fort', assignedOfficer: 'Officer Kumar', date: 'Jan 15, 2024', status: 'In Progress', priority: 'Medium' },
  { id: '1236', type: 'Theft Report', description: 'Tourist belongings stolen', location: 'Connaught Place', assignedOfficer: 'Officer Singh', date: 'Jan 14, 2024', status: 'Closed', priority: 'Low' }
];

const mockStats = {
  activeTourists: 1247,
  activeAlerts: 3,
  responseTime: 3.2,
  safetyScore: 94,
  unitsDeployed: 12,
  zonesMonitored: 8
};

const sidebarSections = [
  { 
    id: 'alerts', 
    label: 'Live Alerts', 
    icon: AlertTriangle, 
    description: 'Real-time emergency alerts',
    badge: '3'
  },
  { 
    id: 'map', 
    label: 'Real-time Map', 
    icon: MapPin, 
    description: 'Location tracking & navigation'
  },
  { 
    id: 'profile', 
    label: 'Tourist Profile', 
    icon: User, 
    description: 'Tourist information & contacts'
  },
  { 
    id: 'cases', 
    label: 'Case Management', 
    icon: FileText, 
    description: 'Manage investigations'
  },
  { 
    id: 'efir', 
    label: 'E-FIR Generation', 
    icon: Shield, 
    description: 'Electronic FIR creation'
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: MessageSquare, 
    description: 'Contact & messaging'
  },
  { 
    id: 'evidence', 
    label: 'Evidence', 
    icon: Camera, 
    description: 'Digital evidence collection'
  }
];

export function PoliceDashboard() {
  const { user, logout } = useAuth();
  const [selectedAlert, setSelectedAlert] = useState(mockAlerts[0]);
  const [activeSection, setActiveSection] = useState('map');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchedTourist, setSearchedTourist] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [evidenceSearchQuery, setEvidenceSearchQuery] = useState('');
  const [foundEvidence, setFoundEvidence] = useState<any>(null);
  const [isSearchingEvidence, setIsSearchingEvidence] = useState(false);
  const [selectedAlertDetails, setSelectedAlertDetails] = useState<any>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('Emergency Alert');
  const [messageContent, setMessageContent] = useState('');
  const [broadcastTemplate, setBroadcastTemplate] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [alertRecipient, setAlertRecipient] = useState('');
  const [alertMessageTemplate, setAlertMessageTemplate] = useState('');
  const [alertMessage, setAlertMessage] = useState('We have received your emergency alert and are responding immediately. Police unit PCR-203 is en route to your location at India Gate with an ETA of 4 minutes. Please stay calm and remain in a safe location. Do not hesitate to call if you need immediate assistance.');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSearchTourist = () => {
    const foundTourist = mockTourists.find(tourist => 
      tourist.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tourist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedTourist(foundTourist);
  };

  // Evidence database
  const mockEvidenceDatabase = {
    'ALERT-2024-001': {
      firId: 'ALERT-2024-001',
      touristName: 'John Anderson',
      touristId: 'TID-US-2024-001',
      incidentType: 'SOS Emergency',
      location: 'India Gate, Central Delhi',
      timestamp: '2024-01-15T16:22:15Z',
      status: 'Active',
      gps: {
        coordinates: '28.6139, 77.2090',
        accuracy: '±3m',
        altitude: '216m',
        speed: '0 km/h',
        satellites: 12,
        deviceId: 'Smart-ID-001',
        timestamp: '2024-01-15T16:22:15Z'
      },
      sos: {
        triggerType: 'Manual Button Press',
        signalStrength: '85%',
        confidence: '95%',
        duration: '3.2 seconds',
        batteryLevel: '67%',
        networkType: '4G LTE',
        deviceId: 'Smart-ID-001'
      },
      blockchain: {
        hash: '0x4f2e9a8b7c3d1f8e2a9b6c4d7e1f3a8b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6',
        block: '#345672',
        network: 'Ethereum',
        confirmations: 1247,
        gasUsed: '21,000',
        transactionFee: '0.0021 ETH',
        status: 'Verified'
      },
      footage: {
        cameraId: 'IG-CAM-01',
        location: 'India Gate - North Entrance',
        duration: '5 minutes',
        quality: 'HD 1080p',
        fileSize: '245 MB',
        format: 'MP4',
        fps: '30 fps',
        timeRange: '16:20:00 - 16:25:00'
      }
    },
    'ALERT-2024-002': {
      firId: 'ALERT-2024-002',
      touristName: 'Emma Wilson',
      touristId: 'TID-UK-2024-002',
      incidentType: 'Geo-fence Violation',
      location: 'Red Fort Restricted Area',
      timestamp: '2024-01-15T16:14:30Z',
      status: 'Investigating',
      gps: {
        coordinates: '28.6562, 77.2410',
        accuracy: '±2m',
        altitude: '228m',
        speed: '5 km/h',
        satellites: 14,
        deviceId: 'Smart-ID-002',
        timestamp: '2024-01-15T16:14:30Z'
      },
      sos: {
        triggerType: 'Auto Geo-fence Violation',
        signalStrength: '92%',
        confidence: '87%',
        duration: 'Continuous',
        batteryLevel: '89%',
        networkType: '5G',
        deviceId: 'Smart-ID-002'
      },
      blockchain: {
        hash: '0x8e3f2a1b4c7d9e6f0a3b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1a4b7c0',
        block: '#345658',
        network: 'Ethereum',
        confirmations: 1261,
        gasUsed: '21,000',
        transactionFee: '0.0019 ETH',
        status: 'Verified'
      },
      footage: {
        cameraId: 'RF-CAM-03',
        location: 'Red Fort - Main Gate',
        duration: '3 minutes',
        quality: 'HD 1080p',
        fileSize: '147 MB',
        format: 'MP4',
        fps: '30 fps',
        timeRange: '16:12:00 - 16:15:00'
      }
    },
    'ALERT-2024-003': {
      firId: 'ALERT-2024-003',
      touristName: 'Maria Garcia',
      touristId: 'TID-ES-2024-003',
      incidentType: 'Medical Emergency',
      location: 'Connaught Place Metro Station',
      timestamp: '2024-01-15T16:05:45Z',
      status: 'Resolved',
      gps: {
        coordinates: '28.6289, 77.2065',
        accuracy: '±4m',
        altitude: '223m',
        speed: '0 km/h',
        satellites: 11,
        deviceId: 'Smart-ID-003',
        timestamp: '2024-01-15T16:05:45Z'
      },
      sos: {
        triggerType: 'Medical Alert Button',
        signalStrength: '78%',
        confidence: '92%',
        duration: '5.1 seconds',
        batteryLevel: '43%',
        networkType: '4G LTE',
        deviceId: 'Smart-ID-003'
      },
      blockchain: {
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
        block: '#345623',
        network: 'Ethereum',
        confirmations: 1502,
        gasUsed: '21,000',
        transactionFee: '0.0018 ETH',
        status: 'Verified'
      },
      footage: {
        cameraId: 'CP-CAM-07',
        location: 'Connaught Place - Metro Exit',
        duration: '4 minutes',
        quality: 'HD 1080p',
        fileSize: '196 MB',
        format: 'MP4',
        fps: '30 fps',
        timeRange: '16:03:00 - 16:07:00'
      }
    }
  };

  const handleEvidenceSearch = () => {
    if (!evidenceSearchQuery.trim()) return;
    
    setIsSearchingEvidence(true);
    
    // Simulate search delay
    setTimeout(() => {
      const evidence = mockEvidenceDatabase[evidenceSearchQuery as keyof typeof mockEvidenceDatabase];
      setFoundEvidence(evidence || null);
      setIsSearchingEvidence(false);
    }, 800);
  };

  const getEvidenceStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800 border-red-200';
      case 'Investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'alerts':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Live Alert Feed</h1>
              <p className="text-slate-600 mt-1">Monitor real-time emergency alerts and incidents</p>
            </div>

            <div className="grid gap-6">
              {mockAlerts.map((alert) => (
                <Card 
                  key={alert.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-l-4 ${
                    alert.priority === 'High' ? 'border-l-red-500' : 'border-l-orange-500'
                  } ${selectedAlert.id === alert.id ? 'ring-2 ring-blue-500 bg-blue-50/30' : 'hover:bg-slate-50/50'}`}
                  onClick={() => setSelectedAlert(alert)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.priority === 'High' ? 'bg-red-500' : 'bg-orange-500'
                        } animate-pulse`}></div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{alert.type}</h3>
                          <p className="text-sm text-slate-600">{alert.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getPriorityColor(alert.priority)} px-3 py-1`}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                        <Badge className={`${getStatusColor(alert.status)} px-3 py-1`}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={alert.tourist.photo} />
                          <AvatarFallback className="text-lg">{alert.tourist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{alert.tourist.name}</p>
                          <p className="text-sm text-slate-600">{alert.tourist.nationality} • Age {alert.tourist.age}</p>
                          <p className="text-xs text-slate-500">{alert.tourist.id}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-700">
                          <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                          {alert.location.address}
                        </div>
                        <div className="flex items-center text-sm text-slate-700">
                          <Clock className="w-4 h-4 mr-2 text-slate-500" />
                          {alert.timeAgo}
                        </div>
                        <div className="flex items-center text-sm text-slate-700">
                          <Radio className="w-4 h-4 mr-2 text-slate-500" />
                          Confidence: {alert.confidence}%
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Unit: {alert.assignedUnit}</span>
                          <span className="text-green-600 font-semibold">ETA: {alert.eta}</span>
                        </div>
                        <Button 
                          className="w-full py-2"
                          onClick={() => {
                            setSelectedAlertDetails(alert);
                            setShowAlertModal(true);
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Respond Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'map':
        return (
          <SimplePoliceMap 
            height="100vh"
            markers={mockAlerts.map(alert => ({
              lat: alert.location.lat,
              lng: alert.location.lng,
              title: alert.tourist.name,
              description: `${alert.type} - ${alert.location.address}`,
              color: alert.priority === 'High' ? 'red' : alert.priority === 'Medium' ? 'orange' : 'yellow',
              priority: alert.priority,
              type: alert.type
            }))}
            className="w-full h-full"
          />
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Tourist Profile Search</h1>
              <p className="text-slate-600 mt-1">Search and view detailed tourist information</p>
            </div>
            
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Search Tourist by ID or Name</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Enter Tourist ID (e.g., TID-US-2024-001) or Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearchTourist()}
                    />
                  </div>
                  <Button onClick={handleSearchTourist} className="px-6">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                {searchQuery && !searchedTourist && (
                  <p className="text-sm text-slate-500 mt-2">
                    Available IDs: TID-US-2024-001, TID-UK-2024-002, TID-ES-2024-003, TID-DE-2024-004, TID-JP-2024-005
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tourist Profile Display */}
            {searchedTourist ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tourist Profile - {searchedTourist.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={searchedTourist.photo} />
                          <AvatarFallback className="text-xl">
                            {searchedTourist.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-semibold text-slate-900">{searchedTourist.name}</h3>
                          <p className="text-slate-600 text-lg">{searchedTourist.id}</p>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="px-3 py-1">{searchedTourist.nationality}</Badge>
                            <Badge variant="outline" className="px-3 py-1">Age {searchedTourist.age}</Badge>
                            <Badge 
                              variant={searchedTourist.status === 'Safe' ? 'default' : 'destructive'} 
                              className="px-3 py-1"
                            >
                              {searchedTourist.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
                            <p className="text-slate-900 mt-1">{searchedTourist.contact}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Hotel</Label>
                            <p className="text-slate-900 mt-1">{searchedTourist.hotel}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Current Location</Label>
                            <p className="text-slate-900 mt-1">{searchedTourist.location}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Last Seen</Label>
                            <p className="text-slate-900 mt-1">{searchedTourist.lastSeen}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-slate-900">Emergency Contacts</h4>
                      <Card className="p-6 bg-slate-50">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Primary Contact</Label>
                            <p className="text-slate-900 mt-1">{searchedTourist.emergency_contact}</p>
                          </div>
                          <div className="flex space-x-3">
                            <Button size="sm" className="flex-1 py-2">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Contact
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 py-2">
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send SMS
                            </Button>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-6 bg-blue-50">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-semibold text-slate-700">Embassy Contact</Label>
                            <p className="text-slate-900 mt-1">
                              {searchedTourist.nationality === 'USA' ? 'US Embassy Delhi' :
                               searchedTourist.nationality === 'UK' ? 'British High Commission' :
                               searchedTourist.nationality === 'Spain' ? 'Spanish Embassy' :
                               searchedTourist.nationality === 'Germany' ? 'German Embassy' :
                               searchedTourist.nationality === 'Japan' ? 'Japanese Embassy' : 
                               'Embassy'}
                            </p>
                            <p className="text-slate-600">
                              {searchedTourist.nationality === 'USA' ? '+91-11-2419-8000' :
                               searchedTourist.nationality === 'UK' ? '+91-11-2419-2100' :
                               searchedTourist.nationality === 'Spain' ? '+91-11-4129-4000' :
                               searchedTourist.nationality === 'Germany' ? '+91-11-4419-9199' :
                               searchedTourist.nationality === 'Japan' ? '+91-11-4610-4610' : 
                               'Contact Embassy'}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" className="w-full py-2">
                            <Shield className="w-4 h-4 mr-2" />
                            Notify Embassy
                          </Button>
                        </div>
                      </Card>

                      <div className="flex space-x-3">
                        <Button className="flex-1 py-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          Track Location
                        </Button>
                        <Button variant="outline" className="flex-1 py-2">
                          <FileText className="w-4 h-4 mr-2" />
                          View History
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : searchQuery && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">No Tourist Found</h3>
                      <p className="text-slate-600 mt-1">
                        No tourist found with ID or name matching "{searchQuery}". Please check the ID and try again.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!searchQuery && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Search for Tourist</h3>
                      <p className="text-slate-600 mt-1">
                        Enter a Tourist ID or name in the search box above to view detailed profile information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'cases':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Case Management</h1>
              <p className="text-slate-600 mt-1">Manage investigations and assign officers</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Case: {selectedAlert.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="status" className="text-sm font-semibold">Case Status</Label>
                    <Select defaultValue={selectedAlert.status}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="acknowledged">Acknowledged</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="unit" className="text-sm font-semibold">Assigned Unit</Label>
                    <Input value={selectedAlert.assignedUnit} className="mt-2" />
                  </div>
                  
                  <div>
                    <Label htmlFor="priority" className="text-sm font-semibold">Priority Level</Label>
                    <Select defaultValue={selectedAlert.priority}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes" className="text-sm font-semibold">Investigation Notes</Label>
                  <Textarea 
                    placeholder="Add detailed notes about the investigation, actions taken, and next steps..."
                    className="mt-2 min-h-[150px]"
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button className="px-6 py-2">Update Case</Button>
                  <Button variant="outline" className="px-6 py-2">Send Status Update</Button>
                  <Button variant="outline" className="px-6 py-2">Export Report</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'efir':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">E-FIR Generation</h1>
              <p className="text-slate-600 mt-1">Auto-generate Electronic First Information Reports</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Generate Electronic First Information Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-semibold">Complainant Name</Label>
                    <Input value={selectedAlert.tourist.name} readOnly className="bg-slate-50 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Tourist ID</Label>
                    <Input value={selectedAlert.tourist.id} readOnly className="bg-slate-50 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Incident Type</Label>
                    <Input value={selectedAlert.type} readOnly className="bg-slate-50 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Location of Incident</Label>
                    <Input value={selectedAlert.location.address} readOnly className="bg-slate-50 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Date & Time</Label>
                    <Input value="January 15, 2024 - 4:22 PM" readOnly className="bg-slate-50 mt-2" />
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Reporting Officer</Label>
                    <Input value={user?.name} readOnly className="bg-slate-50 mt-2" />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-semibold">Incident Description</Label>
                  <Textarea 
                    className="mt-2 min-h-[200px] bg-slate-50"
                    value={`Tourist ${selectedAlert.tourist.name} (${selectedAlert.tourist.id}) activated SOS emergency signal at ${selectedAlert.location.address} on January 15, 2024 at 16:22 hours. 

GPS Coordinates: ${selectedAlert.location.lat}, ${selectedAlert.location.lng}
Alert received through Smart Tourist Safety Monitoring System with ${selectedAlert.confidence}% confidence level.

Tourist details:
- Nationality: ${selectedAlert.tourist.nationality}
- Age: ${selectedAlert.tourist.age}
- Phone: ${selectedAlert.tourist.phone}
- Hotel: ${selectedAlert.tourist.hotel}

Emergency response unit ${selectedAlert.assignedUnit} dispatched immediately.`}
                    readOnly
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button className="px-6 py-2">Generate E-FIR</Button>
                  <Button variant="outline" className="px-6 py-2">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );



      case 'communication':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Communication Panel</h1>
              <p className="text-slate-600 mt-1">Contact tourists, families, and authorities</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Quick Contact Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start h-14 text-left p-4">
                    <Phone className="w-5 h-5 mr-4" />
                    <div>
                      <p className="font-semibold">Call Tourist</p>
                      <p className="text-sm text-slate-500">{selectedAlert.tourist.phone}</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-14 text-left p-4">
                    <MessageSquare className="w-5 h-5 mr-4" />
                    <div>
                      <p className="font-semibold">SMS Update</p>
                      <p className="text-sm text-slate-500">Send status to tourist</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-14 text-left p-4">
                    <Phone className="w-5 h-5 mr-4" />
                    <div>
                      <p className="font-semibold">Emergency Contact</p>
                      <p className="text-sm text-slate-500">Call family member</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start h-14 text-left p-4">
                    <Shield className="w-5 h-5 mr-4" />
                    <div>
                      <p className="font-semibold">Embassy Notification</p>
                      <p className="text-sm text-slate-500">Alert diplomatic mission</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Send Quick Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Recipient</Label>
                    <Select value={alertRecipient} onValueChange={setAlertRecipient}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tourist">Tourist ({selectedAlert.tourist.name})</SelectItem>
                        <SelectItem value="emergency">Emergency Contact</SelectItem>
                        <SelectItem value="embassy">Embassy</SelectItem>
                        <SelectItem value="unit">Response Unit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold">Message Template</Label>
                    <Select value={alertMessageTemplate} onValueChange={setAlertMessageTemplate}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="status">Status Update</SelectItem>
                        <SelectItem value="safety">Safety Advisory</SelectItem>
                        <SelectItem value="emergency">Emergency Response</SelectItem>
                        <SelectItem value="resolved">Incident Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-semibold">Message</Label>
                    <Textarea 
                      placeholder="Type your message here..."
                      className="mt-2 min-h-[120px]"
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                    />
                  </div>
                  
                  <Button className="w-full py-2">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'evidence':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Digital Evidence Viewer</h1>
              <p className="text-slate-600 mt-1">Search and analyze case evidence using FIR ID</p>
            </div>
            
            {/* Evidence Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Search className="w-5 h-5 mr-3" />
                  Search Evidence by FIR ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Enter FIR ID (e.g., ALERT-2024-001)"
                      value={evidenceSearchQuery}
                      onChange={(e) => setEvidenceSearchQuery(e.target.value)}
                      className="pl-12 py-3 text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleEvidenceSearch()}
                      disabled={isSearchingEvidence}
                    />
                  </div>
                  <Button 
                    onClick={handleEvidenceSearch} 
                    className="px-8 py-3"
                    disabled={!evidenceSearchQuery.trim() || isSearchingEvidence}
                  >
                    {isSearchingEvidence ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Evidence
                      </>
                    )}
                  </Button>
                </div>
                
                {!foundEvidence && !isSearchingEvidence && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Available FIR IDs for testing: <span className="font-mono">ALERT-2024-001</span>, <span className="font-mono">ALERT-2024-002</span>, <span className="font-mono">ALERT-2024-003</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Evidence Results */}
            {foundEvidence ? (
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">Complete Evidence Package</CardTitle>
                      <p className="text-blue-100">FIR ID: {foundEvidence.firId} • {foundEvidence.incidentType}</p>
                    </div>
                    <Badge className={`${getEvidenceStatusColor(foundEvidence.status)} border`}>
                      {foundEvidence.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  {/* Case Overview */}
                  <div className="mb-8 p-6 bg-slate-50 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Case Overview
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Tourist Name</Label>
                        <p className="text-slate-900 mt-1">{foundEvidence.touristName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Tourist ID</Label>
                        <p className="font-mono text-slate-900 mt-1">{foundEvidence.touristId}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Incident Type</Label>
                        <p className="text-slate-900 mt-1">{foundEvidence.incidentType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Location</Label>
                        <p className="text-slate-900 mt-1">{foundEvidence.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Timestamp</Label>
                        <p className="font-mono text-slate-900 mt-1">{foundEvidence.timestamp}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Status</Label>
                        <Badge className={`${getEvidenceStatusColor(foundEvidence.status)} mt-1`}>
                          {foundEvidence.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Evidence Grid - All Types */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    
                    {/* GPS Evidence */}
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-800">
                          <MapPin className="w-5 h-5 mr-2" />
                          GPS Location Data
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-semibold text-blue-600">Coordinates</Label>
                            <p className="font-mono text-sm text-blue-900">{foundEvidence.gps.coordinates}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-blue-600">Accuracy</Label>
                            <p className="text-sm text-blue-900">{foundEvidence.gps.accuracy}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-blue-600">Altitude</Label>
                            <p className="text-sm text-blue-900">{foundEvidence.gps.altitude}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-blue-600">Satellites</Label>
                            <p className="text-sm text-blue-900">{foundEvidence.gps.satellites} connected</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-green-700 bg-green-50 p-2 rounded">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          GPS data integrity verified
                        </div>
                      </CardContent>
                    </Card>

                    {/* SOS Signal Evidence */}
                    <Card className="border-red-200 bg-red-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-800">
                          <Radio className="w-5 h-5 mr-2" />
                          SOS Signal Data
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-semibold text-red-600">Trigger Type</Label>
                            <p className="text-sm text-red-900">{foundEvidence.sos.triggerType}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-red-600">Confidence</Label>
                            <p className="text-sm text-red-900 font-semibold">{foundEvidence.sos.confidence}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-red-600">Signal Strength</Label>
                            <p className="text-sm text-red-900">{foundEvidence.sos.signalStrength}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-red-600">Battery Level</Label>
                            <p className="text-sm text-red-900">{foundEvidence.sos.batteryLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-orange-700 bg-orange-50 p-2 rounded">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Emergency protocol activated
                        </div>
                      </CardContent>
                    </Card>

                    {/* Blockchain Evidence */}
                    <Card className="border-green-200 bg-green-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-800">
                          <Shield className="w-5 h-5 mr-2" />
                          Blockchain Verification
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-xs font-semibold text-green-600">Transaction Hash</Label>
                            <div className="flex items-center space-x-2">
                              <p className="font-mono text-xs text-green-900 truncate">
                                {foundEvidence.blockchain.hash.substring(0, 20)}...
                              </p>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => copyToClipboard(foundEvidence.blockchain.hash)}>
                                <Upload className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-semibold text-green-600">Block</Label>
                              <p className="font-mono text-sm text-green-900">{foundEvidence.blockchain.block}</p>
                            </div>
                            <div>
                              <Label className="text-xs font-semibold text-green-600">Confirmations</Label>
                              <p className="text-sm text-green-900">{foundEvidence.blockchain.confirmations}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-green-700 bg-green-100 p-2 rounded">
                          <Shield className="w-4 h-4 mr-2" />
                          Immutable blockchain record verified
                        </div>
                      </CardContent>
                    </Card>

                    {/* CCTV Footage Evidence */}
                    <Card className="border-purple-200 bg-purple-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-purple-800">
                          <Camera className="w-5 h-5 mr-2" />
                          CCTV Footage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-semibold text-purple-600">Camera ID</Label>
                            <p className="font-mono text-sm text-purple-900">{foundEvidence.footage.cameraId}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-purple-600">Quality</Label>
                            <p className="text-sm text-purple-900">{foundEvidence.footage.quality}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-purple-600">Duration</Label>
                            <p className="text-sm text-purple-900">{foundEvidence.footage.duration}</p>
                          </div>
                          <div>
                            <Label className="text-xs font-semibold text-purple-600">File Size</Label>
                            <p className="text-sm text-purple-900">{foundEvidence.footage.fileSize}</p>
                          </div>
                        </div>
                        <div className="bg-slate-900 rounded p-3 flex items-center justify-center">
                          <div className="text-center">
                            <Video className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">Video Preview Available</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex flex-wrap gap-4">
                      <Button className="px-6 py-2">
                        <Download className="w-4 h-4 mr-2" />
                        Download Complete Evidence Package
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Forensic Report
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <Eye className="w-4 h-4 mr-2" />
                        Enhanced Analysis
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <Shield className="w-4 h-4 mr-2" />
                        Verify Chain of Custody
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            ) : evidenceSearchQuery && !isSearchingEvidence ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">No Evidence Found</h3>
                      <p className="text-slate-600 mt-1">
                        No evidence found for FIR ID "{evidenceSearchQuery}". Please verify the FIR ID and try again.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setEvidenceSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : !isSearchingEvidence && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-10 h-10 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">Digital Evidence Database</h3>
                      <p className="text-slate-600 mt-2 text-lg">
                        Enter a FIR ID in the search box above to access comprehensive digital evidence including GPS data, SOS signals, blockchain verification, and CCTV footage.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 mt-8">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-blue-800">GPS Location</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <Radio className="w-8 h-8 text-red-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-red-800">SOS Signals</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-green-800">Blockchain Proof</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-purple-800">CCTV Footage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Communication Center</h1>
              <p className="text-slate-600 mt-1">Send messages and alerts to tourists and units</p>
            </div>

            {/* Send Quick Message */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send Quick Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Recipient User ID</Label>
                  <Input
                    placeholder="Enter Tourist ID (e.g., TID-US-2024-001) or Unit ID..."
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700">Message Template</Label>
                  <Select value={messageTemplate} onValueChange={setMessageTemplate}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Emergency Alert">Emergency Alert</SelectItem>
                      <SelectItem value="Safety Warning">Safety Warning</SelectItem>
                      <SelectItem value="Location Check">Location Check</SelectItem>
                      <SelectItem value="General Information">General Information</SelectItem>
                      <SelectItem value="Unit Assignment">Unit Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700">Message</Label>
                  <Textarea
                    placeholder="Enter your message here..."
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="mt-1 min-h-24"
                  />
                </div>

                <Button className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Send to All */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send to All</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold text-slate-700">Broadcast Template</Label>
                  <Select value={broadcastTemplate} onValueChange={setBroadcastTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select broadcast template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Broadcast</SelectItem>
                      <SelectItem value="weather">Weather Alert</SelectItem>
                      <SelectItem value="traffic">Traffic Update</SelectItem>
                      <SelectItem value="security">Security Advisory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-slate-700">Broadcast Message</Label>
                  <Textarea
                    placeholder="Enter broadcast message..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send to All Tourists
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Collapsible Sidebar */}
      <div className={`bg-white border-r border-slate-200 shadow-lg transition-all duration-300 ${
        sidebarExpanded ? 'w-80' : 'w-16'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-2"
            >
              {sidebarExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {sidebarSections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all ${
                activeSection === item.id 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              title={!sidebarExpanded ? item.label : ''}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              {sidebarExpanded && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className="text-xs text-slate-500 truncate">{item.description}</p>
                </div>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative">
        {/* Clean Minimal Header - Hide for Map */}
        {activeSection !== 'map' && (
          <div className="bg-white border-b border-slate-200 px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left - Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10  ">
                  <img 
            src={p2} 
            alt="WebPortal Logo" 
            className="h-10 w-10" 
          />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Police Command Center</h1>
                  <p className="text-xs text-slate-500">Smart Tourist Safety Monitoring</p>
                </div>
              </div>
              
              {/* Right - User Section */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500 font-medium">{user?.department}</p>
                </div>
                
                {/* Logout Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout} 
                  className="h-10 w-10 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {activeSection === 'map' ? (
          <div className="absolute inset-0">
            {renderContent()}
          </div>
        ) : (
          <div className="p-8">
            {renderContent()}
          </div>
        )}
      </div>

      {/* Simplified Alert Details Modal */}
      <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              {selectedAlertDetails?.type} - {selectedAlertDetails?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedAlertDetails && (
            <div className="space-y-4">
              {/* Simple Alert Header */}
              <div className="p-4 bg-slate-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{selectedAlertDetails.tourist.name}</h3>
                  <Badge className={`${getPriorityColor(selectedAlertDetails.priority)}`}>
                    {selectedAlertDetails.priority}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{selectedAlertDetails.location.address}</p>
                <p className="text-xs text-slate-500 mt-1">{selectedAlertDetails.timeAgo}</p>
              </div>

              <div className="space-y-4">
                {/* Simplified Tourist Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Tourist ID</Label>
                    <p className="text-slate-900 font-mono">{selectedAlertDetails.tourist.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Nationality</Label>
                    <p className="text-slate-900">{selectedAlertDetails.tourist.nationality}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Phone</Label>
                    <p className="text-slate-900">{selectedAlertDetails.tourist.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Hotel</Label>
                    <p className="text-slate-900">{selectedAlertDetails.tourist.hotel}</p>
                  </div>
                </div>

                {/* Incident Details */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Description</Label>
                    <p className="text-slate-900">{selectedAlertDetails.description}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Zone</Label>
                    <p className="text-slate-900">{selectedAlertDetails.location.zone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Assigned Unit</Label>
                    <p className="text-slate-900 font-semibold">{selectedAlertDetails.assignedUnit} (ETA: {selectedAlertDetails.eta})</p>
                  </div>
                </div>

                {/* Simple Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <Button className="flex-1">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Unit
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Acknowledge
                  </Button>
                  <Button variant="outline" onClick={() => setShowAlertModal(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}