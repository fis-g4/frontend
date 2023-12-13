import { Helmet } from 'react-helmet-async';
import LoginView from '../components/login/login';


export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | FIS G4 </title>
      </Helmet>

      <LoginView />
    </>
  );
}
