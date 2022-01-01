import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseQueryParam } from '@utils';

// Gets parameter from the router.
const useRouterParams = (key: string): string | undefined => {
  const router = useRouter();
  const [param, setParam] = useState<string>();

  useEffect(() => {
    if (!router.isReady) return;

    const parsedParam = parseQueryParam(router.query[key])?.toString();
    setParam(parsedParam);
  }, [router]);

  return param;
};

export default useRouterParams;
