
// Camera feed types
export type CameraStatus = "online" | "offline" | "maintenance";
export type ThreatLevel = "low" | "medium" | "high" | "unknown";

export interface Camera {
  id: number;
  name: string;
  location: string;
  status: CameraStatus;
  feedUrl: string;
  threatLevel: ThreatLevel;
}

// Alert system types
export type AlertLevel = "low" | "medium" | "high" | "critical";
export type AlertType = "assault" | "suspicious" | "crowd" | "gesture" | "abnormal";

export interface Alert {
  id: number;
  cameraId: number;
  timestamp: string;
  level: AlertLevel;
  type: AlertType;
  description: string;
  location: string;
  acknowledged: boolean;
  image?: string;
}

// Incident log types
export type IncidentStatus = "new" | "investigating" | "resolved" | "false_alarm";
export type IncidentType = "assault" | "suspicious" | "harassment" | "crowd" | "other";

export interface Incident {
  id: number;
  timestamp: string;
  type: IncidentType;
  location: string;
  description: string;
  status: IncidentStatus;
  responders: string[];
  responseTime: string;
}

// Risk zone mapping types
export interface Zone {
  id: number;
  name: string;
  lat: number;
  lng: number;
  riskLevel: number; // 0-100
}
