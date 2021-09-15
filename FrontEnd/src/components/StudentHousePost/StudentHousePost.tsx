import React, { FunctionComponent } from 'react';
import { useStudentRoomData } from '@hooks';
import { Head } from '@basics';
import { Row } from 'react-bootstrap';
import styles from './StudentHousePost.module.scss';
import { StudentHouseProfile } from '@components';

interface StudentHousePostProps {
  roomId: number;
}

const StudentHousePost: FunctionComponent<StudentHousePostProps> = ({
  roomId,
}) => {
  const { data, error } = useStudentRoomData(roomId);
  if (error) {
    return <div>Error occurred!</div>; // TODO handle error in a different way
  }
  if (!data) {
    return (
      <>
        <Head title="Loading Place..." />
        <div>Loading...</div>
      </>
    );
  }
  return (
    <Row className={styles.wrapperRow}>
      <StudentHouseProfile {...data} />;
    </Row>
  );
};

export default StudentHousePost;
