import React, { FunctionComponent } from 'react';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { HousePost } from '@models';
import styles from './Bookmark.module.scss';
import { useRoomData } from '@hooks';
import { useRouter } from 'next/router';

type BookmarkProps = Pick<HousePost, 'roomId'>;

const Bookmark: FunctionComponent<BookmarkProps> = ({ roomId }) => {
  const { data, error } = useRoomData(roomId);
  const router = useRouter();

  if (error) {
    return <div>Error occurred! Please reload the page.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const routeToHouseProfile = () => {
    router.push(`/housing/${roomId}`, undefined, { shallow: true });
  };

  return (
    <>
      <Button
        variant="no-show"
        className={styles.btnWrapper}
        onClick={routeToHouseProfile}
      >
        <div className={styles.bookmark}>
          <div>
            <img // TODO change this to be a carousel (first need to update the carousel), also change this to not use props (use the swr hook), change how you use the src below
              src={data.photos[0]}
              alt="First slide"
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.info}>
            <Row>{data.leaserName}</Row>
            <Row>{data.leaserPhone}</Row>
            <Row>{data.leaserEmail}</Row>
          </div>
        </div>
      </Button>
    </>
  );
};

export default Bookmark;
