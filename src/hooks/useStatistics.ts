
import { useQuery } from '@tanstack/react-query';
import { statisticsService } from '@/api';

export const useStatistics = () => {
  // Get statistics
  const { data: statistics, isLoading, error, refetch } = useQuery({
    queryKey: ['statistics'],
    queryFn: statisticsService.getStatistics,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  return {
    statistics,
    isLoading,
    error,
    refetch,
  };
};
