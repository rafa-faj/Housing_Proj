import useSWR from 'swr';
import { HousePostUIData, HousePost } from '@models/PostModels';
import { getHousingPost } from '@apis';
import { formatRoomType, formatMoveIn, formatUrlsWithAws } from '@utils';

/**
 * Used to format data from api call to easily consumable data.
 * Changes early/late month range to string (and abbreviates the months).
 * Changes room type to be one of Room Enum.
 * @param unformattedData data from the api call
 */
const formatHouseData = (
  unformattedData?: HousePost,
): HousePostUIData | undefined => {
  let data: HousePostUIData | undefined = undefined;

  if (unformattedData) {
    const formattedMoveIn = formatMoveIn(
      unformattedData.early,
      unformattedData.late,
    );
    const roomType = formatRoomType(unformattedData.roomType);
    const photos = formatUrlsWithAws(unformattedData.photos);

    data = {
      ...unformattedData,
      formattedMoveIn,
      roomType,
      photos,
    };
  }

  return data;
};

/**
 * Wrapper for the SWR for a specific room (using it's ID).
 *
 * @param id - the id of the room to get
 */
const useRoomData = (id: number) => {
  const { data: unformattedData, error, isValidating, mutate } = useSWR(
    ['/api/rooms', id],
    (key, id) => getHousingPost(id),
  );

  const data = formatHouseData(unformattedData);

  return {
    data,
    error,
    isValidating,
    mutate,
  };
};

export default useRoomData;
