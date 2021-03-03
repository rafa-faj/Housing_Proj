import useSWR from 'swr';
import { getRecentHousingPostIds } from '../apis';

const useRecentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentHousingPostIds,
  );

  return {
    roomIds: data,
    isLoading: !error && !data,
    isValidating,
    mutate,
  };
};

export default useRecentRoomIds;
