import axios from 'axios';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

/**
 * By default, axios will throw an error if the status code is not in the range 200 to 299
 */
export const backendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND
    ? 'http://localhost:3002/'
    : 'https://homehubdope.com:3001/',
});
