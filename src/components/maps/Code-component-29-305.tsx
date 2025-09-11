import { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Loader2, MapPin } from 'lucide-react';

interface MapLoaderProps {
  height?: string;
  children: React.ReactNode;
}

export function MapLoader({ height = '400px', children }: MapLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative" style={{ height }}>
        <Card className="h-full">
          <CardContent className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="relative mb-4">
                <MapPin className="w-12 h-12 text-blue-500 mx-auto" />
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin absolute -bottom-1 -right-1" />
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Loading Interactive Map</h3>
              <p className="text-sm text-gray-500">Fetching real-time location data...</p>
              
              <div className="mt-4 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}