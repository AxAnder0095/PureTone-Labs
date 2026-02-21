import { NavLink } from "react-router-dom";
import '../styles/Navbar.scss'
import { BsCart3 } from "react-icons/bs";
import { useProducts } from "../context/ProductsContext.jsx";
import { GiBubblingFlask } from "react-icons/gi";
import { IoIosFlask } from "react-icons/io";


export const Navbar = () => {
    const { cart } = useProducts();

    // console.log('%cNavbar cart state:', 'color: red; font-weight: bold;', cart);
    return (
        <header className="nav-container">
            <nav className="nav">
                <div className="nav-brand">
                    <IoIosFlask className="nav-icon" />
                    <NavLink to="/" className={'nav-logo'}>PureTone Labs</NavLink>
                </div>
                <div className="nav-services">
                    <div className="nav-links">
                        <NavLink to="/" className={({isActive}) => isActive ? 'link active' : 'link'}>Home</NavLink>
                        <NavLink to="/shop" className={({isActive}) => isActive ? 'link active' : 'link'}>Shop</NavLink>
                        <NavLink to="/about" className={({isActive}) => isActive ? 'link active' : 'link'}>About</NavLink>
                    </div>
                    <div className="nav-cart-container">
                        <BsCart3 />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                    </div>
                </div>
            </nav>
        </header>
    )
}