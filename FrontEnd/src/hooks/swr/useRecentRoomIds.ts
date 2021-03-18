import useSWR from 'swr';
import { getRecentHousingPostIds } from '../../apis';

const useRecentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentHousingPostIds,
    {
      refreshInterval: 600000, // 10 minutes
    },
  );

  return {
    data,
    isValidating,
    error,
    mutate,
  };
};

export default useRecentRoomIds;
