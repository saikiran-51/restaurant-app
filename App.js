// App.js
import {useEffect, useState} from 'react'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      setData(data[0].table_menu_list)
    }

    getData()
  }, [])

  const addItem = id => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const removeItem = id => {
    setCart(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }))
  }

  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0)

  if (data.length === 0) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h2>UNI Resto Cafe</h2>
        <div className="cart">
          <p>My Orders 🛒</p>
          <span className="badge">{totalCount}</span>
        </div>
      </div>

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
        {data[activeTab].category_dishes.map(dish => (
          <div key={dish.dish_id} className="dish">
            {/* Left */}
            <div className="dish-left">
              <div className={dish.dish_Type === 2 ? 'veg' : 'non-veg'}>
                <div className="dot">.</div>
              </div>

              <h4>{dish.dish_name}</h4>
              <p>
                {dish.dish_currency} {dish.dish_price}
              </p>
              <p className="desc">{dish.dish_description}</p>

              {dish.dish_Availability ? (
                <div className="counter">
                  <button
                    type="button"
                    onClick={() => removeItem(dish.dish_id)}
                  >
                    -
                  </button>
                  <span>{cart[dish.dish_id] || 0}</span>
                  <button type="button" onClick={() => addItem(dish.dish_id)}>
                    +
                  </button>
                </div>
              ) : (
                <p className="not-available">Not available</p>
              )}

              {dish.addonCat.length > 0 && (
                <p className="addon">Customizations available</p>
              )}
            </div>

            {/* Right */}
            <div className="dish-right">
              <p className="calories">{dish.dish_calories} calories</p>
              <img src={dish.dish_image} alt={dish.dish_name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
