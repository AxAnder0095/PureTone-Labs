import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api/api";

const ProductsContext = createContext();
const CART_STORAGE_KEY = "puretone_cart";

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error reading cart from localStorage:", error);
            return [];
        }
    });
    
    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            // console.log('%cFetched products', 'color: red; font-weight: bold;');
            // console.table(data.products);
            setProducts(data.products ?? []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [cart]);

    return (
        <ProductsContext.Provider value={{ products, setProducts, cart, setCart }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductsContext);
};