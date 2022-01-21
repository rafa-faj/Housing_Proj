import React, { useEffect, useState, FunctionComponent } from 'react';
import { StudentHousePost } from '@components';
import { useRouter } from 'next/router';
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
  }, [router]);

  if (roomId) return <StudentHousePost roomId={roomId} />;

  return <div>Loading...</div>;
};

export default Housing;
