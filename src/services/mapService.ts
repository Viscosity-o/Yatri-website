// Mock backend data service for tourist locations and coordinates
export interface TouristLocation {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  status: 'safe' | 'alert' | 'missing' | 'emergency';
  lastSeen: string;
  activity: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PointOfInterest {
  id: string;
  name: string;
  type: 'monument' | 'hotel' | 'restaurant' | 'transport' | 'hospital' | 'police';
  coordinates: [number, number];
  touristCount: number;
  description: string;
}

export interface HeatmapData {
  coordinates: [number, number];
  intensity: number;
  timestamp: string;
}

// Mock data for Delhi NCR region
const DELHI_CENTER: [number, number] = [28.6139, 77.2090];

// Mock tourist location data
const mockTouristLocations: TouristLocation[] = [
  {
    id: 'TID-2024-001',
    name: 'John Anderson',
    country: 'USA',
    coordinates: [28.6129, 77.2295], // India Gate area
    status: 'safe',
    lastSeen: '2 minutes ago',
    activity: 'Visiting India Gate',
    riskLevel: 'low'
  },
  {
    id: 'TID-2024-002',
    name: 'Emma Wilson',
    country: 'UK',
    coordinates: [28.6562, 77.2410], // Red Fort area
    status: 'safe',
    lastSeen: '5 minutes ago',
    activity: 'Red Fort tour',
    riskLevel: 'low'
  },
  {
    id: 'TID-2024-003',
    name: 'Carlos Rodriguez',
    country: 'Spain',
    coordinates: [28.6304, 77.2177], // Connaught Place
    status: 'emergency',
    lastSeen: '1 hour ago',
    activity: 'Medical assistance required',
    riskLevel: 'high'
  },
  {
    id: 'TID-2024-004',
    name: 'Yuki Tanaka',
    country: 'Japan',
    coordinates: [28.6507, 77.2334], // Chandni Chowk
    status: 'alert',
    lastSeen: '30 minutes ago',
    activity: 'Reported harassment',
    riskLevel: 'medium'
  },
  {
    id: 'TID-2024-005',
    name: 'Lisa Chen',
    country: 'Singapore',
    coordinates: [28.5535, 77.2588], // Qutub Minar
    status: 'safe',
    lastSeen: '10 minutes ago',
    activity: 'Heritage site visit',
    riskLevel: 'low'
  },
  {
    id: 'TID-2024-006',
    name: 'Ahmed Hassan',
    country: 'UAE',
    coordinates: [28.6139, 77.2090], // Central Delhi
    status: 'missing',
    lastSeen: '2 hours ago',
    activity: 'Last seen near metro station',
    riskLevel: 'high'
  },
  // Additional tourists for clustering demonstration
  {
    id: 'TID-2024-007',
    name: 'Sophie Martin',
    country: 'France',
    coordinates: [28.6135, 77.2300], // Near India Gate
    status: 'safe',
    lastSeen: '3 minutes ago',
    activity: 'Photography',
    riskLevel: 'low'
  },
  {
    id: 'TID-2024-008',
    name: 'David Kim',
    country: 'South Korea',
    coordinates: [28.6140, 77.2305], // Near India Gate
    status: 'safe',
    lastSeen: '1 minute ago',
    activity: 'Group tour',
    riskLevel: 'low'
  }
];

// Mock points of interest
const mockPointsOfInterest: PointOfInterest[] = [
  {
    id: 'POI-001',
    name: 'India Gate',
    type: 'monument',
    coordinates: [28.6129, 77.2295],
    touristCount: 245,
    description: 'War memorial and popular tourist attraction'
  },
  {
    id: 'POI-002',
    name: 'Red Fort',
    type: 'monument',
    coordinates: [28.6562, 77.2410],
    touristCount: 189,
    description: 'Historic Mughal fortress and UNESCO World Heritage Site'
  },
  {
    id: 'POI-003',
    name: 'Qutub Minar',
    type: 'monument',
    coordinates: [28.5535, 77.2588],
    touristCount: 156,
    description: 'Medieval Islamic monument and UNESCO World Heritage Site'
  },
  {
    id: 'POI-004',
    name: 'Lotus Temple',
    type: 'monument',
    coordinates: [28.5535, 77.2588],
    touristCount: 134,
    description: 'Bahá\'í House of Worship'
  },
  {
    id: 'POI-005',
    name: 'All India Institute of Medical Sciences',
    type: 'hospital',
    coordinates: [28.5672, 77.2100],
    touristCount: 0,
    description: 'Major hospital and emergency medical facility'
  },
  {
    id: 'POI-006',
    name: 'New Delhi Railway Station',
    type: 'transport',
    coordinates: [28.6431, 77.2197],
    touristCount: 78,
    description: 'Major railway transport hub'
  }
];

// Generate mock heatmap data
const generateHeatmapData = (): HeatmapData[] => {
  const heatmapData: HeatmapData[] = [];
  
  // High density areas around major attractions
  const hotspots = [
    { center: [28.6129, 77.2295], intensity: 0.8 }, // India Gate
    { center: [28.6562, 77.2410], intensity: 0.7 }, // Red Fort
    { center: [28.6304, 77.2177], intensity: 0.6 }, // Connaught Place
    { center: [28.6507, 77.2334], intensity: 0.5 }, // Chandni Chowk
    { center: [28.5535, 77.2588], intensity: 0.4 }, // Qutub Minar
  ];

  hotspots.forEach(hotspot => {
    // Generate multiple points around each hotspot
    for (let i = 0; i < 20; i++) {
      const lat = hotspot.center[0] + (Math.random() - 0.5) * 0.01;
      const lng = hotspot.center[1] + (Math.random() - 0.5) * 0.01;
      heatmapData.push({
        coordinates: [lat, lng],
        intensity: hotspot.intensity * (0.5 + Math.random() * 0.5),
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
      });
    }
  });

  return heatmapData;
};

// API simulation functions
export class MapService {
  private static instance: MapService;
  private touristLocations: TouristLocation[] = [...mockTouristLocations];
  private pointsOfInterest: PointOfInterest[] = [...mockPointsOfInterest];
  private heatmapData: HeatmapData[] = generateHeatmapData();

  public static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService();
    }
    return MapService.instance;
  }

  // Simulate API call to fetch tourist locations
  async fetchTouristLocations(): Promise<TouristLocation[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate real-time updates by slightly modifying positions
    this.touristLocations = this.touristLocations.map(tourist => ({
      ...tourist,
      coordinates: [
        tourist.coordinates[0] + (Math.random() - 0.5) * 0.0001,
        tourist.coordinates[1] + (Math.random() - 0.5) * 0.0001
      ] as [number, number],
      lastSeen: Math.random() > 0.8 ? `${Math.floor(Math.random() * 10) + 1} minutes ago` : tourist.lastSeen
    }));

    return [...this.touristLocations];
  }

  // Simulate API call to fetch points of interest
  async fetchPointsOfInterest(): Promise<PointOfInterest[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate dynamic tourist counts
    this.pointsOfInterest = this.pointsOfInterest.map(poi => ({
      ...poi,
      touristCount: Math.max(0, poi.touristCount + Math.floor((Math.random() - 0.5) * 10))
    }));

    return [...this.pointsOfInterest];
  }

  // Simulate API call to fetch heatmap data
  async fetchHeatmapData(): Promise<HeatmapData[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Generate new heatmap data to simulate real-time updates
    this.heatmapData = generateHeatmapData();
    return [...this.heatmapData];
  }

  // Get city center coordinates (admin location)
  getCityCenter(): [number, number] {
    return DELHI_CENTER;
  }

  // Filter tourists by status
  async fetchTouristsByStatus(status: TouristLocation['status']): Promise<TouristLocation[]> {
    const locations = await this.fetchTouristLocations();
    return locations.filter(tourist => tourist.status === status);
  }

  // Get tourists within a specific radius
  async fetchTouristsInRadius(center: [number, number], radiusKm: number): Promise<TouristLocation[]> {
    const locations = await this.fetchTouristLocations();
    
    return locations.filter(tourist => {
      const distance = this.calculateDistance(center, tourist.coordinates);
      return distance <= radiusKm;
    });
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(coord2[0] - coord1[0]);
    const dLon = this.toRad(coord2[1] - coord1[1]);
    const lat1 = this.toRad(coord1[0]);
    const lat2 = this.toRad(coord2[0]);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    return d;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  // Simulate real-time updates
  subscribeToUpdates(callback: (data: {
    tourists: TouristLocation[],
    pois: PointOfInterest[],
    heatmap: HeatmapData[]
  }) => void): () => void {
    const interval = setInterval(async () => {
      const [tourists, pois, heatmap] = await Promise.all([
        this.fetchTouristLocations(),
        this.fetchPointsOfInterest(),
        this.fetchHeatmapData()
      ]);
      
      callback({ tourists, pois, heatmap });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }
}