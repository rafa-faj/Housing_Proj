export const isRunningDev = () => !!process.env.NEXT_PUBLIC_USE_LOCAL_BACKEND;
export const isRunningServer = () => typeof window === 'undefined';
