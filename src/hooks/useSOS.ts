
import { useMutation } from '@tanstack/react-query';
import { sosService } from '@/api';
import { toast } from 'sonner';

export const useSOS = () => {
  // Trigger SOS alert
  const triggerSOS = useMutation({
    mutationFn: (location?: string) => sosService.triggerSOS(location),
    onSuccess: (data) => {
      toast.success('Emergency alert triggered', {
        description: `Emergency ID: ${data.emergencyId}`,
      });
    },
    onError: (error) => {
      toast.error('Failed to trigger emergency alert', {
        description: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    },
  });

  return {
    triggerSOS,
  };
};
