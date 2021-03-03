import useSWR from 'swr';
import { getRecentHousingPostIds } from '../apis';

const useRecentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentHousingPostIds,
  );

  return {
    data,
    isValidating,
    error,
    mutate,
  };
};

export default useRecentRoomIds;
