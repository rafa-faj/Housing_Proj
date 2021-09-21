import useSWR from 'swr';
import { getRecentStudentHousingPostIds } from '@apis';
import { TEN_MINUTES } from '@constants';

/**
 * Used to get all ids of student post
 */
const useStudentRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    ['/api/rooms', 'studentPost'],
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
