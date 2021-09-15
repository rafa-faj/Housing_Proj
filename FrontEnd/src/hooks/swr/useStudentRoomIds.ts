import useSWR from 'swr';
import { getRecentStudentHousingPostIds } from '@apis';
import { TEN_MINUTES } from '@constants';

const useStudentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentStudentHousingPostIds,
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

export default useStudentRoomIds;
