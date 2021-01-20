import { isStringArray } from '../../utils/typing/index';

const formatWithAws = (url: string) => {
  return `https://houseit.s3.us-east-2.amazonaws.com/${url}`;
};

/**
 * Takes in a string array and returns the strings formatted to access user photos on aws.
 *
 * @param photos array of strings representing the ends of urls to user photos.
 */
export const formatUrlsWithAws = (photos: string[]): string[] => {
  return photos.map((urlSuffix) => formatWithAws(urlSuffix));
};

/**
 * Pass in array of files or urls. If urls, it will simply return them.
 * If Files, the Files will be converted to local urls and those will be returned.
 *
 * @param photos File or URL array
 * @param useAwsSuffix should the string array returned be formatted with AWS?
 */
export const photosToUrls = (
  photos: File[] | string[],
  useAwsSuffix?: boolean,
): string[] => {
  if (isStringArray(photos)) {
    return useAwsSuffix
      ? formatUrlsWithAws(photos as string[])
      : (photos as string[]);
  }

  return (photos as File[]).map((p) => URL.createObjectURL(p));
};
