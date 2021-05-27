import React, { FunctionComponent } from 'react';
import { Modal, Button } from '@basics';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  useUser,
  useShouldShowLogin,
  hideLogin,
  startNewUserFlow,
  setUser,
} from '@redux';
import { miscIcons } from '@icons';
import { LOGIN_INFO_TOOLTIP } from '@constants';
import styles from './Login.module.scss';
import { login } from '@apis';
import NewUserSetup from '@components/NewUserSetup'
import { useShowNewUserPopup } from '@redux'

const isOnline = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
): response is GoogleLoginResponse => 'profileObj' in response;

// https://developers.google.com/identity/sign-in/web/sign-in
const LoginUI: FunctionComponent = () => {
  const dispatch = useDispatch();
  const shouldShowLogin = useShouldShowLogin();

  const responseGoogleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (isOnline(response)) {
      const { profileObj: userInfo, tokenId } = response;
      const { name, email } = userInfo;

      const result = await login(tokenId);

      if (result.isNewUser) {
        dispatch(startNewUserFlow({ name, email }));
      } else {
        dispatch(setUser(result));
      }
    } else {
      console.log('User is offline');
      console.log(response);
    }
  };

  return (
    <Modal
      open={shouldShowLogin}
      onClose={() => dispatch(hideLogin())}
      className={styles.wrapper}
    >
      <div>
        <Button variant="wrapper" onClick={() => dispatch(hideLogin())}>
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
  const user = useUser();
  const showNewUserPopup = useShowNewUserPopup();


  // if user is logged in, there's no need to render the login component
  if (user) return null;

  return (<>
    <LoginUI />
    {showNewUserPopup !== undefined && ( // only render the modal when user info exists, to initialize the wizard form with the user info
      <NewUserSetup
        show={showNewUserPopup !== undefined}
        name={showNewUserPopup?.name}
        email={showNewUserPopup?.email}
      />
    )}
  </>)
};

export default Login;
