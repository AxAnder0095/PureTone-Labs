import { NavLink, Link } from "react-router-dom";
import '../styles/Navbar.scss'
import { BsCart3 } from "react-icons/bs";
import { useProducts } from "../context/ProductsContext.jsx";
import { GiBubblingFlask } from "react-icons/gi";
import { IoIosFlask } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";



export const Navbar = () => {
    const { cart } = useProducts();

    // console.log('%cNavbar cart state:', 'color: red; font-weight: bold;', cart);
    return (
        <header className="nav-container">
            <nav className="nav">
                <div className="nav-brand">
                    {/* <IoIosFlask className="nav-icon" /> */}
                    <Link to="/" className={'nav-logo'}>PureTone Labs</Link>
                </div>
                <div className="nav-services">
                    <div className="nav-links">
                        <NavLink to="/" className={({isActive}) => isActive ? 'link active' : 'link'}>Home</NavLink>
                        <NavLink to="/shop" className={({isActive}) => isActive ? 'link active' : 'link'}>Shop</NavLink>
                        <NavLink to="/about" className={({isActive}) => isActive ? 'link active' : 'link'}>About</NavLink>
                    </div>
                    <div className="nav-cart-container">
                        <NavLink to="/cart" className={({isActive}) => isActive ? 'cart-link active' : 'cart-link'}>
                            <IoBagHandleOutline className="cart-icon" />
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    )
}