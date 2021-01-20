import axios from 'axios';
import { isRunningDev } from '../utils/next';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

/**
 * By default, axios will throw an error if the status code is not in the range 200 to 299
 */
export const backendAPI = axios.create({
  baseURL: isRunningDev()
    ? 'http://localhost:3002/'
    : 'https://homehubdope.com:3001/',
});
