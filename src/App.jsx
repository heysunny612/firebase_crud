import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import SignUp from './pages/SignUp';

export default function App() {
  const { pathname } = useLocation();
  const isSignUpPage = pathname === '/signup';

  return (
    <main className='main__container'>
      <section className='content__container'>
        <Outlet />
      </section>
      <section className='side__container'>
        <SideBar />
      </section>
      {isSignUpPage ? <SignUp /> : null}
    </main>
  );
}
