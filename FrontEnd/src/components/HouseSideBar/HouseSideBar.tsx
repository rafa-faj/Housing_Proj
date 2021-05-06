import React, { FunctionComponent } from 'react';
import Button from 'react-bootstrap/Button';
import TV from '../TV/TV';
import { useUser } from '@redux';
import BookmarkList from '../BookmarkList';
import styles from './HouseSideBar.module.scss';

type ButtonOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => any;
interface HouseSideBarProps {
  onLoginClick?: ButtonOnClick;
  onPostClick?: ButtonOnClick;
}

const HouseSideBar: FunctionComponent<HouseSideBarProps> = ({
  onLoginClick,
  onPostClick,
}) => {
  const user = useUser();

  return (
    <div className={styles.container}>
      <TV>
        {!user ? (
          <>
            <Button variant="secondary" onClick={onLoginClick}>
              Sign in to post
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={onPostClick}>
              Post here
            </Button>
          </>
        )}
      </TV>

      <div className={styles.bookmarksContainer}>
        <BookmarkList />
      </div>
    </div>
  );
};

export default HouseSideBar;
