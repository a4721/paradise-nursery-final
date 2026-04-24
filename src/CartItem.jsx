import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.cost * item.quantity), 0);
  };

  return (
    <div style={{padding: '20px'}}>
      <h2>Total: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div key={item.name} style={{borderBottom: '1px solid #eee', padding: '10px'}}>
          <span>{item.name} - ${item.cost}</span>
          <div>
            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))} disabled={item.quantity <= 1}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
            <button onClick={() => dispatch(removeItem(item.name))}>Eliminar</button>
          </div>
        </div>
      ))}
      <button onClick={onContinueShopping}>Continuar Comprando</button>
      <button onClick={() => alert('Próximamente')}>Pagar</button>
    </div>
  );
};

export default CartItem;