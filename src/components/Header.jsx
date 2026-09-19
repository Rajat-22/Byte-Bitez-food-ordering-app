import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../store/CartContext";
import  UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart(){
    userProgressCtx.showCart()
  }
  
  function handleShowOrderHistory(){
    userProgressCtx.showOrderHistory()
  }
  
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant img"></img>
        <h1>The-Byte-Bitez</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowOrderHistory}>
          Orders
        </Button>
        <Button textOnly onClick={handleShowCart}>
          Cart {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
        </Button>
      </nav>
    </header>
  );
}
