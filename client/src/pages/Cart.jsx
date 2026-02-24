import { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { api } from '../api/api.js';
// import { useNavigate } from 'react-router-dom';
import "../styles/Cart.scss"

export const Cart = () => {
    const { cart, setCart } = useProducts();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isStripeTestMode, setIsStripeTestMode] = useState(false);
    const salesTaxRate = 0.07; // Example sales tax rate (7%)
    // const navigate = useNavigate();
    // const [subtotal, setSubtotal] = useState(0);
    // const [finalTotal, setFinalTotal] = useState(0);

    const cartItems = () => {
        const count = cart.length;

        if (count === 0) {
            return <h2>Your Cart</h2>;
        };

        return <h2>{count} {count === 1 ? "item" : "items"}</h2>;
    };

    const handleRemoveFromCart = (product) => {
        const newCart = cart.filter(item => item.brand !== product.brand); // Remove the product from the cart
        setCart(newCart);
    };

    const getSubtotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate the total price of items in the cart
        return total.toFixed(2);
    };

    const getFinalTotal = () => {
        const subtotal = parseFloat(getSubtotal());
        const tax = subtotal * salesTaxRate;
        const finalTotal = subtotal + tax;
        return finalTotal.toFixed(2);
    };

    useEffect(() => {
        const fetchCheckoutConfig = async () => { // Check if Stripe is in test mode to show banner in cart
            try {
                const { data } = await api.get('/orders/checkout-config');
                setIsStripeTestMode(Boolean(data?.isTestMode));
            } catch (error) {
                console.error('Checkout config error:', error);
            }
        };

        fetchCheckoutConfig();
    }, []);

    const handleCheckout = async () => {
        if (cart.length === 0 || isCheckingOut) {
            return;
        }

        try {
            setIsCheckingOut(true);
            console.log(`Cart before checkout:`, cart[0]);

            const { data } = await api.post('/orders/checkout-session', {
                cartItems: cart
            });

            if (!data?.url) {
                throw new Error('Unable to create checkout session.');
            }

            window.location.href = data.url;
        } catch (error) {
            console.error('Checkout error:', error);
            alert(error?.response?.data?.message || 'Could not start Stripe checkout. Please try again.');
            setIsCheckingOut(false);
        }
    };

    return (
        <div className='Cart'>
            <section className='cart-section'>
                <article className='cart-nav'>
                    <Navbar />
                </article>
                <button onClick={() => setCart([])}>Empty Cart</button>
                <article className='cart-content'>
                    <div className='cart-items'>
                        <div className='cart-items-header'>
                            <h2>Shopping Bag</h2>
                            {cartItems()}
                        </div>
                        <div className='cart-items-list'>
                            <div className='items-header'>
                                <div />
                                <h3>Product</h3>
                                <h3>Stock</h3>
                                <h3>Price</h3>
                            </div>

                            <div className='items-list'>
                                {cart.length === 0 ? (
                                    <p>Your cart is empty</p>
                                ) : (
                                    <ul className='cart-item'>
                                        {cart.map((item, index) => (
                                            <li key={index} className='item-card'>
                                                <div className='item-image'>
                                                    <img src={item.image} alt={item.description} />
                                                </div>
                                                <div className='remove-container'>
                                                    <h4>{item.brand}</h4>
                                                    <button className='remove-btn' onClick={() => handleRemoveFromCart(item)}>Remove</button>
                                                </div>
                                                <p>{item.stock}</p>
                                                <p>${item.price}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='cart-summary'>
                        <div className='cart-summary-header'>
                            <h2>Order Summary</h2>
                        </div>
                        <div className='cart-summary-subtotals'>
                            <p><span>Subtotal:</span> ${getSubtotal()}</p>
                            <p><span>Standard Shipping:</span> $0.00</p>
                            <p><span>Sales Tax:</span> ${(parseFloat(getSubtotal()) * salesTaxRate).toFixed(2)}</p>
                        </div>
                        <div className='cart-summary-total'>
                            <p><span>Total:</span> ${getFinalTotal()}</p>
                            {isStripeTestMode && (
                                <p className='test-mode-banner'>Test mode: use Stripe test card details only.</p>
                            )}
                            <button
                                className='checkout-btn'
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || isCheckingOut}
                            >
                                {isCheckingOut ? 'Redirecting...' : 'Checkout'}
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    )
}