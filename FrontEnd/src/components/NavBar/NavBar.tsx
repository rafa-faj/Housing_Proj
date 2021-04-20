import React, { useState, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { showLogin } from '@redux';
import ProfileModal from '@components/ProfileModal';
import { navIcons } from '@icons';
import { useUser } from '@hooks';
import { logout } from '@apis';
import styles from './NavBar.module.scss';

const NavBar: FunctionComponent = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // TODO eventually display error to user...
      console.log('Error logging out.');
    }
  };

  return (
    <>
      <ProfileModal show={showProfile} setShow={setShowProfile} />

      <Navbar sticky="top" className={`${styles.wrapper} p-0 m-0 mb-4`}>
        <div className={styles.container}>
          <div className="mr-auto">
            <a href="/">
              <navIcons.logo className={styles.logo} />
            </a>
          </div>

          <div>
            {!user ? (
              <Button
                variant="no-show"
                className={styles.navBtn}
                onClick={() => dispatch(showLogin())}
              >
                Sign In
              </Button>
            ) : (
              <>
                <Button
                  variant="no-show"
                  className={styles.navBtn}
                  onClick={() => setShowProfile(true)}
                >
                  Profile
                </Button>
                <Button
                  variant="no-show"
                  className={styles.navBtn}
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
