import './global.css';

import { useScrollToTop } from './hooks/useScrollToTop';

import Router from './routes/sections';
import ThemeProvider from './theme';



export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
