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
import { FailurePopUp } from '@components';
import { useRouter } from 'next/router';

interface StudentHousePostPreviewProps extends StudentHousePost {
  edit: () => void;
  onSuccess: () => void;
  post: () => Promise<any>;
}

const StudentHousePostPreview: FunctionComponent<StudentHousePostPreviewProps> = ({
  edit,
  post,
  onSuccess,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showOverlay());
  }, [dispatch]);

  const postFlow = async () => {
    setLoading(true);
    setShowFailure(false);
    try {
      await post();
      setTimeout(() => {
        onSuccess();
        router.push('/housing');
      }, 30);
    } catch (err) {
      setShowFailure(true);
    }
    setLoading(false);
    dispatch(hideOverlay());
  };
  return (
    <>
      <FailurePopUp
        open={showFailure}
        onClose={() => setShowFailure(false)}
        retry={postFlow}
      />
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
              onClick={postFlow}
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
