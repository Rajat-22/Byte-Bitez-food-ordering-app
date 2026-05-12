import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from '../UI/Error';

const requestConfig = {}

export default function Meals() {
  const {data: loadMeals, isLoading, error} = useHttp(`${import.meta.env.VITE_API_BASE_URL}/meals`, requestConfig, [])

  if(isLoading){
    return (
     <div className="loading-container">
        <div className="loading-spinner">🍳</div>
        <p className="loading-title">Your food is cooking...</p>
        <p className="loading-subtitle">Our chefs are working their magic! 👨‍🍳✨</p>
      </div>
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
