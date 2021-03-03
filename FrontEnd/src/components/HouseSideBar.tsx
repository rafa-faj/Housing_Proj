import React from 'react';
import Button from 'react-bootstrap/Button';
import TV from './TV';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/auth';
import BookmarksList from './BookmarksList';
import { useContextualRouting } from 'next-use-contextual-routing';
import Link from 'next/Link';

type ButtonOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => any;
interface HouseSideBarProps {
  onLoginClick?: ButtonOnClick;
  onPostClick?: ButtonOnClick;
}

const HouseSideBar: React.FC<HouseSideBarProps> = ({
  onLoginClick,
  onPostClick,
}) => {
  const { makeContextualHref, returnHref } = useContextualRouting();
  const user = useSelector(selectUser);

  return (
    <div className="house-sidebar-container">
      <TV>
        {!user ? (
          <>
            <Button variant="secondary" onClick={onLoginClick}>
              <Link
                href={makeContextualHref()}
                as="/route-to-visit-contextually"
                shallow
              >
                Sign in to post
              </Link>
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

      <div className="house-sidebar-bookmarks-container">
        <BookmarksList />
      </div>
    </div>
  );
};

export default HouseSideBar;
