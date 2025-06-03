import React, { useContext } from 'react'
import "./Home.css"
import { ExploreMenu } from '../../components/UI/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/UI/FoodDisplay/FoodDisplay'
import Header from '../../components/layout/Header/Header'
import AppDownload from '../AppDownload/AppDownload'
import { StoreContext } from '../../context/StoreContext'

export const Home = () => {
  const {category, setCategory} = useContext(StoreContext);
  return (
    <div>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category} />
        <AppDownload/>
    </div>
  )
}
