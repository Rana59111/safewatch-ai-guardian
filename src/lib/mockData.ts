
import { Camera, AlertLevel, AlertType, Incident, Zone } from "@/types";

// Mock camera feeds with static images
export const cameras: Camera[] = [
  {
    id: 1,
    name: "Main Entrance",
    location: "Building A",
    status: "online",
    feedUrl: "https://images.unsplash.com/photo-1621955964441-c173e01c6586?q=80&w=1000&auto=format&fit=crop",
    threatLevel: "low",
  },
  {
    id: 2,
    name: "Parking Lot",
    location: "North Side",
    status: "online",
    feedUrl: "https://images.unsplash.com/photo-1621955761772-3faac2614b74?q=80&w=1000&auto=format&fit=crop",
    threatLevel: "medium",
  },
  {
    id: 3,
    name: "Side Alley",
    location: "East Wing",
    status: "online",
    feedUrl: "https://images.unsplash.com/photo-1577130740744-aa6f1dfe6243?q=80&w=1000&auto=format&fit=crop",
    threatLevel: "high",
  },
  {
    id: 4,
    name: "Park Pathway",
    location: "Central Park",
    status: "offline",
    feedUrl: "https://images.unsplash.com/photo-1573396948648-0c4ad603e5a2?q=80&w=1000&auto=format&fit=crop",
    threatLevel: "unknown",
  },
];

// Mock alerts for demonstration
export const alerts = [
  {
    id: 1,
    cameraId: 3,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    level: "critical" as AlertLevel,
    type: "assault" as AlertType,
    description: "Potential physical assault detected",
    location: "Side Alley, East Wing",
    acknowledged: false,
    image: "https://images.unsplash.com/photo-1577130740744-aa6f1dfe6243?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    cameraId: 2,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    level: "warning" as AlertLevel,
    type: "suspicious" as AlertType,
    description: "Suspicious loitering behavior detected",
    location: "Parking Lot, North Side",
    acknowledged: true,
    image: "https://images.unsplash.com/photo-1621955761772-3faac2614b74?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    cameraId: 1,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    level: "warning" as AlertLevel,
    type: "crowd" as AlertType,
    description: "Unusual crowd formation detected",
    location: "Main Entrance, Building A",
    acknowledged: true,
    image: "https://images.unsplash.com/photo-1621955964441-c173e01c6586?q=80&w=1000&auto=format&fit=crop",
  },
];

// Mock incident logs
export const incidents: Incident[] = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    type: "assault",
    location: "Side Alley, East Wing",
    description: "Physical assault reported and confirmed",
    status: "resolved",
    responders: ["Police", "Security Team"],
    responseTime: "4 minutes",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    type: "suspicious",
    location: "Parking Lot, North Side",
    description: "Suspicious individual following pedestrians",
    status: "investigating",
    responders: ["Security Team"],
    responseTime: "8 minutes",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    type: "harassment",
    location: "Main Entrance, Building A",
    description: "Verbal harassment incident",
    status: "resolved",
    responders: ["Security Team", "Campus Police"],
    responseTime: "6 minutes",
  },
];

// Mock high-risk zones data for heatmap
export const riskZones: Zone[] = [
  { id: 1, name: "Side Alley", lat: 40.7128, lng: -74.0060, riskLevel: 85 },
  { id: 2, name: "North Parking", lat: 40.7138, lng: -74.0065, riskLevel: 65 },
  { id: 3, name: "Construction Site", lat: 40.7118, lng: -74.0050, riskLevel: 75 },
  { id: 4, name: "Bus Stop", lat: 40.7135, lng: -74.0070, riskLevel: 45 },
  { id: 5, name: "Main Entrance", lat: 40.7140, lng: -74.0058, riskLevel: 25 },
];

// Mock statistics
export const statistics = {
  totalIncidents: 27,
  resolvedIncidents: 23,
  averageResponseTime: "5.8 minutes",
  activeAlerts: 1,
  systemStatus: "operational",
  camerasOnline: 18,
  camerasOffline: 2,
  detectionAccuracy: 94.2,
};

// Generate random alerts (for simulating new alerts)
export const generateRandomAlert = () => {
  const cameraId = Math.floor(Math.random() * cameras.length) + 1;
  const camera = cameras.find(c => c.id === cameraId) || cameras[0];
  
  const alertTypes: AlertType[] = ["assault", "suspicious", "crowd", "gesture", "abnormal"];
  const alertLevels: AlertLevel[] = ["low", "medium", "high", "critical"];
  
  const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const randomLevel = alertLevels[Math.floor(Math.random() * alertLevels.length)];
  
  return {
    id: Date.now(),
    cameraId: camera.id,
    timestamp: new Date().toISOString(),
    level: randomLevel,
    type: randomType,
    description: `Potential ${randomType} activity detected`,
    location: `${camera.name}, ${camera.location}`,
    acknowledged: false,
    image: camera.feedUrl,
  };
};
