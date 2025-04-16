
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';
import { Zone } from '@/types';

export const riskZoneService = {
  // Get all risk zones
  getAllRiskZones: (): Promise<Zone[]> => {
    return apiService.get<Zone[]>(ENDPOINTS.RISK_ZONES);
  }
};
