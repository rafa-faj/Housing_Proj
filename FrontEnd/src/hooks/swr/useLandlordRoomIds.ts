import useSWR from 'swr';
import { getRecentLandlordHousingPostIds } from '@apis';
import { TEN_MINUTES } from '@constants';

const useLandlordRoomIds = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/rooms',
    getRecentLandlordHousingPostIds,
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

export default useLandlordRoomIds;