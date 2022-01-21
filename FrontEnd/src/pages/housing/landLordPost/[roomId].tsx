import React, { useEffect, useState, FunctionComponent } from 'react';
import { HouseProfile } from '@components';
import { useRouter } from 'next/router';
import { TriggerPageView } from '@components/ga';
import { parseQueryParam } from '@utils';

const Housing: FunctionComponent = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<number | undefined>();

  // TODO potentially separate this into its own hook
  // this is needed because query in the router is not immediately defined
  useEffect(() => {
    if (!router.isReady) return;

    const roomId = parseQueryParam(router.query.roomId);
    setRoomId(roomId);

    TriggerPageView('housing/' + roomId?.toString());
  }, [router]);

  if (roomId) return <HouseProfile roomId={roomId} />;

  return <div>Loading...</div>;
};

export default Housing;
