import Header from "./components/Header";
import Meals from "./components/Meals";
import FloatingFoodIcons from "./UI/FloatingFoodIcons";
import Cart from "./components/Cart";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { ToastContextProvider } from "./store/ToastContext";
import CheckOut from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import Toast from "./UI/Toast";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <ToastContextProvider>
          <FloatingFoodIcons />
          <div className="app-content">
            <Header />
            <Meals />
            <Cart />
            <CheckOut />
            <OrderHistory />
          </div>
          <Toast />
        </ToastContextProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
