import { Helmet } from 'react-helmet-async';
import ResponsiveAppBar from '../components/landing-heder/landing-header';
// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> Welcome to FIS G4! </title>
      </Helmet>

      <ResponsiveAppBar />

      <div> Landing Page </div>
    </>
  );
}
