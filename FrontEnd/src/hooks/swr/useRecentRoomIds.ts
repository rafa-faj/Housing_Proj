import useSWR from 'swr';
import { getRecentHousingPostIds } from '@apis';
import { TEN_MINUTES } from '@constants';

const useRecentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentHousingPostIds,
    {
      refreshInterval: TEN_MINUTES,
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
