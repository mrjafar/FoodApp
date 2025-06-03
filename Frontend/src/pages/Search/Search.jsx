import React, { useContext, useState } from 'react'
import "./Search.css";
import FoodDisplay from '../../components/UI/FoodDisplay/FoodDisplay';
import { StoreContext } from '../../context/StoreContext';

export const Search = () => {
    const { category, searchFoodItems } = useContext(StoreContext);
    return (
        <div>
            <FoodDisplay category={category} />
        </div>
    )
}
