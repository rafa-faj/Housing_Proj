import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { HousePost } from '../../../models/PostModels';
import HouseProfile from '../../HouseProfile/HouseProfile';
import styles from './Bookmark.module.scss';
import classNames from 'classnames';

// change this to PathProps extends HousePost {} to include other props
export type PathProps = HousePost;

const Bookmark: React.FC<PathProps> = (props) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <HouseProfile show={show} onHide={() => setShow(false)} {...props} />

      <Button
        variant="no-show"
        className={styles.btnWrapper}
        onClick={() => setShow(true)}
      >
        <div className={styles.bookmark}>
          <div>
            <img // TODO change this to be a carousel (first need to update the carousel), also change this to not use props (use the swr hook), change how you use the src below
              src={`https://houseit.s3.us-east-2.amazonaws.com/${props.photos[0]}`}
              alt="First slide"
              className={styles.thumbnail}
            />
          </div>
          <div className={styles.info}>
            <Row>{props.leaserName}</Row>
            <Row>{props.leaserPhone}</Row>
            <Row>{props.leaserEmail}</Row>
          </div>
        </div>
      </Button>
    </>
  );
};

export default Bookmark;
