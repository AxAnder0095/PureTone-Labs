import { Hero } from "../components/Hero.jsx";
import { useProducts } from '../context/ProductsContext.jsx';


export const Shop = () => {
    const { cart, setCart } = useProducts();

    const handleAddToCart = () => {
        const newCart = [...cart,
        {
            brand: "PureTone Aether X1",
            description: "Premium noise-cancelling headphones engineered for deep bass and crystal-clear highs.",
            price: 329.99,
            stock: 18,
            specifications: {
                bluetooth: true,
                noiseCancellation: true,
                batteryLife: "32 hours",
                color: [
                    "Midnight Black",
                    "Arctic White"
                ]
            }
        }
        ];
        setCart(newCart);
    }
    return (
        <div className='Shop'>
            <Hero />
            <h1>Shop</h1>
            <h2>Browse our collection of high-quality audio products</h2>
            <p>Explore our range of headphones, speakers, and audio accessories designed to deliver pure, <br /> immersive sound. Whether you're an audiophile or just looking for great sound quality, PureTone Labs has something for everyone.</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
};