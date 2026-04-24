import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const ProductList = () => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Purificadoras de Aire",
      plants: [
        { name: "Snake Plant", image: "https://via.placeholder.com/150", cost: 15 },
        { name: "Spider Plant", image: "https://via.placeholder.com/150", cost: 12 }
      ]
    },
    {
      category: "Aromáticas",
      plants: [
        { name: "Lavender", image: "https://via.placeholder.com/150", cost: 20 },
        { name: "Mint", image: "https://via.placeholder.com/150", cost: 10 }
      ]
    },
    {
      category: "Bajo Mantenimiento",
      plants: [
        { name: "Pothos", image: "https://via.placeholder.com/150", cost: 18 },
        { name: "Aloe Vera", image: "https://via.placeholder.com/150", cost: 22 }
      ]
    }
  ];

  return (
    <div>
      <nav style={{display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#4CAF50', color: 'white'}}>
        <div>Paradise Nursery</div>
        <div>
          <a href="#" onClick={() => setShowCart(false)} style={{color: 'white', marginRight: '15px'}}>Plantas</a>
          <a href="#" onClick={() => setShowCart(true)} style={{color: 'white'}}>🛒 ({totalItems})</a>
        </div>
      </nav>

      {!showCart ? (
        <div style={{padding: '20px'}}>
          {plantsArray.map(cat => (
            <div key={cat.category}>
              <h2>{cat.category}</h2>
              <div style={{display: 'flex', gap: '20px'}}>
                {cat.plants.map(plant => (
                  <div key={plant.name} style={{border: '1px solid #ccc', padding: '10px'}}>
                    <h3>{plant.name}</h3>
                    <p>${plant.cost}</p>
                    <button 
                      disabled={cartItems.some(item => item.name === plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {cartItems.some(item => item.name === plant.name) ? 'Agregado' : 'Agregar al Carrito'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;