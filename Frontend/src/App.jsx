import React, { useContext, useEffect } from "react";
import { createBrowserRouter, Route, RouterProvider, Routes, } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Contact from "./pages/Contact/Contact";
import { PlaceOrder } from "./pages/PlaceOrder/PlaceOrder";
import Cart from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import LoginPopup from "./components/UI/LoginPopUP/LoginPopup";
import { StoreContext } from "./context/StoreContext";
import { Profile } from "./pages/Profile/Profile";
import AppDownload from "./pages/AppDownload/AppDownload";
import { Search } from "./pages/Search/Search";
import { Verify } from "./pages/Verify/Verify";
import { MyOrders } from "./pages/MyOrders/MyOrders";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AppLayout />,
//     children: [
//       { path: "/", element: <Home />, },
//       { path: "/app-download", element: <AppDownload /> },
//       { path: "cart", element: <Cart />, },
//       { path: "search", element: <Search /> },
//       { path: "order", element: <PlaceOrder />, },
//       { path: "contact", element: <Contact />,/* action: contactData*/ },
//       { path: "profile", element: <Profile /> }
//     ],
//   },
// ]);

const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="/app-download" element={<AppDownload />} />
      <Route path="cart" element={<Cart />} />
      <Route path="search" element={<Search />} />
      <Route path="order" element={<PlaceOrder />} />
      <Route path="verify" element={<Verify />} />
      <Route path="my-orders" element={<MyOrders />} />
      <Route path="contact" element={<Contact />} />
      <Route path="profile" element={<Profile />} />
    </Route>
  </Routes>
);


const App = () => {
  return (
    <AllRoutes />
  );
};

export default App;
