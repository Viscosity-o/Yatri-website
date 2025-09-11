import { useState } from 'react';
import { useAuth } from '../Router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { GoogleStyleMap } from '../components/maps/GoogleStyleMap';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  AlertCircle, 
  Database, 
  Calendar,
  BarChart3,
  Globe,
  Shield,
  Clock,
  Search,
  Download,
  Filter,
  RefreshCw,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageSquare,
  FileText,
  Phone,
  Eye,
  AlertTriangle,
  Navigation,
  CheckCircle,
  Camera,
  Radio,
  Upload,
  Video
} from 'lucide-react';

// Mock data
const mockClusters = [
  { location: 'India Gate', tourists: 245, riskLevel: 'Low', trend: '+12%' },
  { location: 'Red Fort', tourists: 189, riskLevel: 'Medium', trend: '+8%' },
  { location: 'Qutub Minar', tourists: 156, riskLevel: 'Low', trend: '+15%' },
  { location: 'Lotus Temple', tourists: 134, riskLevel: 'Low', trend: '+3%' },
  { location: 'Chandni Chowk', tourists: 98, riskLevel: 'High', trend: '-5%' },
];

const mockDigitalIds = [
  { 
    id: 'DID-2024-001', 
    name: 'Sarah Johnson', 
    country: 'Canada', 
    verificationStatus: 'Verified', 
    registrationDate: '2024-01-15',
    lastActivity: '2 min ago'
  },
  { 
    id: 'DID-2024-002', 
    name: 'Mark Thompson', 
    country: 'Australia', 
    verificationStatus: 'Pending', 
    registrationDate: '2024-01-15',
    lastActivity: '15 min ago'
  },
  { 
    id: 'DID-2024-003', 
    name: 'Lisa Chen', 
    country: 'Singapore', 
    verificationStatus: 'Verified', 
    registrationDate: '2024-01-14',
    lastActivity: '1 hour ago'
  },
];

const mockAnalytics = [
  { metric: 'Tourist Satisfaction', value: 94, target: 90, trend: '+2%' },
  { metric: 'Safety Score', value: 87, target: 85, trend: '+5%' },
  { metric: 'Response Efficiency', value: 91, target: 88, trend: '+3%' },
  { metric: 'Digital ID Adoption', value: 78, target: 80, trend: '+12%' },
];

// Mock case data for FIR search
const mockCaseDatabase = {
  'ALERT-2024-001': {
    firId: 'ALERT-2024-001',
    touristName: 'John Anderson',
    touristId: 'TID-US-2024-001',
    incidentType: 'SOS Emergency',
    location: 'India Gate, Central Delhi',
    timestamp: '2024-01-15T16:22:15Z',
    status: 'Under Investigation',
    investigatingOfficer: 'Officer Rajesh Sharma',
    unit: 'PCR-203',
    currentSituation: 'Tourist was found safe and provided medical assistance. Investigation ongoing to determine cause of emergency signal activation.',
    priority: 'High',
    updates: [
      { time: '16:22', action: 'SOS signal received', officer: 'System' },
      { time: '16:26', action: 'Unit dispatched to location', officer: 'Dispatcher' },
      { time: '16:30', action: 'Tourist located and assisted', officer: 'Officer Sharma' },
      { time: '16:45', action: 'Initial investigation completed', officer: 'Officer Sharma' }
    ]
  },
  'ALERT-2024-002': {
    firId: 'ALERT-2024-002',
    touristName: 'Emma Wilson',
    touristId: 'TID-UK-2024-002',
    incidentType: 'Geo-fence Violation',
    location: 'Red Fort Restricted Area',
    timestamp: '2024-01-15T16:14:30Z',
    status: 'Resolved',
    investigatingOfficer: 'Officer Priya Desai',
    unit: 'PCR-156',
    currentSituation: 'Tourist inadvertently entered restricted area. Security briefing provided and tourist safely escorted to public area.',
    priority: 'Medium',
    updates: [
      { time: '16:14', action: 'Geo-fence violation detected', officer: 'System' },
      { time: '16:16', action: 'Security personnel contacted', officer: 'Dispatcher' },
      { time: '16:20', action: 'Tourist contacted and located', officer: 'Officer Desai' },
      { time: '16:25', action: 'Case resolved, tourist escorted safely', officer: 'Officer Desai' }
    ]
  },
  'ALERT-2024-003': {
    firId: 'ALERT-2024-003',
    touristName: 'Maria Garcia',
    touristId: 'TID-ES-2024-003',
    incidentType: 'Medical Emergency',
    location: 'Connaught Place Metro Station',
    timestamp: '2024-01-15T16:05:45Z',
    status: 'Closed',
    investigatingOfficer: 'Officer Vikram Singh',
    unit: 'AMB-102',
    currentSituation: 'Tourist received immediate medical attention for minor dehydration. Ambulance arrived within 8 minutes. Tourist recovered and case closed.',
    priority: 'High',
    updates: [
      { time: '16:05', action: 'Medical emergency reported', officer: 'System' },
      { time: '16:07', action: 'Ambulance dispatched', officer: 'Medical Dispatcher' },
      { time: '16:13', action: 'Medical team arrived on scene', officer: 'Paramedic Team' },
      { time: '16:25', action: 'Tourist stable, case closed', officer: 'Officer Singh' }
    ]
  }
};

const sidebarSections = [
  { 
    id: 'overview', 
    label: 'Dashboard Overview', 
    icon: BarChart3, 
    description: 'Key metrics and analytics'
  },
  { 
    id: 'map', 
    label: 'Tourist Map', 
    icon: MapPin, 
    description: 'Real-time location tracking'
  },
  { 
    id: 'digital-ids', 
    label: 'Digital IDs', 
    icon: Database, 
    description: 'Identity management system'
  },
  { 
    id: 'case-detail', 
    label: 'View Case Detail', 
    icon: FileText, 
    description: 'Search case by FIR ID'
  },
  { 
    id: 'communication', 
    label: 'Communication', 
    icon: MessageSquare, 
    description: 'Contact & messaging'
  },
  { 
    id: 'analytics', 
    label: 'Analytics', 
    icon: TrendingUp, 
    description: 'Performance insights'
  },
  { 
    id: 'evidence', 
    label: 'Evidence', 
    icon: Eye, 
    description: 'Digital evidence collection'
  }
];

// Mock alerts data for live alerts section
const mockAlerts = [
  {
    id: 'ALERT-2024-001',
    type: 'SOS Emergency',
    tourist: { 
      name: 'John Anderson', 
      id: 'TID-US-2024-001', 
      nationality: 'USA',
      age: 34,
      phone: '+1-555-0123',
    },
    location: { address: 'India Gate, Central Delhi', zone: 'Zone-A' },
    timeAgo: '2 min ago',
    priority: 'High',
    status: 'active',
    assignedUnit: 'PCR-203',
    eta: '4 min',
    confidence: 95,
    description: 'Tourist activated emergency SOS signal'
  },
  {
    id: 'ALERT-2024-002',
    type: 'Geo-fence Violation',
    tourist: { 
      name: 'Emma Wilson', 
      id: 'TID-UK-2024-002', 
      nationality: 'UK',
      age: 28,
      phone: '+44-7700-123456',
    },
    location: { address: 'Red Fort Restricted Area', zone: 'Zone-B' },
    timeAgo: '8 min ago',
    priority: 'Medium',
    status: 'investigating',
    assignedUnit: 'PCR-156',
    eta: '2 min',
    confidence: 87,
    description: 'Tourist entered restricted area'
  },
  {
    id: 'ALERT-2024-003',
    type: 'Medical Emergency',
    tourist: { 
      name: 'Maria Garcia', 
      id: 'TID-ES-2024-003', 
      nationality: 'Spain',
      age: 42,
      phone: '+34-600-123456',
    },
    location: { address: 'Connaught Place Metro Station', zone: 'Zone-C' },
    timeAgo: '18 min ago',
    priority: 'High',
    status: 'resolved',
    assignedUnit: 'AMB-102',
    eta: 'Arrived',
    confidence: 92,
    description: 'Tourist requires medical assistance'
  }
];

// Evidence database from Police Dashboard
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

export function TourismDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [foundCase, setFoundCase] = useState<any>(null);
  const [isSearchingCase, setIsSearchingCase] = useState(false);
  const [recipientId, setRecipientId] = useState('');
  const [messageTemplate, setMessageTemplate] = useState('General Information');
  const [messageContent, setMessageContent] = useState('');
  const [broadcastTemplate, setBroadcastTemplate] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [evidenceSearchQuery, setEvidenceSearchQuery] = useState('');
  const [foundEvidence, setFoundEvidence] = useState<any>(null);
  const [isSearchingEvidence, setIsSearchingEvidence] = useState(false);
  
  // New state for alert detail modal
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  
  // New state for digital ID search and modal
  const [digitalIdSearchQuery, setDigitalIdSearchQuery] = useState('');
  const [filteredDigitalIds, setFilteredDigitalIds] = useState(mockDigitalIds);
  const [selectedDigitalId, setSelectedDigitalId] = useState<any>(null);
  const [isDigitalIdModalOpen, setIsDigitalIdModalOpen] = useState(false);

  const handleCaseSearch = () => {
    if (!caseSearchQuery.trim()) return;
    
    setIsSearchingCase(true);
    
    // Simulate search delay
    setTimeout(() => {
      const caseData = mockCaseDatabase[caseSearchQuery as keyof typeof mockCaseDatabase];
      setFoundCase(caseData || null);
      setIsSearchingCase(false);
    }, 800);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Investigation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Open': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  const handleViewAlertDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handleDigitalIdSearch = (query: string) => {
    setDigitalIdSearchQuery(query);
    if (!query.trim()) {
      setFilteredDigitalIds(mockDigitalIds);
    } else {
      const filtered = mockDigitalIds.filter(id => 
        id.id.toLowerCase().includes(query.toLowerCase()) ||
        id.name.toLowerCase().includes(query.toLowerCase()) ||
        id.country.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDigitalIds(filtered);
    }
  };

  const handleViewDigitalIdDetails = (digitalId: any) => {
    setSelectedDigitalId({
      ...digitalId,
      // Enhanced details for modal
      email: `${digitalId.name.split(' ')[0].toLowerCase()}@email.com`,
      phone: '+1-555-0123',
      passportNumber: `P${Math.random().toString().substr(2, 8)}`,
      emergencyContact: 'Jane Doe (+1-555-0456)',
      medicalInfo: 'No known allergies',
      travelInsurance: 'Global Travel Insurance Co.',
      checkInLocation: 'Indira Gandhi International Airport',
      plannedDuration: '7 days',
      itinerary: ['Red Fort', 'India Gate', 'Qutub Minar', 'Lotus Temple'],
      blockchainHash: '0x' + Math.random().toString(16).substr(2, 40),
      biometricVerified: digitalId.verificationStatus === 'Verified'
    });
    setIsDigitalIdModalOpen(true);
  };

  const getAlertPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'acknowledged': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
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
                  } hover:bg-slate-50/50`}
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
                        <Badge className={`${getAlertPriorityColor(alert.priority)} px-3 py-1`}>
                          {alert.priority.toUpperCase()}
                        </Badge>
                        <Badge className={`${getAlertStatusColor(alert.status)} px-3 py-1`}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-slate-600" />
                        </div>
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
                          onClick={() => handleViewAlertDetails(alert)}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          View Details
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
          <GoogleStyleMap
            height="100vh"
            showHeatmap={false}
            showClusters={true}
            showControls={true}
            mapStyle="standard"
            onTouristClick={(tourist) => {
              console.log('Tourist clicked:', tourist);
            }}
            className="w-full h-full"
          />
        );



      case 'digital-ids':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Digital Identity Management</h1>
              <p className="text-slate-600 mt-1">Blockchain-secured digital identities for registered tourists</p>
            </div>

            {/* Search Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Search Digital IDs</CardTitle>
                <CardDescription>Search by Digital ID, name, or country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search by ID, name, or country..."
                      value={digitalIdSearchQuery}
                      onChange={(e) => handleDigitalIdSearch(e.target.value)}
                      className="pl-12 py-3 text-lg"
                    />
                  </div>
                  <Button variant="outline" onClick={() => handleDigitalIdSearch('')}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Digital ID Cards */}
            <div className="grid gap-4">
              {filteredDigitalIds.length > 0 ? (
                filteredDigitalIds.map((id) => (
                  <Card 
                    key={id.id}
                    className="cursor-pointer transition-all hover:shadow-lg hover:bg-slate-50/50 border-l-4 border-l-blue-500"
                    onClick={() => handleViewDigitalIdDetails(id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{id.name}</h3>
                            <p className="text-sm text-slate-600">{id.country}</p>
                            <p className="text-xs text-slate-500 font-mono">{id.id}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={id.verificationStatus === 'Verified' ? 'default' : 'secondary'}>
                            {id.verificationStatus}
                          </Badge>
                          <p className="text-xs text-slate-500">Registered: {id.registrationDate}</p>
                          <p className="text-xs text-slate-500">Active: {id.lastActivity}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">No Digital IDs Found</h3>
                        <p className="text-slate-600 mt-1">
                          No digital IDs match your search criteria. Try different keywords.
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => handleDigitalIdSearch('')}>
                        Show All IDs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Blockchain Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Digital IDs</p>
                      <p className="text-2xl font-bold text-gray-900">2,538</p>
                    </div>
                    <Database className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Verified IDs</p>
                      <p className="text-2xl font-bold text-green-600">2,341</p>
                    </div>
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Verification</p>
                      <p className="text-2xl font-bold text-orange-600">197</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'case-detail':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Case Detail Viewer</h1>
              <p className="text-slate-600 mt-1">Search and view case information by FIR ID</p>
            </div>
            
            {/* Case Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Search className="w-5 h-5 mr-3" />
                  Search Case by FIR ID
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Enter FIR ID (e.g., ALERT-2024-001)"
                      value={caseSearchQuery}
                      onChange={(e) => setCaseSearchQuery(e.target.value)}
                      className="pl-12 py-3 text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleCaseSearch()}
                      disabled={isSearchingCase}
                    />
                  </div>
                  <Button 
                    onClick={handleCaseSearch} 
                    className="px-8 py-3"
                    disabled={!caseSearchQuery.trim() || isSearchingCase}
                  >
                    {isSearchingCase ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Search Case
                      </>
                    )}
                  </Button>
                </div>
                
                {!foundCase && !isSearchingCase && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Available FIR IDs for testing: <span className="font-mono">ALERT-2024-001</span>, <span className="font-mono">ALERT-2024-002</span>, <span className="font-mono">ALERT-2024-003</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Case Results */}
            {foundCase ? (
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">Case Information</CardTitle>
                      <p className="text-green-100">FIR ID: {foundCase.firId} • {foundCase.incidentType}</p>
                    </div>
                    <Badge className={`${getStatusColor(foundCase.status)} border`}>
                      {foundCase.status.toUpperCase()}
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
                        <p className="text-slate-900 mt-1">{foundCase.touristName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Tourist ID</Label>
                        <p className="font-mono text-slate-900 mt-1">{foundCase.touristId}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Incident Type</Label>
                        <p className="text-slate-900 mt-1">{foundCase.incidentType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Location</Label>
                        <p className="text-slate-900 mt-1">{foundCase.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Timestamp</Label>
                        <p className="font-mono text-slate-900 mt-1">{foundCase.timestamp}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-slate-600">Priority</Label>
                        <Badge className={`${getPriorityColor(foundCase.priority)} mt-1`}>
                          {foundCase.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Investigation Details */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-blue-800">
                          <Shield className="w-5 h-5 mr-2" />
                          Investigation Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-xs font-semibold text-blue-600">Investigating Officer</Label>
                          <p className="text-sm text-blue-900">{foundCase.investigatingOfficer}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold text-blue-600">Assigned Unit</Label>
                          <p className="text-sm text-blue-900">{foundCase.unit}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold text-blue-600">Current Situation</Label>
                          <p className="text-sm text-blue-900">{foundCase.currentSituation}</p>
                        </div>
                        <div className="flex items-center text-xs text-green-700 bg-green-50 p-2 rounded">
                          <FileText className="w-4 h-4 mr-2" />
                          Case details verified
                        </div>
                      </CardContent>
                    </Card>

                    {/* Case Updates Timeline */}
                    <Card className="border-green-200 bg-green-50/30">
                      <CardHeader>
                        <CardTitle className="flex items-center text-green-800">
                          <Clock className="w-5 h-5 mr-2" />
                          Case Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {foundCase.updates.map((update: any, index: number) => (
                          <div key={index} className="border-l-2 border-green-300 pl-4 pb-3">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-semibold text-green-900">{update.action}</p>
                              <span className="text-xs text-green-600">{update.time}</span>
                            </div>
                            <p className="text-xs text-green-700">By: {update.officer}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex flex-wrap gap-4">
                      <Button className="px-6 py-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Officer
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <Eye className="w-4 h-4 mr-2" />
                        View Evidence
                      </Button>
                      <Button variant="outline" className="px-6 py-2">
                        <FileText className="w-4 h-4 mr-2" />
                        Case Summary
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : caseSearchQuery && !isSearchingCase ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">No Case Found</h3>
                      <p className="text-slate-600 mt-1">
                        No case found for FIR ID "{caseSearchQuery}". Please verify the FIR ID and try again.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setCaseSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : !isSearchingCase && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">Case Information Database</h3>
                      <p className="text-slate-600 mt-2 text-lg">
                        Enter a FIR ID in the search box above to view comprehensive case information including investigation status, assigned officers, and current situation.
                      </p>
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
                      <SelectItem value="Safety Advisory">Safety Advisory</SelectItem>
                      <SelectItem value="Location Check">Location Check</SelectItem>
                      <SelectItem value="General Information">General Information</SelectItem>
                      <SelectItem value="Tourism Update">Tourism Update</SelectItem>
                      <SelectItem value="Service Information">Service Information</SelectItem>
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
                      <SelectItem value="weather">Weather Alert</SelectItem>
                      <SelectItem value="traffic">Traffic Update</SelectItem>
                      <SelectItem value="event">Event Information</SelectItem>
                      <SelectItem value="attraction">Attraction Update</SelectItem>
                      <SelectItem value="general">General Advisory</SelectItem>
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

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Tourism Analytics</h1>
              <p className="text-slate-600 mt-1">Comprehensive insights and performance metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tourist Flow Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Analytics Chart</p>
                      <p className="text-sm text-gray-500">Tourist flow over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Safety Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Incident Analysis</p>
                      <p className="text-sm text-gray-500">Safety metrics and trends</p>
                    </div>
                  </div>
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
                <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">Complete Evidence Package</CardTitle>
                      <p className="text-green-100">FIR ID: {foundEvidence.firId} • {foundEvidence.incidentType}</p>
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
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-10 h-10 text-green-600" />
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
                  ? 'bg-green-50 text-green-600 border-l-4 border-green-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              title={!sidebarExpanded ? item.label : ''}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
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
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Tourism Department</h1>
                  <p className="text-xs text-slate-500">Smart Tourist Safety & Analytics</p>
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

      {/* Alert Detail Modal */}
      <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Alert Details - {selectedAlert?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-6">
              {/* Alert Overview */}
              <div className="p-6 bg-slate-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Alert Overview
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Alert Type</Label>
                    <p className="text-slate-900 mt-1">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Priority</Label>
                    <Badge className={`${getAlertPriorityColor(selectedAlert.priority)} mt-1`}>
                      {selectedAlert.priority}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Status</Label>
                    <Badge className={`${getAlertStatusColor(selectedAlert.status)} mt-1`}>
                      {selectedAlert.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Location</Label>
                    <p className="text-slate-900 mt-1">{selectedAlert.location.address}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Time</Label>
                    <p className="text-slate-900 mt-1">{selectedAlert.timeAgo}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Confidence</Label>
                    <p className="text-slate-900 mt-1">{selectedAlert.confidence}%</p>
                  </div>
                </div>
              </div>

              {/* Tourist Information */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <Users className="w-5 h-5 mr-2" />
                      Tourist Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Name</Label>
                      <p className="text-sm text-blue-900">{selectedAlert.tourist.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Tourist ID</Label>
                      <p className="font-mono text-sm text-blue-900">{selectedAlert.tourist.id}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Nationality</Label>
                      <p className="text-sm text-blue-900">{selectedAlert.tourist.nationality}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Age</Label>
                      <p className="text-sm text-blue-900">{selectedAlert.tourist.age} years</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Phone</Label>
                      <p className="text-sm text-blue-900">{selectedAlert.tourist.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Information */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <Radio className="w-5 h-5 mr-2" />
                      Response Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Assigned Unit</Label>
                      <p className="text-sm text-green-900">{selectedAlert.assignedUnit}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">ETA</Label>
                      <p className="text-sm text-green-900">{selectedAlert.eta}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Zone</Label>
                      <p className="text-sm text-green-900">{selectedAlert.location.zone}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Description</Label>
                      <p className="text-sm text-green-900">{selectedAlert.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                <Button className="px-6 py-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Unit
                </Button>
                <Button variant="outline" className="px-6 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
                <Button variant="outline" className="px-6 py-2">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Digital ID Detail Modal */}
      <Dialog open={isDigitalIdModalOpen} onOpenChange={setIsDigitalIdModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Digital ID Details - {selectedDigitalId?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedDigitalId && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="p-6 bg-slate-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-slate-900 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Full Name</Label>
                    <p className="text-slate-900 mt-1">{selectedDigitalId.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Digital ID</Label>
                    <p className="font-mono text-slate-900 mt-1">{selectedDigitalId.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Country</Label>
                    <p className="text-slate-900 mt-1">{selectedDigitalId.country}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Email</Label>
                    <p className="text-slate-900 mt-1">{selectedDigitalId.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Phone</Label>
                    <p className="text-slate-900 mt-1">{selectedDigitalId.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Passport Number</Label>
                    <p className="font-mono text-slate-900 mt-1">{selectedDigitalId.passportNumber}</p>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-800">
                      <MapPin className="w-5 h-5 mr-2" />
                      Travel Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Check-in Location</Label>
                      <p className="text-sm text-blue-900">{selectedDigitalId.checkInLocation}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Planned Duration</Label>
                      <p className="text-sm text-blue-900">{selectedDigitalId.plannedDuration}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Travel Insurance</Label>
                      <p className="text-sm text-blue-900">{selectedDigitalId.travelInsurance}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-blue-600">Planned Itinerary</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedDigitalId.itinerary?.map((place: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {place}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verification & Security */}
                <Card className="border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-800">
                      <Shield className="w-5 h-5 mr-2" />
                      Verification & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Verification Status</Label>
                      <Badge className={selectedDigitalId.verificationStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {selectedDigitalId.verificationStatus}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Biometric Verified</Label>
                      <p className="text-sm text-green-900">{selectedDigitalId.biometricVerified ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Blockchain Hash</Label>
                      <p className="font-mono text-xs text-green-900 truncate">{selectedDigitalId.blockchainHash}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Registration Date</Label>
                      <p className="text-sm text-green-900">{selectedDigitalId.registrationDate}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-green-600">Last Activity</Label>
                      <p className="text-sm text-green-900">{selectedDigitalId.lastActivity}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency & Medical Information */}
              <Card className="border-red-200 bg-red-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-800">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergency & Medical Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-red-600">Emergency Contact</Label>
                    <p className="text-sm text-red-900">{selectedDigitalId.emergencyContact}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-red-600">Medical Information</Label>
                    <p className="text-sm text-red-900">{selectedDigitalId.medicalInfo}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                <Button className="px-6 py-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Tourist
                </Button>
                <Button variant="outline" className="px-6 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Track Location
                </Button>
                <Button variant="outline" className="px-6 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Verify Identity
                </Button>
                <Button variant="outline" className="px-6 py-2">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}