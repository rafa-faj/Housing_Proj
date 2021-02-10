import axios from 'axios';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

export const backendAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND
    ? 'http://localhost:3002/'
    : 'https://homehubdope.com:3001/',
});
