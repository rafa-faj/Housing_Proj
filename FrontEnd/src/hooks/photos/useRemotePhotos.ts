const formatWithAws = (url: string) => {
  return `https://houseit.s3.us-east-2.amazonaws.com/${url}`;
};

/**
 * Takes in a string array and returns the strings formatted to access user photos on aws.
 *
 * @param photos array of strings representing the ends of urls to user photos.
 */
const useRemotePhotos = (photos: string[]): string[] => {
  return photos.map((urlSuffix) => formatWithAws(urlSuffix));
};

export default useRemotePhotos;
