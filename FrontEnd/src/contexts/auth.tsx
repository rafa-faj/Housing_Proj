import React, { createContext, useState, FunctionComponent } from 'react';

// This will be a local store to hold whether or not the user is logged in.
// If they are, it will hold their name, email, etc., else it will be undefined
interface User {
  name: string;
}

interface AuthActions {
  setUser: (user: User) => any;
}

type AuthContext = {
  user?: User;
} & AuthActions;

const initialAuth = {};

const AuthContext = createContext<AuthContext>({
  user: undefined,
  setUser: (user: User) => {},
}); // TODO add typescript...
export const Auth: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined); // TODO default it correctly...

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Just use this function in your component to get access to user.
// The return type is the user (user info or null)
export default function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}
