import { isStringArray } from '../../utils/typing/index';
import useRemotePhotos from './useRemotePhotos';
import useLocalPhotos from './useLocalPhotos';

/**
 * Combination of useLocalPhotos and useRemotePhotos.
 *
 * Pass in array of photo files or urls. If urls, it will return the urls extended onto the HomeHub AWS url.
 * If Files, the Files will be converted to local urls and those will be returned.
 *
 * @param photos File or URL array
 */
const useUserPhotos = (photos: File[] | string[]): string[] => {
  if (isStringArray(photos)) {
    return useRemotePhotos(photos as string[]);
  }

  return useLocalPhotos(photos as File[]);
};

export default useUserPhotos;
