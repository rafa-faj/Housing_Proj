import {
  CreateHousePostProperties,
  HousePost,
  FilterModel,
  LandlordHousePost,
} from '@models';
import { backendAPI, getDurationInMinutes } from '.';

/**
 * Get IDs of recent room posts made.
 *
 * @returns array of id numbers
 */
export const getRecentHousingPostIds = async () => {
  const response = await backendAPI.get<number[]>('/getRecentRoomIds');

  return response.data;
};

/**
 * Get IDs of recent landlord room posts made.
 *
 * @returns array of id numbers
 */
export const getRecentLandlordHousingPostIds = async () => {
  const response = await backendAPI.get<number[]>('/getRecentLandlordRoomIds');

  return response.data;
};

/**
 * Get Room JSON of recent room posts made.
 *
 * @returns landlord Room JSONs of a particular room
 */
export const getRecentLandlordHousingJSONs = async (roomId: number) => {
  const response = await backendAPI.get<LandlordHousePost>(
    `/getRecentLandlordRooms/${roomId}`,
  );

  return response.data;
};

/**
 * Get room information of a specific house post by ID.
 *
 * @param roomId - the room id of the house
 * @returns room information of the house id provided
 */
export const getHousingPost = async (roomId: number) => {
  const response = await backendAPI.get<HousePost>(`/getRoom/${roomId}`);

  return response.data;
};

/**
 * Search all rooms with the specified filter.
 *
 * @param filter - information used to filter rooms
 * @returns array of room IDs that match the filter
 */
export const searchHousingPosts = async (filter: Partial<FilterModel>) => {
  const response = await backendAPI.post<number[]>('/searchRoom', filter);

  return response.data;
};

/**
 * Get bookmarked rooms of current user by ID.
 *
 * @returns array of room IDs that are bookmarked by current user
 */
export const getHousingBookmarks = async () => {
  const response = await backendAPI.get<number[]>('/bookmark');

  return response.data;
};

/**
 * Bookmark a room (specified by the provided roomId).
 *
 * @param roomId - the room to bookmark
 */
export const addHousingBookmark = async (roomId: number) => {
  await backendAPI.post('/bookmark', {
    roomId,
    action: 'add',
  });
};

/**
 * Unbookmark a room (specified by the provided roomId).
 *
 * @param roomId - the room to unbookmark
 */
export const removeHousingBookmark = async (roomId: number) => {
  await backendAPI.post('/bookmark', {
    roomId,
    action: 'remove',
  });
};

export const createHousingPost = async (
  roomForm: CreateHousePostProperties & { email: string }, // TODO double check that this is the correct type for param, and you need to type the promise
): Promise<any[] | undefined> => {
  console.log('starting the new housing post api');

  // TODO distance calculation not working for some reason
  // calculate distance to location
  const distance = await getDurationInMinutes(roomForm.address);
  console.log('distance');
  console.log(distance);
  if (!distance) {
    throw Error("Bad request - can't calculate the distance to the address.");
  }

  const formData = new FormData();
  roomForm.photos.forEach((photo) => formData.append('photos', photo));
  formData.append('json', { ...roomForm, photos: undefined, distance });

  const result = await backendAPI.post(
    '/postRoom',
    // TODO { roomForm, distance: '15 min' },
    formData,
  );
  console.log(result, 'got result');
  // handle errors

  return result.data;
};
