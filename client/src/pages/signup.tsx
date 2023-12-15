import { Helmet } from 'react-helmet-async';
import SignupView from '../components/signup/signup';


export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Signup | FIS G4 </title>
      </Helmet>

      <SignupView />
    </>
  );
}
