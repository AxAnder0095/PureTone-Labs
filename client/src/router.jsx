import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Shop } from "./pages/Shop.jsx";
import { About } from "./pages/About.jsx";
import { OrderSuccess } from "./pages/OrderSuccess.jsx";

export const router = createBrowserRouter([
    {path: "/", element: <App />},
    {path: "/cart", element: <Cart />},
    {path: "/shop", element: <Shop />},
    {path: "/about", element: <About />},
    {path: "/order-success", element: <OrderSuccess />},
])

