import { RoomType } from '@constants';

/**
 * Use to format roomType string, as returned from BE
 * @param roomType - roomType to format
 */
export const formatRoomType = (roomType: string): RoomType => {
  return RoomType[roomType as keyof typeof RoomType];
};
