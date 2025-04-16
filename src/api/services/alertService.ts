
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';
import { Alert } from '@/types';

export const alertService = {
  // Get all alerts
  getAllAlerts: (): Promise<Alert[]> => {
    return apiService.get<Alert[]>(ENDPOINTS.ALERTS);
  },
  
  // Get alert by id
  getAlertById: (id: number): Promise<Alert> => {
    return apiService.get<Alert>(ENDPOINTS.ALERT_DETAIL(id));
  },
  
  // Acknowledge alert
  acknowledgeAlert: (id: number): Promise<Alert> => {
    return apiService.post<Alert>(ENDPOINTS.ACKNOWLEDGE_ALERT(id));
  },
  
  // Create a new alert
  createAlert: (alert: Omit<Alert, 'id'>): Promise<Alert> => {
    return apiService.post<Alert>(ENDPOINTS.ALERTS, alert);
  }
};
