import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../utils/formatCurrency";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartctx = useContext(CartContext);
  
  function handleMealToCart() {
    cartctx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
       <img src={`${import.meta.env.VITE_API_BASE_URL}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
