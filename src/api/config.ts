
// API configuration for Django backend

// Base URL for API calls - change this to your Django backend URL when deployed
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// API endpoints
export const ENDPOINTS = {
  // Camera feeds
  CAMERAS: '/cameras',
  CAMERA_DETAIL: (id: number) => `/cameras/${id}`,
  
  // Alerts
  ALERTS: '/alerts',
  ALERT_DETAIL: (id: number) => `/alerts/${id}`,
  ACKNOWLEDGE_ALERT: (id: number) => `/alerts/${id}/acknowledge`,
  
  // Incidents
  INCIDENTS: '/incidents',
  INCIDENT_DETAIL: (id: number) => `/incidents/${id}`,
  
  // Risk zones
  RISK_ZONES: '/risk-zones',
  
  // Statistics
  STATISTICS: '/statistics',
  
  // SOS
  TRIGGER_SOS: '/sos/trigger',
};

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 30000;
