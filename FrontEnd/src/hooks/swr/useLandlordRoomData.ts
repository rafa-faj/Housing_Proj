import useSWR from 'swr';
import { getRecentLandlordHousingJSONs } from '@apis';
import { TEN_MINUTES } from '@constants';

const useLandlordRoomData = (roomId: number) => {
  const { data, error, isValidating, mutate } = useSWR(
    ['/api/rooms', roomId],
    (key, roomId) => getRecentLandlordHousingJSONs(roomId),
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

export default useLandlordRoomData;
