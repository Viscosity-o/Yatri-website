import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  Search, 
  ArrowLeft, 
  Download, 
  Shield, 
  MapPin, 
  Clock, 
  Signal, 
  Radio, 
  Camera, 
  Video,
  Eye,
  FileText,
  CheckCircle,
  AlertTriangle,
  Hash,
  Activity,
  Database,
  Lock,
  Copy,
  ExternalLink,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  Info,
  Layers
} from 'lucide-react';

// Mock comprehensive evidence data
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

export function EvidenceViewer() {
  const [searchFirId, setSearchFirId] = useState('');
  const [currentEvidence, setCurrentEvidence] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchFirId.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const evidence = mockEvidenceDatabase[searchFirId as keyof typeof mockEvidenceDatabase];
      setCurrentEvidence(evidence || null);
      setIsSearching(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800 border-red-200';
      case 'Investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <Separator orientation="vertical" className="h-8" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Digital Evidence Viewer</h1>
              <p className="text-slate-600">Search and analyze case evidence using FIR ID</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              <Shield className="w-4 h-4 mr-2" />
              Secure Evidence Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Search Section */}
        <Card className="mb-8">
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
                  value={searchFirId}
                  onChange={(e) => setSearchFirId(e.target.value)}
                  className="pl-12 py-3 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  disabled={isSearching}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="px-8 py-3"
                disabled={!searchFirId.trim() || isSearching}
              >
                {isSearching ? (
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
            
            {!currentEvidence && !isSearching && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <Info className="w-4 h-4 inline mr-2" />
                  Available FIR IDs for testing: <span className="font-mono">ALERT-2024-001</span>, <span className="font-mono">ALERT-2024-002</span>, <span className="font-mono">ALERT-2024-003</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Evidence Results */}
        {currentEvidence ? (
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">Complete Evidence Package</CardTitle>
                  <p className="text-blue-100">FIR ID: {currentEvidence.firId} • {currentEvidence.incidentType}</p>
                </div>
                <Badge className={`${getStatusColor(currentEvidence.status)} border`}>
                  {currentEvidence.status.toUpperCase()}
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
                    <p className="text-slate-900 mt-1">{currentEvidence.touristName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Tourist ID</Label>
                    <p className="font-mono text-slate-900 mt-1">{currentEvidence.touristId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Incident Type</Label>
                    <p className="text-slate-900 mt-1">{currentEvidence.incidentType}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Location</Label>
                    <p className="text-slate-900 mt-1">{currentEvidence.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Timestamp</Label>
                    <p className="font-mono text-slate-900 mt-1">{currentEvidence.timestamp}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-slate-600">Status</Label>
                    <Badge className={`${getStatusColor(currentEvidence.status)} mt-1`}>
                      {currentEvidence.status}
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
                        <p className="font-mono text-sm text-blue-900">{currentEvidence.gps.coordinates}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-blue-600">Accuracy</Label>
                        <p className="text-sm text-blue-900">{currentEvidence.gps.accuracy}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-blue-600">Altitude</Label>
                        <p className="text-sm text-blue-900">{currentEvidence.gps.altitude}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-blue-600">Satellites</Label>
                        <p className="text-sm text-blue-900">{currentEvidence.gps.satellites} connected</p>
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
                        <p className="text-sm text-red-900">{currentEvidence.sos.triggerType}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-red-600">Confidence</Label>
                        <p className="text-sm text-red-900 font-semibold">{currentEvidence.sos.confidence}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-red-600">Signal Strength</Label>
                        <p className="text-sm text-red-900">{currentEvidence.sos.signalStrength}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-red-600">Battery Level</Label>
                        <p className="text-sm text-red-900">{currentEvidence.sos.batteryLevel}</p>
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
                            {currentEvidence.blockchain.hash.substring(0, 20)}...
                          </p>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => copyToClipboard(currentEvidence.blockchain.hash)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs font-semibold text-green-600">Block</Label>
                          <p className="font-mono text-sm text-green-900">{currentEvidence.blockchain.block}</p>
                        </div>
                        <div>
                          <Label className="text-xs font-semibold text-green-600">Confirmations</Label>
                          <p className="text-sm text-green-900">{currentEvidence.blockchain.confirmations}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-green-700 bg-green-100 p-2 rounded">
                      <Lock className="w-4 h-4 mr-2" />
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
                        <p className="font-mono text-sm text-purple-900">{currentEvidence.footage.cameraId}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-purple-600">Quality</Label>
                        <p className="text-sm text-purple-900">{currentEvidence.footage.quality}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-purple-600">Duration</Label>
                        <p className="text-sm text-purple-900">{currentEvidence.footage.duration}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-purple-600">File Size</Label>
                        <p className="text-sm text-purple-900">{currentEvidence.footage.fileSize}</p>
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
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Blockchain Explorer
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
        ) : searchFirId && !isSearching ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Database className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">No Evidence Found</h3>
                  <p className="text-slate-600 mt-1">
                    No evidence found for FIR ID "{searchFirId}". Please verify the FIR ID and try again.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setSearchFirId('')}>
                  Clear Search
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : !isSearching && (
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
    </div>
  );
}