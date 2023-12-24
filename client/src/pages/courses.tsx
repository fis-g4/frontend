import { Helmet } from 'react-helmet-async';
import UserList from '../components/user-list/user-list';


export default function CoursesPage() {
  return (
    <>
      <Helmet>
        <title> Courses | FIS G4 </title>
      </Helmet>
      <div>Courses Page</div>
    </>
  );
}
