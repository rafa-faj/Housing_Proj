/**
 * Allows you to change the Files to use local URLs.
 *
 * @param photos File or File array
 */
const useLocalPhotos = (photos: File[]): string[] => {
  return photos.map((p) => URL.createObjectURL(p));
};

export default useLocalPhotos;
