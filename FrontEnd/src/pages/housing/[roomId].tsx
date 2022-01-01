import { HouseProfile, TriggerPageView } from '@components';
import { useRouterParams } from '@hooks';
import React, { FunctionComponent, useEffect } from 'react';

const Housing: FunctionComponent = () => {
  const roomId = useRouterParams('roomId');

  useEffect(() => {
    if (!roomId) return;

    TriggerPageView('housing/' + roomId);
  }, [roomId]);

  if (roomId) return <HouseProfile roomId={parseInt(roomId)} />;

  return <div>Loading...</div>;
};

export default Housing;
