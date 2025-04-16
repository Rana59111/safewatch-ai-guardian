
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';
import { Camera } from '@/types';

export const cameraService = {
  // Get all cameras
  getAllCameras: (): Promise<Camera[]> => {
    return apiService.get<Camera[]>(ENDPOINTS.CAMERAS);
  },
  
  // Get camera by id
  getCameraById: (id: number): Promise<Camera> => {
    return apiService.get<Camera>(ENDPOINTS.CAMERA_DETAIL(id));
  },
  
  // Update camera status
  updateCameraStatus: (id: number, status: 'online' | 'offline' | 'maintenance'): Promise<Camera> => {
    return apiService.patch<Camera>(ENDPOINTS.CAMERA_DETAIL(id), { status });
  },
  
  // Update threat level
  updateThreatLevel: (id: number, threatLevel: 'low' | 'medium' | 'high' | 'unknown'): Promise<Camera> => {
    return apiService.patch<Camera>(ENDPOINTS.CAMERA_DETAIL(id), { threatLevel });
  }
};
