import React, { createContext, useState, FunctionComponent } from 'react';

const LoginUI: FunctionComponent = () => {
  const { show } = useLogin();

  // return modal with show from login context
  return <div>login todo</div>;
};

// This will be a local store to hold whether or not the user is logged in.
// If they are, it will hold their name, email, etc., else it will be null
const LoginContext = createContext(null);
export const Login: FunctionComponent = ({ children }) => {
  const [show, setShow] = useState(null);

  return (
    <>
      <LoginUI />

      <LoginContext.Provider value={{ show, setShow }}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

const useLogin = () => {
  return React.useContext(LoginContext);
};

export default useLogin;
