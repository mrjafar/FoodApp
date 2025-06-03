import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
})

export const postData = (post) => {
    return api.post('/api/food/add', post)
}

// get data----
export const getData = () => {
    return api.get('/api/food/list')
}

export const removeData = (id) => {
    return api.post(`/api/food/remove`,{id})
}

// fetch user's orders-----
export const fetchOrders = () => {
    return api.get("/api/order/list")
}

// fetch order status----
export const orderStatus = (status) => {
    return api.post("/api/order/status", status)
}