// parses the query parameter into a number (or undefined)
// TODO should show 404 type page if the roomid that is passed doesn't exist
export const parseQueryParam = (params?: string | string[]) => {
  let roomIdString;
  if (typeof params === 'string') {
    roomIdString = params;
  } else {
    roomIdString = params ? params[0] : '';
  }

  const roomId = parseInt(roomIdString);
  return isNaN(roomId) ? undefined : roomId;
};
