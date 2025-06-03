import axios from "axios";

export const api = axios.create({
    baseURL: " http://localhost:5000"
});

// fetch food items-----
export const fetchFood = () => {
    return api.get("/api/food/list");
}

// export const fetchCart = () => {
//     return api.post("/api/cart/get")
// }

// add to cart----
// export const fetchAdd = (itemId) => {
//     return api.post("/api/cart/add",  itemId )
// }

// remove from cart-----
// export const fetchRemove = async (data, config) => {
//     return await api.post("/api/cart/remove", data, config);
// };


// payment API-----
// export const fetchPayment = (data,order) => {
//     return api.post("/api/order/verify", {data,order})
// }

// // fetch user-order data----
// export const fetchOrders = (order) => {
//     return api.post("/api/order/userorders", order)
// }
