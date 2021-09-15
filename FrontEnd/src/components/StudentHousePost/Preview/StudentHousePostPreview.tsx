import React, { FunctionComponent, useEffect, useState } from 'react';
import { StickyBar, Alert, Button, Loading } from '@basics';
import { Col, Row } from 'react-bootstrap';
import { miscIcons } from '@icons';
import parentStyles from '../StudentHousePost.module.scss';
import styles from './StudentHousePostPreview.module.scss';
import { StudentHouseProfile } from '@components';
import { StudentHousePost } from '@models';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { showOverlay, hideOverlay } from '@redux';

interface StudentHousePostPreviewProps extends StudentHousePost {
  edit: () => void;
  post: () => Promise<any>;
}

const StudentHousePostPreview: FunctionComponent<StudentHousePostPreviewProps> = ({
  edit,
  post,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showOverlay());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading text="Getting your post ready..." />}
      <Row className={cn(parentStyles.wrapperRow, styles.previewBody)}>
        <StudentHouseProfile {...props} />
        <StickyBar>
          <Col xs={12} lg={10} className="p-md-0 order-1">
            <Alert
              title=""
              variant="info"
              text="Preview of your housing post!"
              button="Edit"
              onClick={() => {
                dispatch(hideOverlay());
                edit();
              }}
            ></Alert>
          </Col>
          <Col
            xs={12}
            lg={2}
            className="p-md-0 mb-2 mb-md-0 d-flex justify-content-end order-xs-1 order-lg-2"
          >
            <Button
              icon={{ icon: miscIcons.plus }}
              className={parentStyles.postButton}
              onClick={() => {
                setLoading(true);
                post()
                  .then((response) => {
                    setTimeout(function () {
                      console.log('Hello');
                    }, 3000);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
                dispatch(hideOverlay());
              }}
            >
              Post
            </Button>
          </Col>
        </StickyBar>
      </Row>
    </>
  );
};

export default StudentHousePostPreview;
