import Header from "./components/Header";
import Meals from "./components/Meals";
import FloatingFoodIcons from "./UI/FloatingFoodIcons";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import CheckOut from "./components/Checkout";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
         <FloatingFoodIcons />
      <div className="app-content">
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
