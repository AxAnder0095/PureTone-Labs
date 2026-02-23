import { useProducts } from '../context/ProductsContext.jsx';
import { Navbar } from '../components/Navbar.jsx';
import "../styles/Cart.scss"

export const Cart = () => {
    const { cart, setCart } = useProducts();

    const cartItems = () => {
        const count = cart.length;

        if (count === 0) {
            return <h2>Your Cart</h2>;
        };

        return <h2>{count} {count === 1 ? "item" : "items"}</h2>;
    };

    return (
        <div className='Cart'>
            <section className='cart-section'>
                <article className='cart-nav'>
                    <Navbar />
                </article>
                <article className='cart-content'>
                    <div className='cart-items'>
                        <div className='cart-items-header'>
                            <h2>Shopping Bag</h2>
                            {cartItems()}
                        </div>
                        <button onClick={() => setCart([])}>Empty Cart</button>
                        {cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index}>
                                        <h2>{item.brand}</h2>
                                        <p>{item.description}</p>
                                        <p>Price: ${item.price}</p>
                                        <p>Stock: {item.stock}</p>
                                        <p>Specifications:</p>
                                        <ul>
                                            <li>Bluetooth: {item.specifications.bluetooth ? "Yes" : "No"}</li>
                                            <li>Noise Cancellation: {item.specifications.noiseCancellation ? "Yes" : "No"}</li>
                                            <li>Battery Life: {item.specifications.batteryLife}</li>
                                            <li>Color: {item.specifications.color.join(", ")}</li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='cart-summary'>
                        <div className='cart-summary-header'>
                            <h2>Order Summary</h2>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    )
}