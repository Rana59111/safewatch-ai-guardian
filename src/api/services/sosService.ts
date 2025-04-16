
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';

interface SOSResponse {
  success: boolean;
  message: string;
  timestamp: string;
  emergencyId?: string;
}

export const sosService = {
  // Trigger SOS alert
  triggerSOS: (location?: string): Promise<SOSResponse> => {
    return apiService.post<SOSResponse>(ENDPOINTS.TRIGGER_SOS, { location });
  }
};
