import React, { useState, FunctionComponent } from 'react';
import { Button, ImageDropdown, Link } from '@basics';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useUser, showLogin, setUser } from '@redux';
import ProfileModal from '../ProfileModal/ProfileModal';
import { landingIcons } from '@icons';
import styles from './NavBar.module.scss';
import { logout } from '@apis';
import { useRouter } from 'next/router';
import { Row } from 'react-bootstrap';

const NavBar: FunctionComponent = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useUser();
  const itemProps = [
    {
      href: '/profile',
      label: 'Profile',
    },
    {
      label: 'Logout',
      labelClassName: styles.logoutText,
      onClick: async () => {
        await logout();
        dispatch(setUser(undefined)); // TODO should be with logout function
      },
    },
  ];

  return (
    <>
      <ProfileModal show={showProfile} setShow={setShowProfile} />

      <Navbar sticky="top" className={`${styles.wrapper} p-0 m-0 mb-4`}>
        <div className={styles.container}>
          <div className="mr-auto">
            <a href="/">
              <landingIcons.logo className={styles.logo} />
            </a>
          </div>
          <Row className="align-items-center">
            <Link href="/" undecorated>
              <h5 className="mb-0">About</h5>
            </Link>
            {user ? (
              <ImageDropdown
                items={itemProps}
                profileIcon={`https://houseit.s3.us-east-2.amazonaws.com/${user?.profilePhoto}`}
                className="ml-4"
              />
            ) : (
              <Button
                size="secondary"
                variant="solid"
                onClick={() => dispatch(showLogin())}
              >
                Get Started
              </Button>
            )}
          </Row>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;
