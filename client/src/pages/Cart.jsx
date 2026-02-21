import { useProducts } from '../context/ProductsContext.jsx';
import { Navbar } from '../components/Navbar.jsx';
import "../styles/Cart.scss"

export const Cart = () => {
    const { cart, setCart } = useProducts();

    const cartItems = () => {
        const count = cart.length;

        if (count === 0) {
            return <h1>Your Cart</h1>;
        };

        return <h1>Your Cart: {count} {count === 1 ? "item" : "items"}</h1>;
    };

    return (
        <div className='Cart'>
            <section className='cart-section'>
                <article className='cart-nav'>
                    <Navbar />
                </article>
                <button onClick={() => setCart([])}>Empty Cart</button>
                {cartItems()}
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
            </section>
        </div>
    )
}