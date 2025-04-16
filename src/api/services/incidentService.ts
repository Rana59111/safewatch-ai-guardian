
import { apiService } from '../apiClient';
import { ENDPOINTS } from '../config';
import { Incident } from '@/types';

export const incidentService = {
  // Get all incidents
  getAllIncidents: (): Promise<Incident[]> => {
    return apiService.get<Incident[]>(ENDPOINTS.INCIDENTS);
  },
  
  // Get incident by id
  getIncidentById: (id: number): Promise<Incident> => {
    return apiService.get<Incident>(ENDPOINTS.INCIDENT_DETAIL(id));
  },
  
  // Create a new incident
  createIncident: (incident: Omit<Incident, 'id'>): Promise<Incident> => {
    return apiService.post<Incident>(ENDPOINTS.INCIDENTS, incident);
  },
  
  // Update incident status
  updateIncidentStatus: (id: number, status: 'new' | 'investigating' | 'resolved' | 'false_alarm'): Promise<Incident> => {
    return apiService.patch<Incident>(ENDPOINTS.INCIDENT_DETAIL(id), { status });
  }
};
