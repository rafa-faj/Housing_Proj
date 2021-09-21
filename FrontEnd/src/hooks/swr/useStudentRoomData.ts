import useSWR from 'swr';
import { getRecentStudentHousingJSONs } from '@apis';
import { TEN_MINUTES } from '@constants';
/**
 * Used to fetch student post data
 * @param roomId room id, used to fetch a json for a particular room
 */
const useStudentRoomData = (roomId: number) => {
  const { data, error, isValidating, mutate } = useSWR(
    ['/api/rooms', roomId, 'studentPost'],
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
