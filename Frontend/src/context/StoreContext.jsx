/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";
// import { food_list } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, fetchFood } from "../api/fetchApi";
import { setCartItems, setFoodList } from "../features/ItemsSlice/ItemsSlice";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  // const [cartItems, setCartItems] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [category, setCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFoodItems, setSearchFoodItems] = useState(false);
  const [token, setToken] = useState("")
  // const [food_list, setFood_list] = useState([])

  const url = "http://localhost:5000";

  // const [searchFilterFood, setSearchFilterFood] = useState([])
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector((state) => state.foodItems.cartItems);
  const foodList = useSelector((state) => state.foodItems.foodList) || [];

  // const addToCart = (itemId) => {
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   } else {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   }
  // };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };

  // console.log(foodList);

  const filteredFoodList = useMemo(() => {
    if (!foodList.length) return [];

    const filteredData = category === "All"
      ? foodList
      : foodList.filter(item => item.category === category);
    return filteredData;
  }, [category, foodList]);

  const searchFood = useMemo(() => {
    if (!filteredFoodList.length) return [];
    if (!searchQuery) return filteredFoodList;

    const query = searchQuery.toLowerCase();
    return searchFoodItems
      ? filteredFoodList.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : "";
        const category = item.category ? item.category.toLowerCase() : "";
        return name.includes(query) || category.includes(query);
      })
      : filteredFoodList;
  }, [searchQuery, filteredFoodList, searchFoodItems]);

  const applySearchFood = location.pathname === "/search" ? searchFood : filteredFoodList;


  const fetchFoodList = async () => {
    try {
      const res = await fetchFood();
      dispatch(setFoodList(res.data.data))
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCartData = async (token) => {
    // console.log(token);

    const headers = { Authorization: `Bearer ${token}` };
    // console.log("Headers Sent:", headers)
    try {
      const res = await api.post("/api/cart/get", {}, { headers });
      dispatch(setCartItems(res.data.cartData));
    } catch (error) {
      console.log(error.res?.data || error.message);
    }
  }

  const loadData = async () => {
    await fetchFoodList();
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      await fetchCartData(storedToken);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const contextValue = {
    // food_list,
    foodList,
    cartItems,
    // setCartItems,
    // addToCart,
    // removeFromCart,
    // getTotalCartAmount,
    url,
    isAuthenticated,
    setIsAuthenticated,
    category, setCategory,
    searchQuery, setSearchQuery,
    applySearchFood,
    searchFoodItems, setSearchFoodItems,
    token, setToken,

    // handleSearchFormSubmit,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
