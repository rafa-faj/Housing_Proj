import axios, { AxiosTransformer } from 'axios';
import { isRunningDev } from '@utils';
import { PRODUCTION_BASE_URL, DEV_BASE_URL } from '@constants';

/**
 * // TODO
 * If error occured and there is a message in data, throw a new
 * error including message.
 */
const transformBackendResponse: AxiosTransformer = (data) => {};

/**
 * Axios object connected to backend with base url (handles running in dev
 * or production) and other required options already set.
 *
 * By default, axios will throw an error if the status code is not in the range 200 to 299
 */
export const backendAPI = axios.create({
  baseURL: isRunningDev() ? DEV_BASE_URL : PRODUCTION_BASE_URL,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
  // TODO transformResponse: transformBackendResponse,
});
