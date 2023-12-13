import './global.css';

import { useScrollToTop } from './hooks/useScrollToTop';

import Router from './routes/router';
import ThemeProvider from './theme';



export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
