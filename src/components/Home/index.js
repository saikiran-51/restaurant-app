import {useEffect, useState, useContext} from 'react'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

export default function Home() {
  const [restaurantName, setRestaurantName] = useState('')
  const [data, setData] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [dishCount, setDishCount] = useState({})
  const {addCartItem} = useContext(CartContext)

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const jsonData = await response.json()
      setRestaurantName(jsonData[0].restaurant_name)
      setData(jsonData[0].table_menu_list)
    }
    getData()
  }, [])

  const increment = id => {
    setDishCount(prev => ({...prev, [id]: (prev[id] || 0) + 1}))
  }

  const decrement = id => {
    setDishCount(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }))
  }

  if (data.length === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="app">
      <Header restaurantName={restaurantName} />

      {/* Tabs */}
      <div className="tabs">
        {data.map((item, index) => (
          <button
            type="button"
            key={item.menu_category_id}
            onClick={() => setActiveTab(index)}
            className={activeTab === index ? 'active-tab' : 'tab'}
          >
            {item.menu_category}
          </button>
        ))}
      </div>

      {/* Dishes */}
      <div>
        {data[activeTab].category_dishes.map(dish => {
          const count = dishCount[dish.dish_id] || 0
          return (
            <div key={dish.dish_id} className="dish">
              <div className="dish-left">
                <div className={dish.dish_Type === 2 ? 'veg' : 'non-veg'}>
                  <div className="dot" />
                </div>
                <h4>{dish.dish_name}</h4>
                <p className="dish-price">
                  {dish.dish_currency} {dish.dish_price}
                </p>
                <p className="desc">{dish.dish_description}</p>

                {dish.dish_Availability ? (
                  <>
                    <div className="counter">
                      <button
                        type="button"
                        onClick={() => decrement(dish.dish_id)}
                      >
                        -
                      </button>
                      <p className="dish-count">{count}</p>
                      <button
                        type="button"
                        onClick={() => increment(dish.dish_id)}
                      >
                        +
                      </button>
                    </div>
                    {count > 0 && (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={() => addCartItem({...dish, quantity: count})}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="counter">
                      <button
                        type="button"
                        onClick={() => decrement(dish.dish_id)}
                      >
                        -
                      </button>
                      <p className="dish-count">{count}</p>
                      <button
                        type="button"
                        onClick={() => increment(dish.dish_id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="not-available">Not available</p>
                  </>
                )}

                {dish.addonCat.length > 0 && (
                  <p className="addon">Customizations available</p>
                )}
              </div>

              <div className="dish-right">
                <p className="dish-calories">{dish.dish_calories} calories</p>
                <img src={dish.dish_image} alt={dish.dish_name} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
