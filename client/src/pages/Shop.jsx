import { Navbar } from "../components/Navbar.jsx";
import { useProducts } from '../context/ProductsContext.jsx';
import { testData } from "../data/testData.jsx";
import "../styles/Shop.scss"

export const Shop = () => {
    const { cart, setCart } = useProducts();

    const handleAddToCart = (product) => {

        if (cart.some(item => item.id === product.id)) { // Check if the product is already in the cart
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
                        {testData.map((product, index) => (
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
                        ))}
                    </div>
                </article>
            </section>
        </div>
    )
};
//                 color: [
//                     "Midnight Black",
//                     "Arctic White"
//                 ]
//             }
//         }
//         ];
//         setCart(newCart);
//     }
//     return (
//         <div className='Shop'>
//             <section className='shop-section'>
//                 <article className='shop-nav'>
//                     <Navbar />
//                 </article>
//                 <article className='shop-content'>
//                     <div className="shop-hero">
//                         <p className="shop-title">Shop</p>
//                         <p className="shop-subtitle">Premium sound engineered for clarity and depth.</p>
//                     </div>
//                     <div className="shop-products">
//                         {testData.map((product, index) => (
//                             <div key={index} className="shop-product">
//                                 <p>{product.brand}</p>
//                                 <p>{product.description}</p>
//                                 <p>${product.price}</p>
//                                 <button onClick={handleAddToCart}>Add to Cart</button>
//                             </div>
//                         ))}
//                     </div>
//                 </article>
//             </section>
//         </div>
//     )
// };