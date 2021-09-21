import { HousePost, LandlordHousePost, StudentHousePostConsume } from '@models';
import { backendAPI } from '@apis';

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
 * Get IDs of recent Student room posts made.
 *
 * @returns array of id numbers
 */
export const getRecentStudentHousingPostIds = async () => {
  const response = await backendAPI.get<number[]>('/getRecentStudentRoomIds');

  return response.data;
};

/**
 * Get Room JSON of recent room posts made by students.
 *
 * @returns Student Room JSONs of a particular room
 */
export const getRecentStudentHousingJSONs = async (roomId: number) => {
  const response = await backendAPI.get<StudentHousePostConsume>(
    `/getRecentStudentRooms/${roomId}`,
  );

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

/** Post a housing made by the user
 * @param roomForm - the room form data provided by the user
 * @returns whether the post is successful
 */
export const generateHousingPost = async (roomForm: FormData) => {
  const response = await backendAPI.post('/postRoom', roomForm, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return response.status;
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
