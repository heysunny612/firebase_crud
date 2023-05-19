import styles from './Nav.module.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../api/firebase';

export default function Nav() {
  const { setUser } = useAuthContext();
  const handleLogout = async () => {
    logout().then(setUser);
  };
  return (
    <nav>
      <Link to='/'>홈</Link>
      <Link to='/profile'>프로필</Link>
      <Link to='/editProfile'>수정</Link>
      <button onClick={handleLogout}>로그아웃</button>
    </nav>
  );
}
