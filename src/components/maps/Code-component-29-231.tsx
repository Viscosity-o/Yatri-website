import { useEffect, useRef } from 'react';
import { HeatmapData } from '../../services/mapService';

interface FallbackHeatmapProps {
  heatmapData: HeatmapData[];
  leafletMap: any;
  L: any;
}

export function FallbackHeatmap({ heatmapData, leafletMap, L }: FallbackHeatmapProps) {
  const heatmapLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!leafletMap || !L || !heatmapData.length) return;

    // Remove existing heatmap layer
    if (heatmapLayerRef.current) {
      leafletMap.removeLayer(heatmapLayerRef.current);
    }

    // Create circle markers for heatmap visualization
    const heatmapGroup = L.layerGroup();

    heatmapData.forEach((point) => {
      const intensity = point.intensity;
      const radius = Math.max(50, intensity * 100); // Scale radius based on intensity
      const opacity = Math.min(0.8, intensity + 0.2); // Scale opacity based on intensity

      // Determine color based on intensity
      let color: string;
      if (intensity < 0.3) {
        color = '#3b82f6'; // Blue for low intensity
      } else if (intensity < 0.6) {
        color = '#10b981'; // Green for medium-low
      } else if (intensity < 0.8) {
        color = '#f59e0b'; // Yellow for medium-high
      } else {
        color = '#ef4444'; // Red for high intensity
      }

      // Create circle marker
      const circle = L.circle(point.coordinates, {
        color: color,
        fillColor: color,
        fillOpacity: opacity * 0.4,
        radius: radius,
        weight: 2,
        opacity: opacity * 0.8
      });

      // Add popup with heatmap info
      circle.bindPopup(`
        <div style="padding: 8px; font-family: system-ui;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Activity Hotspot</h4>
          <div style="font-size: 12px; color: #6b7280;">
            <div style="margin-bottom: 4px;">📊 Intensity: ${(intensity * 100).toFixed(0)}%</div>
            <div style="margin-bottom: 4px;">📍 Lat: ${point.coordinates[0].toFixed(4)}</div>
            <div style="margin-bottom: 4px;">📍 Lng: ${point.coordinates[1].toFixed(4)}</div>
            <div style="margin-bottom: 4px;">🔥 Activity Level: ${
              intensity < 0.3 ? 'Low' : 
              intensity < 0.6 ? 'Medium' : 
              intensity < 0.8 ? 'High' : 'Very High'
            }</div>
          </div>
        </div>
      `);

      heatmapGroup.addLayer(circle);
    });

    // Add gradient circles for better heatmap effect
    heatmapData.forEach((point) => {
      const intensity = point.intensity;
      
      // Create multiple concentric circles for gradient effect
      for (let i = 3; i >= 1; i--) {
        const radius = (intensity * 80) * i;
        const opacity = (intensity * 0.3) / i;
        
        let color: string;
        if (intensity < 0.3) {
          color = '#3b82f6';
        } else if (intensity < 0.6) {
          color = '#10b981';
        } else if (intensity < 0.8) {
          color = '#f59e0b';
        } else {
          color = '#ef4444';
        }

        const gradientCircle = L.circle(point.coordinates, {
          color: 'transparent',
          fillColor: color,
          fillOpacity: opacity,
          radius: radius,
          weight: 0,
          interactive: false // Don't interfere with main circle interactions
        });

        heatmapGroup.addLayer(gradientCircle);
      }
    });

    // Add the heatmap layer to the map
    leafletMap.addLayer(heatmapGroup);
    heatmapLayerRef.current = heatmapGroup;

    return () => {
      if (heatmapLayerRef.current) {
        leafletMap.removeLayer(heatmapLayerRef.current);
        heatmapLayerRef.current = null;
      }
    };
  }, [heatmapData, leafletMap, L]);

  return null; // This component doesn't render anything directly
}

// Utility function to create fallback heatmap
export const createFallbackHeatmap = (heatmapData: HeatmapData[], leafletMap: any, L: any) => {
  if (!leafletMap || !L || !heatmapData.length) {
    console.log('Cannot create fallback heatmap:', { 
      hasMap: !!leafletMap, 
      hasL: !!L, 
      dataPoints: heatmapData.length 
    });
    return null;
  }

  console.log('Creating fallback heatmap with', heatmapData.length, 'data points');
  const heatmapGroup = L.layerGroup();

  // Sort by intensity to render high intensity areas on top
  const sortedData = [...heatmapData].sort((a, b) => b.intensity - a.intensity);

  sortedData.forEach((point, pointIndex) => {
    const intensity = Math.max(0.1, Math.min(1.0, point.intensity)); // Clamp intensity
    const baseRadius = Math.max(40, intensity * 150); // Increase base radius

    // Create multiple circles for gradient effect
    const circles = [
      {
        radius: baseRadius * 2.5,
        opacity: intensity * 0.08,
        weight: 0,
        zIndex: pointIndex * 10 + 1
      },
      {
        radius: baseRadius * 2.0,
        opacity: intensity * 0.15,
        weight: 0,
        zIndex: pointIndex * 10 + 2
      },
      {
        radius: baseRadius * 1.5,
        opacity: intensity * 0.25,
        weight: 0,
        zIndex: pointIndex * 10 + 3
      },
      {
        radius: baseRadius,
        opacity: intensity * 0.4,
        weight: 2,
        zIndex: pointIndex * 10 + 4
      }
    ];

    circles.forEach((circleConfig, index) => {
      // Enhanced color gradient based on intensity
      let color: string;
      let borderColor: string;
      
      if (intensity < 0.2) {
        color = '#3b82f6'; // Blue
        borderColor = '#1e40af';
      } else if (intensity < 0.4) {
        color = '#06b6d4'; // Cyan
        borderColor = '#0891b2';
      } else if (intensity < 0.6) {
        color = '#10b981'; // Emerald
        borderColor = '#059669';
      } else if (intensity < 0.8) {
        color = '#f59e0b'; // Amber
        borderColor = '#d97706';
      } else {
        color = '#ef4444'; // Red
        borderColor = '#dc2626';
      }

      const isTopCircle = index === circles.length - 1;
      
      const circle = L.circle(point.coordinates, {
        color: isTopCircle ? borderColor : 'transparent',
        fillColor: color,
        fillOpacity: circleConfig.opacity,
        radius: circleConfig.radius,
        weight: circleConfig.weight,
        opacity: circleConfig.weight > 0 ? 0.6 : 0,
        interactive: isTopCircle,
        className: `heatmap-circle-${intensity < 0.5 ? 'low' : 'high'}`
      });

      if (isTopCircle) {
        // Add detailed popup only to the top circle
        const intensityPercent = (intensity * 100).toFixed(0);
        const activityLevel = intensity < 0.2 ? '🟦 Very Low' : 
                             intensity < 0.4 ? '🟨 Low' : 
                             intensity < 0.6 ? '🟩 Medium' : 
                             intensity < 0.8 ? '🟧 High' : '🟥 Very High';
        
        circle.bindPopup(`
          <div style="padding: 16px; font-family: system-ui; max-width: 280px; background: white; border-radius: 8px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="
                width: 24px; 
                height: 24px; 
                background: linear-gradient(135deg, ${color}, ${borderColor}); 
                border-radius: 50%; 
                margin-right: 12px;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
              ">🔥</div>
              <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">Tourist Activity Hotspot</h4>
            </div>
            
            <div style="background: #f9fafb; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 500; color: #374151;">Intensity:</span>
                <span style="
                  background: ${color}; 
                  color: white; 
                  padding: 4px 8px; 
                  border-radius: 12px; 
                  font-size: 12px; 
                  font-weight: 600;
                ">${intensityPercent}%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 500; color: #374151;">Activity Level:</span>
                <span style="font-size: 14px;">${activityLevel}</span>
              </div>
            </div>
            
            <div style="font-size: 12px; color: #6b7280; line-height: 1.4;">
              <div style="margin-bottom: 4px;">
                <strong>📍 Location:</strong> ${point.coordinates[0].toFixed(4)}, ${point.coordinates[1].toFixed(4)}
              </div>
              <div style="margin-bottom: 4px;">
                <strong>🕒 Last Updated:</strong> ${new Date(point.timestamp).toLocaleTimeString()}
              </div>
              <div style="margin-bottom: 4px;">
                <strong>📊 Data Point:</strong> ${pointIndex + 1} of ${sortedData.length}
              </div>
            </div>
            
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; gap: 8px;">
                <button style="
                  flex: 1;
                  padding: 6px 12px;
                  background: ${color};
                  color: white;
                  border: none;
                  border-radius: 6px;
                  font-size: 12px;
                  font-weight: 500;
                  cursor: pointer;
                " onclick="console.log('Focus area:', '${point.coordinates}')">🎯 Focus Area</button>
                <button style="
                  flex: 1;
                  padding: 6px 12px;
                  background: #6b7280;
                  color: white;
                  border: none;
                  border-radius: 6px;
                  font-size: 12px;
                  font-weight: 500;
                  cursor: pointer;
                " onclick="console.log('More details:', '${point.coordinates}')">ℹ️ Details</button>
              </div>
            </div>
          </div>
        `);
      }

      heatmapGroup.addLayer(circle);
    });
  });

  console.log('Fallback heatmap created successfully with', sortedData.length, 'hotspots');
  return heatmapGroup;
};