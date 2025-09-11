/* Google Maps-style Leaflet customizations */

/* Remove default Leaflet controls styling for custom look */
.leaflet-control-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Hide default zoom controls since we have custom ones */
.leaflet-control-zoom {
  display: none;
}

/* Custom div icon styling */
.custom-div-icon {
  border: none !important;
  background: transparent !important;
}

/* Map container with Google Maps-like styling */
.leaflet-container {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #e5e3df;
}

/* Custom popup styling - Google Maps style */
.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  background: white;
}

.leaflet-popup-content {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.leaflet-popup-tip {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Attribution styling */
.leaflet-control-attribution {
  background: rgba(255, 255, 255, 0.9);
  font-size: 11px;
  color: #666;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Custom marker cluster styling - Google style */
.marker-cluster-custom {
  border: none !important;
  background: transparent !important;
}

.marker-cluster-small {
  background-color: rgba(59, 130, 246, 0.8) !important;
  border: 2px solid white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

.marker-cluster-small div {
  background-color: rgba(59, 130, 246, 0.9) !important;
  border-radius: 50% !important;
  color: white !important;
  font-weight: 600 !important;
  text-align: center !important;
  line-height: 30px !important;
  width: 30px !important;
  height: 30px !important;
}

.marker-cluster-medium {
  background-color: rgba(251, 191, 36, 0.8) !important;
  border: 2px solid white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

.marker-cluster-medium div {
  background-color: rgba(251, 191, 36, 0.9) !important;
  border-radius: 50% !important;
  color: white !important;
  font-weight: 600 !important;
  text-align: center !important;
  line-height: 35px !important;
  width: 35px !important;
  height: 35px !important;
}

.marker-cluster-large {
  background-color: rgba(239, 68, 68, 0.8) !important;
  border: 2px solid white !important;
  border-radius: 50% !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
}

.marker-cluster-large div {
  background-color: rgba(239, 68, 68, 0.9) !important;
  border-radius: 50% !important;
  color: white !important;
  font-weight: 600 !important;
  text-align: center !important;
  line-height: 40px !important;
  width: 40px !important;
  height: 40px !important;
}

/* Pulse animation for emergency markers */
@keyframes emergencyPulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Custom tile layer styling for better contrast */
.leaflet-layer {
  filter: contrast(1.1) saturate(1.1);
}

/* Loading overlay styling */
.leaflet-loading {
  background: rgba(255, 255, 255, 0.8);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .leaflet-popup-content-wrapper {
    max-width: 280px;
  }
  
  .custom-div-icon {
    transform: scale(0.8);
  }
  
  .marker-cluster-small div,
  .marker-cluster-medium div,
  .marker-cluster-large div {
    font-size: 12px !important;
  }
}

/* Smooth zoom animations */
.leaflet-zoom-animated {
  transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1);
}

/* Custom control styling */
.leaflet-bar {
  border: none !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  overflow: hidden !important;
}

.leaflet-bar a {
  background: white !important;
  border: none !important;
  color: #374151 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 14px !important;
  transition: all 0.2s ease !important;
}

.leaflet-bar a:hover {
  background: #f3f4f6 !important;
  color: #111827 !important;
}