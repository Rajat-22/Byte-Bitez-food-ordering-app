import { useContext } from "react";
import Modal from "../UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "../UI/Error";
import Button from "../UI/Button";
import { currencyFormatter } from "../utils/formatCurrency";

const requestConfig = {};

export default function OrderHistory() {
  const userProgressCtx = useContext(UserProgressContext);
  const isOpen = userProgressCtx.progress === "orderHistory";

  const { data: orders, isLoading, error } = useHttp(
    isOpen ? `${import.meta.env.VITE_API_BASE_URL}/orders` : null,
    requestConfig,
    []
  );

  function handleClose() {
    userProgressCtx.hideOrderHistory();
  }

  let content;

  if (isLoading) {
    content = <p className="order-history-loading">Loading orders...</p>;
  } else if (error) {
    content = <Error title="Failed to load orders" message={error} />;
  } else if (!orders || orders.length === 0) {
    content = <p className="order-history-empty">No orders placed yet.</p>;
  } else {
    const sorted = [...orders].reverse();
    content = (
      <ul className="order-history-list">
        {sorted.map((order) => {
          const total = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          return (
            <li key={order.id} className="order-history-item">
              <div className="order-history-header">
                <span className="order-history-customer">
                  {order.customer.name}
                </span>
                <span className="order-history-total">
                  {currencyFormatter.format(total)}
                </span>
              </div>
              <p className="order-history-address">
                {order.customer.street}, {order.customer.city}{" "}
                {order.customer["postal-code"]}
              </p>
              <ul className="order-history-items">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} —{" "}
                    {currencyFormatter.format(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <Modal open={isOpen} onClose={handleClose} className="order-history-modal">
      <h2>Order History</h2>
      {content}
      <div className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
