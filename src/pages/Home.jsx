import { useQuery } from 'react-query';
import { readSweet } from '../api/firebase';
import '../styles/pages/home.scss';
import { useUserContext } from '../context/UserContext';

export default function Home() {
  const { user } = useUserContext();
  const {
    isLoading,
    error,
    data: sweets,
  } = useQuery('sweets', () => readSweet());
  return (
    <div>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>에러입니다</p>}
      {sweets && (
        <ul className='sweet__list'>
          {sweets.map((sweet) => (
            <li key={sweet.id}>
              <div className='sweet_img'>
                <img src={sweet?.user?.url} alt='' width='100%' />
              </div>
              <div className='sweet_content'>
                <div className='sweet_info'>
                  {sweet?.user?.name}
                  <span>
                    {sweet?.user?.email} {sweet.createdAt}
                  </span>
                </div>
                <div className='sweet_text'> {sweet.text}</div>
                {user && user.uid === sweet.user.id && (
                  <div className='sweet_menu'>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
