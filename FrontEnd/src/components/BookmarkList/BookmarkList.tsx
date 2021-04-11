import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarkIcons } from '@icons';
import {
  selectUser,
  getHousingFavorites,
  selectHousingFavorites,
} from '@redux';
import Bookmark from './Bookmark/Bookmark';
import styles from './BookmarkList.module.scss';

const BookmarksList: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectHousingFavorites);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getHousingFavorites());
  }, [dispatch]);

  return (
    <div className={styles.bookmarkList}>
      <div className={styles.header}>
        <bookmarkIcons.bookmark className={styles.icon} />
        <span className={styles.title}>Bookmarks</span>
      </div>

      <div className={styles.listWrapper}>
        {favorites &&
          Object.values(favorites).map((favorite) => (
            <div key={favorite.roomId} className={styles.bookmarkWrapper}>
              <Bookmark {...favorite} />
            </div>
          ))}

        {(!favorites || (favorites && Object.keys(favorites).length === 0)) && (
          <div className={styles.noneMessage}>
            {user
              ? 'Your bookmarked housings will appear here!'
              : 'Sign in to save your bookmarks permanently.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksList;
