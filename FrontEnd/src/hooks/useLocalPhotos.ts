import { isStringArray } from '../utils/typing/index';

/**
 * Pass in array of photo files or urls. If urls, it will just return the urls. If Files, the Files will be converted to
 * local urls and those will be returned.
 *
 * The second thing returned is if the parameter was indeed a File array when it was passed in (will be true if array \
 * of Files, false if array of strings).
 *
 * @param photos File or URL array
 */
const useLocalPhotos = (photos: File[] | string[]): [string[], boolean] => {
  if (isStringArray(photos)) {
    const convertedPhotos = photos as string[];
    return [convertedPhotos, false];
  }

  const convertedPhotos = (photos as File[]).map((p) => URL.createObjectURL(p));
  return [convertedPhotos, true];
};

export default useLocalPhotos;
