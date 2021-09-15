import useSWR from 'swr';
import { getRecentStudentHousingJSONs } from '@apis';
import { TEN_MINUTES } from '@constants';

const useStudentRoomData = (roomId: number) => {
  const { data, error, isValidating, mutate } = useSWR(
    ['/api/rooms', roomId],
    (key, roomId) => getRecentStudentHousingJSONs(roomId),
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

export default useStudentRoomData;
