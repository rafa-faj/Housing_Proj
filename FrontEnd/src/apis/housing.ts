/* eslint-disable @typescript-eslint/camelcase */
import { CreateHousePostProperties, HousePost } from '../models/PostModels';
import { FilterModel } from '@models';
import { backendAPI } from './apiBases';
import { getDurationInMinutes } from '.';

export const getRecentHousingPostIds = async () => {
  const result = await backendAPI.get<number[]>('/getRecentRoomIds', {
    withCredentials: true,
  });

  return result.data;
};

export const getHousingPost = async (roomId: number) => {
  const result = await backendAPI.get<HousePost>(`/getRoom/${roomId}`, {
    withCredentials: true,
  });

  return result.data;
};

export const searchHousingPosts = async ({
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
  const result = await backendAPI.post<number[]>(
    '/searchRoom',
    {
      distance,
      room_type: roomType,
      price_min: priceMin,
      price_max: priceMax,
      early_interval: earlyInterval,
      early_month: earlyMonth,
      late_interval: lateInterval,
      late_month: lateMonth,
      stay_period: stayPeriod,
      other,
      facilities,
      numBeds,
      numBaths,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    },
  );

  return result.data;
};

export const newHousingPostAPI = async (
  roomForm: CreateHousePostProperties & { email: string }, // TODO double check that this is the correct type for param, and you need to type the promise
): Promise<any[] | undefined> => {
  console.log('starting the new housing post api');
  try {
    // TODO distance calculation not working for some reason
    // calculate distance to location
    const distance = await getDurationInMinutes(roomForm.location);
    console.log('distance');
    console.log(distance);
    if (!distance) {
      throw Error("Bad request - can't calculate the distance to the address.");
    }

    const formData = new FormData();
    roomForm.photos.forEach((photo) => formData.append('photos', photo));
    formData.append(
      'json',
      JSON.stringify({ ...roomForm, photos: undefined, distance }),
    );

    const result = await backendAPI.post(
      '/postRoom',
      // TODO { roomForm, distance: '15 min' },
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );
    console.log(result, 'get result');
    // handle errors
    if (result.request?.status !== 201) throw Error('Bad request');
    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const getHousingBookmarksAPI = async () => {
  try {
    const result = await backendAPI.get<HousePost[]>('/bookmark', {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(result);
    if (result.request?.status !== 200) throw Error('Bad request');

    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const addHousingBookmarkAPI = async (roomId: number) => {
  try {
    const result = await backendAPI.post(
      '/bookmark',
      JSON.stringify({ room_id: roomId, action: 'add' }),
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log(result);
    if (result.request?.status !== 201) throw Error('Bad request');

    return true;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const removeHousingBookmarkAPI = async (roomId: number) => {
  try {
    const result = await backendAPI.post(
      '/bookmark',
      JSON.stringify({ room_id: roomId, action: 'remove' }),
      {
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
      },
    );
    console.log(result);
    if (result.request?.status !== 200) throw Error('Bad request');

    return true;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
