import { useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import SignUp from './pages/SignUp';

export default function Home() {
  const { pathname } = useLocation();
  const isSignUpPage = pathname === '/signup';

  return (
    <main className='main__container'>
      <section className='content__container'>1</section>
      <Auth />
      {isSignUpPage ? <SignUp /> : null}
    </main>
  );
}
