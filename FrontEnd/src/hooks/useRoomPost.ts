import useSWR from 'swr';
import { getHousingPost } from '../apis';

const useRoomPost = (id: number) => {
  const { data, error, isValidating, mutate } = useSWR(
    ['/api/rooms', id],
    (key, id) => getHousingPost(id),
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    isValidating,
    mutate,
  };
};

export default useRoomPost;
