import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const [inCheckout, setInCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    const singleItem = {...item, amount: 1}
    cartCtx.addItem(singleItem);
  };

  const confirmHandler = () => setInCheckout(true);




  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const sendingData = async (data) => {
    const payLoad = {
      user: data,
      order: cartCtx.items
    }
    await fetch('https://react-6422c-default-rtdb.europe-west1.firebasedatabase.app/userData.json', {
      method: 'POST',
      body: JSON.stringify(payLoad)
    })
  }
  
  return (
    <Modal onClose={props.onClose}>
      {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {inCheckout && <Checkout onConfirmation={sendingData}/>}
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          CLose
        </button>
        {hasItems && <button className={classes.button} onClick={confirmHandler}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
