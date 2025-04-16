
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';

interface StatisticsData {
  totalIncidents: number;
  resolvedIncidents: number;
  averageResponseTime: string;
  activeAlerts: number;
  systemStatus: string;
  camerasOnline: number;
  camerasOffline: number;
  detectionAccuracy: number;
}

export const statisticsService = {
  // Get dashboard statistics
  getStatistics: (): Promise<StatisticsData> => {
    return apiService.get<StatisticsData>(ENDPOINTS.STATISTICS);
  }
};
