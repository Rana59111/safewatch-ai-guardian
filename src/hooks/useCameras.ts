
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cameraService } from '@/api';
import { Camera } from '@/types';
import { toast } from '@/components/ui/sonner';

export const useCameras = () => {
  const queryClient = useQueryClient();

  // Get all cameras
  const { data: cameras, isLoading, error } = useQuery({
    queryKey: ['cameras'],
    queryFn: cameraService.getAllCameras,
  });

  // Update camera status
  const updateCameraStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'online' | 'offline' | 'maintenance' }) =>
      cameraService.updateCameraStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      toast.success('Camera status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update camera status', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  // Update threat level
  const updateThreatLevel = useMutation({
    mutationFn: ({ id, threatLevel }: { id: number; threatLevel: 'low' | 'medium' | 'high' | 'unknown' }) =>
      cameraService.updateThreatLevel(id, threatLevel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cameras'] });
      toast.success('Threat level updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update threat level', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  return {
    cameras: cameras || [],
    isLoading,
    error,
    updateCameraStatus,
    updateThreatLevel,
  };
};
