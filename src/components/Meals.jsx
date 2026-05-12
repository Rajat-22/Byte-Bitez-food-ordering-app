import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from '../UI/Error';

const requestConfig = {}

function SkeletonCard() {
  return (
    <li className="skeleton-card">
      <div className="skeleton-block skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-block skeleton-title" />
        <div className="skeleton-block skeleton-price" />
        <div className="skeleton-block skeleton-desc-line" />
        <div className="skeleton-block skeleton-desc-line" />
        <div className="skeleton-block skeleton-button" />
      </div>
    </li>
  );
}

export default function Meals() {
  const {data: loadMeals, isLoading, error} = useHttp(`${import.meta.env.VITE_API_BASE_URL}/meals`, requestConfig, [])

  if(isLoading){
    return (
      <ul id="meals">
        {Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)}
      </ul>
    )
  }

  if(error){
    return <Error title="Failed to fetch meals" message={error} />
  }

    return <ul id="meals">
        {
            loadMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal}></MealItem>
            ))
        }

    </ul>
}
