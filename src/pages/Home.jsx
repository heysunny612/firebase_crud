import { useQuery} from 'react-query';
import { readSweet } from '../api/firebase';
import '../styles/pages/home.scss';
import Sweet from '../components/Sweet';
import AddSweet from '../components/AddSweet';
export default function Home() { 
  const { isLoading, error, data: sweets } = useQuery('sweets', readSweet);
  const sortedSweets = sweets && sweets.sort((a, b) => b.createdAt - a.createdAt);
  return (
    <> 
      <h2 className='common_h2'>HOME</h2>  
      <AddSweet/>
      {isLoading && <p className='isLoading'>로딩중입니다</p>}
      {error && <p>에러입니다</p>}
      {sweets && (
        <ul className='sweet__list'>
          {sortedSweets.map((sweet) => (
            <Sweet key={sweet.id} sweet={sweet}  />
          ))}
        </ul>
      )}
    </>
  );
}


