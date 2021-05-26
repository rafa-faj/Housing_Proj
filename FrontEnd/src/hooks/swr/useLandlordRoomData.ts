import useSWR from 'swr';
import { getRecentLandlordHousingJSONs } from '@apis';

const useLandlordRoomData = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/getRecentLandlordRooms',
    getRecentLandlordHousingJSONs,
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

export default useLandlordRoomData;