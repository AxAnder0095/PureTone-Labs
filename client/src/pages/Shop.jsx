import { Navbar } from "../components/Navbar.jsx";
import { useProducts } from '../context/ProductsContext.jsx';
import { Footer } from "../components/Footer.jsx";
import "../styles/Shop.scss"

export const Shop = () => {
    const { cart, setCart, products } = useProducts();

    const handleAddToCart = (product) => {
        console.log("Adding to cart:", product);

        if (cart.some(item => item.brand === product.brand)) { // Check if the product is already in the cart
            alert("This item is already in your cart.");
            return;
        }
        const newCart = [...cart, product]; // append the new product to the existing cart
        setCart(newCart);
    }
    return (
        <div className='Shop'>
            <section className='shop-section'>
                <article className='shop-nav'>
                    <Navbar />
                </article>
                <article className='shop-content'>
                    <div className="shop-hero">
                        <p className="shop-title">Shop</p>
                        <p className="shop-subtitle">Premium sound engineered for clarity and depth.</p>
                    </div>
                    <div className="shop-products">
                        {products.length === 0 ? (
                            <p>Loading products...</p>
                        ) : (
                            products.map((product, index) => (
                                <div key={index} className="shop-product-card">
                                    <img src={product.image} alt={product.description} />
                                    <div className="shop-product-card-inner">
                                        <div className="shop-product-card-header">
                                            <p className="product-brand">{product.brand}</p>
                                            <p className="product-price">${product.price}</p>
                                        </div>
                                        <p className="product-description">{product.description}</p>
                                        <button onClick={() => handleAddToCart(product)} className="atc-btn">Add to Cart</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </article>
                <article className="shop-footer">
                    <Footer />
                </article>
            </section>
        </div>
    )
};
