import {useContext} from 'react'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

export default function Cart() {
  const {
    cartList,
    removeAllCartItems,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)

  return (
    <div className="cart-page">
      {/* Header */}
      <Header restaurantName="UNI Resto Cafe" />

      {/* Cart Content */}
      <div className="cart-content">
        {cartList.length === 0 ? (
          <div className="empty-cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty cart"
              className="empty-cart-img"
            />
            <p>Your cart is empty!</p>
          </div>
        ) : (
          <>
            <div className="cart-header-row">
              <h2>My Cart</h2>
              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>

            {cartList.map(item => (
              <div key={item.dish_id} className="cart-item">
                <img
                  src={item.dish_image}
                  alt={item.dish_name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h4>{item.dish_name}</h4>
                  <p className="cart-item-price">
                    {item.dish_currency}{' '}
                    {(item.dish_price * item.quantity).toFixed(2)}
                  </p>
                  <div className="counter">
                    <button
                      type="button"
                      onClick={() => decrementCartItemQuantity(item.dish_id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementCartItemQuantity(item.dish_id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeCartItem(item.dish_id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-total">
              <p>
                Total:{' '}
                <strong>
                  SAR{' '}
                  {cartList
                    .reduce(
                      (acc, item) => acc + item.dish_price * item.quantity,
                      0,
                    )
                    .toFixed(2)}
                </strong>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
