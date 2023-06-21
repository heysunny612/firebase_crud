import { useLocation } from 'react-router-dom';
import Auth from '../components/Auth';
import SignUp from './SignUp';
import { useUserContext } from '../context/UserContext';

export default function Home() {
  const { pathname } = useLocation();
  const isSignUpPage = pathname === '/signup';
  const { user } = useUserContext();

  return (
    <main className='main__container'>
      <section className='content__container'>1</section>
      <Auth user={user} />
      {isSignUpPage ? <SignUp /> : null}
    </main>
  );
}
