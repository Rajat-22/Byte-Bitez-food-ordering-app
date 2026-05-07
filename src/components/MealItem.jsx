import { useContext, useState } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../utils/formatCurrency";
import CartContext from "../store/CartContext";
import { useToast } from "../store/ToastContext";

export default function MealItem({ meal }) {
  const cartctx = useContext(CartContext);
  const { showToast } = useToast();
  const [expanded, setExpanded] = useState(false);

  function handleMealToCart() {
    cartctx.addItem(meal);
    showToast(`🛒 ${meal.name} added to cart!`);
  }

  function toggleDescription() {
    setExpanded((prev) => !prev);
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
          <p
            className={`meal-item-description ${expanded ? "meal-item-description--expanded" : ""}`}
          >
            {meal.description}
          </p>
          <button
            className="meal-item-description-toggle"
            onClick={toggleDescription}
            aria-expanded={expanded}
          >
            {expanded ? "Show less ▲" : "Show more ▼"}
          </button>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
