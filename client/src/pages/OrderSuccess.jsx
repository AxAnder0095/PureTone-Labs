import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar.jsx';
import { useProducts } from '../context/ProductsContext.jsx';
import { api } from '../api/api.js';
import '../styles/OrderSuccess.scss';

export const OrderSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const { setCart } = useProducts();

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOrder = async () => {
        if (!sessionId) {
            setError('Missing checkout session id.');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const { data } = await api.get('/orders/by-checkout-session', {
                params: { session_id: sessionId }
            });

            setOrder(data?.order || null);
            setCart([]);
        } catch (requestError) {
            setOrder(null);
            setError(requestError?.response?.data?.message || 'Unable to load order confirmation.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [sessionId, setCart]);

    return (
        <div className='OrderSuccess'>
            <section className='order-success-section'>
                <article className='order-success-nav'>
                    <Navbar />
                </article>
                <article className='order-success-content'>
                    <h1>Order Confirmation</h1>
                    {isLoading && <p>Loading your order...</p>}
                    {!isLoading && error && (
                        <div className='order-error'>
                            <p>{error}</p>
                            <p>Stripe webhooks can take a few seconds. Try again.</p>
                            <button onClick={fetchOrder} className='retry-btn' disabled={isLoading}>Retry</button>
                        </div>
                    )}
                    {!isLoading && !error && order && (
                        <div className='order-card'>
                            <p><span>Order ID:</span> {order._id}</p>
                            <p><span>Status:</span> {order.orderStatus}</p>
                            <p><span>Paid:</span> {order.isPaid ? 'Yes' : 'No'}</p>
                            <p><span>Total:</span> ${order.totalPrice?.toFixed?.(2) ?? order.totalPrice}</p>
                            <p><span>Email:</span> {order.customerInfo?.email || 'N/A'}</p>
                            <p><span>Shipping:</span> {order.shippingAddress?.address || 'N/A'}</p>
                            <div className='order-items'>
                                <h2>Items</h2>
                                <ul>
                                    {order.orderItems?.map((item, index) => (
                                        <li key={`${item.product || item.name}-${index}`}>
                                            {item.name} x {item.quantity} — ${Number(item.price).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <Link to='/shop' className='back-link'>Continue Shopping</Link>
                </article>
            </section>
        </div>
    );
};
