
import { useQuery } from '@tanstack/react-query';
import { riskZoneService } from '@/api';

export const useRiskZones = () => {
  // Get all risk zones
  const { data: zones, isLoading, error } = useQuery({
    queryKey: ['riskZones'],
    queryFn: riskZoneService.getAllRiskZones,
  });

  return {
    zones: zones || [],
    isLoading,
    error,
  };
};
