import React from 'react';
import Modal from './basics/Modal/Modal';
import Button from 'react-bootstrap/Button';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import {
  selectUser,
  login,
  selectShouldShowLogin,
  hideLogin,
} from '../redux/slices/auth';
import { miscIcons } from '../assets/icons/all';
import { LOGIN_INFO_TOOLTIP } from '../constants/messages';

const isOnline = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
): response is GoogleLoginResponse => {
  return 'profileObj' in response;
};

const LoginUI: React.FC = () => {
  const shouldShowLogin = useSelector(selectShouldShowLogin);
  const dispatch = useDispatch();

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (isOnline(response)) {
      const profile = response.profileObj;
      dispatch(login(profile.name, profile.email));
    } else {
      console.log('User is offline');
      console.log(response);
    }
  };

  return (
    <Modal
      open={shouldShowLogin}
      onClose={() => dispatch(hideLogin())}
      className="login-modal-wrapper"
    >
      <div>
        <Button variant="no-show" onClick={() => dispatch(hideLogin())}>
          <img className="pl-2" src="/close.svg" alt="Close" />
        </Button>
        <OverlayTrigger
          placement="bottom-end"
          overlay={<Tooltip id="tooltip">{LOGIN_INFO_TOOLTIP}</Tooltip>}
        >
          <div className="float-right pr-2 pt-1">
            <span className="login-why-text">Why school account? </span>
            <miscIcons.infoCircle />
          </div>
        </OverlayTrigger>
      </div>

      <img src="/login.svg" alt="LogIn" />
      <GoogleLogin
        className="g-auth"
        clientId="778916194800-977823s60p7mtu1sj72ru0922p2pqh6m.apps.googleusercontent.com"
        onSuccess={(response) => {
          responseGoogleSuccess(response);
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
        <img className="d-block" src="/loginButton.svg" alt="LogInButton" />
      </GoogleLogin>
    </Modal>
  );
};

// https://developers.google.com/identity/sign-in/web/sign-in
const Login: React.FC = () => {
  const user = useSelector(selectUser);

  if (user) return <div />;

  return <LoginUI />;
};

export default Login;
