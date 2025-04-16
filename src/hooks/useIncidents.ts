
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentService } from '@/api';
import { Incident } from '@/types';
import { toast } from 'sonner';

export const useIncidents = () => {
  const queryClient = useQueryClient();

  // Get all incidents
  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: incidentService.getAllIncidents,
  });

  // Update incident status
  const updateIncidentStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'new' | 'investigating' | 'resolved' | 'false_alarm' }) =>
      incidentService.updateIncidentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('Incident status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update incident status', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  // Create new incident
  const createIncident = useMutation({
    mutationFn: (incident: Omit<Incident, 'id'>) => incidentService.createIncident(incident),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('New incident created');
    },
    onError: (error) => {
      toast.error('Failed to create incident', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  return {
    incidents: incidents || [],
    isLoading,
    error,
    updateIncidentStatus,
    createIncident,
  };
};
