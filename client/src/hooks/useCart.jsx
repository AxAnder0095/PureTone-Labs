import { useEffect, useState } from "react";

export const useCart = () => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([]);

    return {
        cart,
        setCart,
        cartCount,
        setCartCount
    };
};





// useEffect(() => {
//         const storedCart = localStorage.getItem("cart");
//         if (storedCart) {
//             setCart(JSON.parse(storedCart));
//         }
//     }, []);