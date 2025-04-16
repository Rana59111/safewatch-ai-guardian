
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertService } from '@/api';
import { Alert } from '@/types';
import { toast } from 'sonner';

export const useAlerts = () => {
  const queryClient = useQueryClient();

  // Get all alerts
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: alertService.getAllAlerts,
  });

  // Acknowledge alert
  const acknowledgeAlert = useMutation({
    mutationFn: (alertId: number) => alertService.acknowledgeAlert(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast.success('Alert acknowledged successfully');
    },
    onError: (error) => {
      toast.error('Failed to acknowledge alert', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  // Create new alert
  const createAlert = useMutation({
    mutationFn: (alert: Omit<Alert, 'id'>) => alertService.createAlert(alert),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast.success('New alert created');
    },
    onError: (error) => {
      toast.error('Failed to create alert', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  return {
    alerts: alerts || [],
    isLoading,
    error,
    acknowledgeAlert,
    createAlert,
  };
};
