import React, { FunctionComponent } from 'react';
import { bookmarkIcons } from '@icons';
import { useUser } from '@redux';
import Bookmark from './Bookmark/Bookmark';
import styles from './BookmarkList.module.scss';
import { useRoomBookmarks } from '@hooks';

const BookmarkHeader: FunctionComponent = () => (
  <div className={styles.header}>
    <bookmarkIcons.bookmark className={styles.icon} />
    <span className={styles.title}>Bookmarks</span>
  </div>
);

const BookmarksList: FunctionComponent = () => {
  const { data: bookmarks, error } = useRoomBookmarks();

  if (error) return <div>Error Occured! Please reload the page.</div>;

  if (!bookmarks) return <div>loading...</div>;

  return (
    <div className={styles.listWrapper}>
      {bookmarks.length === 0 ? (
        <div className={styles.noneMessage}>
          Your bookmarked housings will appear here!
        </div>
      ) : (
        Object.values(bookmarks).map((roomId) => (
          <div key={roomId} className={styles.bookmarkWrapper}>
            <Bookmark roomId={roomId} />
          </div>
        ))
      )}
    </div>
  );
};

const NotSignedIn: FunctionComponent = () => (
  <div className={styles.noneMessage}>Sign in to save your bookmarks.</div>
);

const Controller: FunctionComponent = () => {
  const user = useUser();

  return (
    <div className={styles.bookmarkList}>
      <BookmarkHeader />

      <div className={styles.listWrapper}>
        {user ? <BookmarksList /> : <NotSignedIn />}
      </div>
    </div>
  );
};

export default Controller;
