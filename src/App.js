import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

export default function App() {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => setCartList([])

  const addCartItem = dish => {
    const existingItem = cartList.find(item => item.dish_id === dish.dish_id)
    if (existingItem) {
      setCartList(prev =>
        prev.map(item =>
          item.dish_id === dish.dish_id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    } else {
      setCartList(prev => [...prev, {...dish, quantity: 1}])
    }
  }

  const removeCartItem = dishId =>
    setCartList(prev => prev.filter(item => item.dish_id !== dishId))

  const incrementCartItemQuantity = dishId =>
    setCartList(prev =>
      prev.map(item =>
        item.dish_id === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )

  const decrementCartItemQuantity = dishId => {
    const item = cartList.find(i => i.dish_id === dishId)
    if (item.quantity === 1) {
      removeCartItem(dishId)
    } else {
      setCartList(prev =>
        prev.map(i =>
          i.dish_id === dishId ? {...i, quantity: i.quantity - 1} : i,
        ),
      )
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}
