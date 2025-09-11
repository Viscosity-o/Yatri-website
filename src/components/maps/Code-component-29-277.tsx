import { Card, CardContent } from '../ui/card';
import { MapPin, Loader2, Satellite, Navigation } from 'lucide-react';

interface MapLoadingFallbackProps {
  height?: string;
  loadingText?: string;
}

export function MapLoadingFallback({ 
  height = '400px',
  loadingText = 'Loading interactive map...'
}: MapLoadingFallbackProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-lg overflow-hidden" style={{ height }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>

      {/* Loading Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Icon Animation */}
          <div className="relative mb-6">
            <div className="relative">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto" />
              <div className="absolute -top-2 -right-2">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            </div>
            
            {/* Floating icons */}
            <div className="absolute -top-4 -left-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Satellite className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="absolute -bottom-4 -right-4 animate-bounce" style={{ animationDelay: '1s' }}>
              <Navigation className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          {/* Loading Text */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {loadingText}
          </h3>
          <p className="text-gray-600 mb-4">
            Initializing Google Maps-style interface with real-time data
          </p>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Feature Preview */}
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-green-600 text-xs">📍</span>
              </div>
              <span>Live Tracking</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-orange-600 text-xs">🔥</span>
              </div>
              <span>Heat Maps</span>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <span className="text-blue-600 text-xs">📊</span>
              </div>
              <span>Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated map elements */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-60" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}