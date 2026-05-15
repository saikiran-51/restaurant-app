import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <nav className="header-container">
            <Link to="/" className="link-item">
              <h1 className="website-logo">{restaurantName}</h1>
            </Link>

            <div className="header-right">
              <p>My Orders</p>
              <Link to="/cart">
                <button
                  type="button"
                  data-testid="cart"
                  className="cart-button"
                >
                  Cart {cartList.reduce((acc, item) => acc + item.quantity, 0)}
                </button>
              </Link>

              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
