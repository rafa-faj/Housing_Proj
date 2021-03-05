import { useRouter } from 'next/dist/client/router';
import React from 'react';
import HouseProfile from '../../components/HouseProfile/index';
import { default as HousingPage } from './index';

const SpecificHousing: React.FC = () => {
  const router = useRouter();
  const { roomIdString } = router.query;
  const roomId = parseInt(roomIdString as string);

  const routeToHousing = () => router.push('/housing');

  return (
    <>
      <HousingPage />

      <HouseProfile roomId={roomId} onExit={routeToHousing} />
    </>
  );
};

export default SpecificHousing;
