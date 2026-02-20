import { NavLink } from "react-router-dom";
import '../styles/Navbar.scss'

export const Navbar = () => {
    return (
        <header className="nav-container">
            <nav className="nav">
                <div className="nav-brand">
                    <NavLink to="/" className={'nav-logo'}>PureTone Labs</NavLink>
                </div>
                <div className="nav-services">
                    <div className="nav-links">
                        <NavLink to="/" className={({isActive}) => isActive ? 'link active' : 'link'}>Home</NavLink>
                        <NavLink to="/products" className={({isActive}) => isActive ? 'link active' : 'link'}>Products</NavLink>
                        <NavLink to="/about" className={({isActive}) => isActive ? 'link active' : 'link'}>About</NavLink>
                        <NavLink to="/services" className={({isActive}) => isActive ? 'link active' : 'link'}>Services</NavLink>
                    </div>
                    <div className="nav-cart-container">
                        <p>Icon of cart here</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}