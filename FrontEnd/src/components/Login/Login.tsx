import React, { FunctionComponent } from 'react';
import { Modal } from '@basics';
import Button from 'react-bootstrap/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { selectShouldShowLogin, hideLogin, startNewUserFlow } from '@redux';
import { login } from '@apis';
import { miscIcons } from '@icons';
import { LOGIN_INFO_TOOLTIP } from '@constants';
import { useUser } from '@hooks';
import styles from './Login.module.scss';

const isOnline = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
): response is GoogleLoginResponse => {
  return 'profileObj' in response;
};

// https://developers.google.com/identity/sign-in/web/sign-in
const LoginUI: FunctionComponent = () => {
  const shouldShowLogin = useSelector(selectShouldShowLogin);
  const dispatch = useDispatch();
  const { mutate: mutateUser } = useUser();

  const responseGoogleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    try {
      if (isOnline(response)) {
        const { name, email } = response.profileObj;
        const { isNewUser } = await login(name, email);

        if (isNewUser) {
          dispatch(startNewUserFlow({ name, email }));
        } else {
          // a hard update to the user after a login to ensure it's updated
          mutateUser();
        }
      } else {
        console.log('User is offline');
        console.log(response);
      }
    } catch {
      // TODO eventually display error to user...
      console.log('Error logging in');
    }
  };

  return (
    <Modal
      open={shouldShowLogin}
      onClose={() => dispatch(hideLogin())}
      className={styles.wrapper}
    >
      <div>
        <Button variant="no-show" onClick={() => dispatch(hideLogin())}>
          <img className={styles.close} src="/close.svg" alt="Close" />
        </Button>
        <OverlayTrigger
          placement="bottom-end"
          overlay={<Tooltip id="tooltip">{LOGIN_INFO_TOOLTIP}</Tooltip>}
        >
          <div className={styles.whyText}>
            Why school account? <miscIcons.infoCircle />
          </div>
        </OverlayTrigger>
      </div>

      <img src="/login.svg" alt="LogIn" />
      <GoogleLogin
        className="g-auth"
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onSuccess={async (response) => {
          await responseGoogleSuccess(response);
          dispatch(hideLogin());
        }}
        onFailure={(response) => console.log(response)}
        // TODO: add login cookie to onSuccess using universal-cookie
        cookiePolicy="single_host_origin"
        icon={false}
      >
        {/* 
        isSignedIn={true} attribute will call onSuccess callback on load to keep the user signed in
         */}
        <img
          className={styles.loginButton}
          src="/loginButton.svg"
          alt="LogInButton"
        />
      </GoogleLogin>
    </Modal>
  );
};

const Login: FunctionComponent = () => {
  const { user } = useUser();

  // No need to render the login component if already logged in
  if (user) return null;

  return <LoginUI />;
};

export default Login;
