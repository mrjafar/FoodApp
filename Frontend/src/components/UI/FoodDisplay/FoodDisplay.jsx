/* eslint-disable react/prop-types */
import { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {

  const { applySearchFood } = useContext(StoreContext);

  return (
    <div className='food-display' id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {applySearchFood && applySearchFood.length > 0 ? (
          applySearchFood.map((curItem, index) => (
            <FoodItem key={index} curItem={curItem} />
          ))
        ) : (
          <p className='no-food'>**No Food items found matching your search.*** <br />😭😭😭</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
