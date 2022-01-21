// parses the query parameter into a number (or undefined)
// TODO should show 404 type page if the id that is passed doesn't exist
export const parseQueryParam = (params?: string | string[]) => {
  let idString;
  if (typeof params === 'string') {
    idString = params;
  } else {
    idString = params ? params[0] : '';
  }

  const id = parseInt(idString);
  return isNaN(id) ? undefined : id;
};
