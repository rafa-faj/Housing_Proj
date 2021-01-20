import useSWR from 'swr';
import { getHousingBookmarks } from '@apis';
import { TEN_MINUTES } from '@constants';
import {
  addHousingBookmark as addBookmarkAPI,
  removeHousingBookmark as removeBookmarkAPI,
} from '@apis';

const useRoomBookmarks = () => {
  const { data, error, isValidating, mutate } = useSWR(
    '/api/bookmarks',
    getHousingBookmarks,
    {
      refreshInterval: TEN_MINUTES,
    },
  );

  const addBookmark = (roomId: number) => {
    const success = addBookmarkAPI(roomId);
    if (success && data) {
      const mergedBookmarks = [...data, roomId];
      mutate(mergedBookmarks, false);
    }
  };

  const removeBookmark = (roomId: number) => {
    const success = removeBookmarkAPI(roomId);
    if (success && data) {
      const unremovedBookmarks = data.filter((r) => r !== roomId);
      mutate(unremovedBookmarks, false);
    }
  };

  return {
    data,
    isValidating,
    error,
    mutate,
    addBookmark,
    removeBookmark,
  };
};

export default useRoomBookmarks;
