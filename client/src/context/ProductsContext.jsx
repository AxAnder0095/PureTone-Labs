import { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api/api";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
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

    return (
        <ProductsContext.Provider value={{ products, setProducts, cart, setCart }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductsContext);
};