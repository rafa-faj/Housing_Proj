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

// TODO need to handle if this is unsuccessful...
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

export const getHousingBookmarks = async () => {
  const result = await backendAPI.get<number[]>('/bookmark', {
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  });

  return result.data;
};

// TODO need to handle if this is unsuccessful...
export const addHousingBookmark = async (roomId: number) => {
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

  return true;
};

// TODO need to handle if this is unsuccessful...
export const removeHousingBookmark = async (roomId: number) => {
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
};

export const newHousingPostAPI = async (
  roomForm: CreateHousePostProperties & { email: string }, // TODO double check that this is the correct type for param, and you need to type the promise
): Promise<any[] | undefined> => {
  try {
    const distance = await getDurationInMinutes(roomForm.location);
    if (!distance) {
      throw Error("Bad request - can't calculate the distance to the address.");
    }

    const formData = new FormData();
    roomForm.photos.forEach((photo) => formData.append('photos', photo));
    formData.append(
      'json',
      // photos have already been added
      JSON.stringify({ ...roomForm, photos: undefined, distance }),
    );

    const result = await backendAPI.post('/postRoom', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    if (result.request?.status !== 201) throw Error('Bad request');

    return result.data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
