import React, { useState, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useUser, showLogin, setUser } from '@redux';
import ProfileModal from '../ProfileModal/ProfileModal';
import { navIcons } from '@icons';
import styles from './NavBar.module.scss';
import { logout } from '@apis';

const NavBar: FunctionComponent = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useUser();

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
                  href="/profile"
                  //onClick={() => setShowProfile(true)}
                >
                  Profile
                </Button>
                <Button
                  variant="no-show"
                  className={styles.navBtn}
                  onClick={() => {
                    logout();
                    dispatch(setUser(undefined)); // TODO should be with logout function
                  }}
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
