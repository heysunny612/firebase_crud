import { useQuery, useQueryClient} from 'react-query';
import { readSweet } from '../api/firebase';
import '../styles/pages/home.scss';
import Sweet from '../components/Sweet';
import AddSweet from '../components/AddSweet';
export default function Home() { 
  const queryClient = useQueryClient();
  const { isLoading, error, data: sweets } = useQuery('sweets', readSweet, {
    onSuccess: (data) => {
      const updatedSweets = data.map((sweet) => {
        if (sweet.imgURL && !sweet.imgURL.includes('https://')) {
          return { ...sweet, imgURL: null }; // 이미지 URL이 유효하지 않으면 imgURL을 null로 업데이트
        }
        return sweet;
      });

      queryClient.setQueryData('sweets', updatedSweets); // 'sweets' 쿼리의 데이터를 업데이트
    },
  });

  return (
    <>      
      <AddSweet/>
      {isLoading && <p>로딩중입니다</p>}
      {error && <p>에러입니다</p>}
      {sweets && (
        <ul className='sweet__list'>
          {sweets.map((sweet) => (
            <Sweet key={sweet.id} sweet={sweet}  />
          ))}
        </ul>
      )}
    </>
  );
}
