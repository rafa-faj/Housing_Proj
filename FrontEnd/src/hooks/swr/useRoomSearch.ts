import useSWR from 'swr';
import { FilterModel } from '@models';
import { searchHousingPosts } from '@apis';

/**
 * Wrapper for the SWR of a room search. Returns an array
 * of roomIds
 *
 * @params - a filter model. Check it out in @models/FilterModel
 */
const useRoomSearch = ({
  distance,
  roomType,
  priceMin,
  priceMax,
  earlyInterval,
  earlyMonth,
  lateInterval,
  lateMonth,
  stayPeriod,
  other,
  facilities,
  numBeds,
  numBaths,
}: FilterModel) => {
  const { data, error, isValidating, mutate } = useSWR(
    [
      '/swr/rooms/search',
      distance,
      roomType,
      priceMin,
      priceMax,
      earlyInterval,
      earlyMonth,
      lateInterval,
      lateMonth,
      stayPeriod,
      other,
      facilities,
      numBeds,
      numBaths,
    ],
    (
      key,
      distance,
      roomType,
      priceMin,
      priceMax,
      earlyInterval,
      earlyMonth,
      lateInterval,
      lateMonth,
      stayPeriod,
      other,
      facilities,
      numBeds,
      numBaths,
    ) =>
      searchHousingPosts({
        distance,
        roomType,
        priceMin,
        priceMax,
        earlyInterval,
        earlyMonth,
        lateInterval,
        lateMonth,
        stayPeriod,
        other,
        facilities,
        numBeds,
        numBaths,
      }),
  );

  return {
    data,
    error,
    isValidating,
    mutate,
  };
};

export default useRoomSearch;
