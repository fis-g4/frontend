import './global.css';
import { useState } from 'react';

import { AuthContext } from './contexts/authContext';
import { AuthUserContext } from './hooks/useAuth';
import { useScrollToTop } from './hooks/useScrollToTop';

import Router from './routes/router';
import ThemeProvider from './theme';


export default function App() {
  useScrollToTop();

  const [authUser, setAuthUser] = useState<AuthUserContext>({ isAuthenticated: false, user: null, token: "", isLoading: true });

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <Router />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
