import { Navbar } from "./Navbar.jsx"
import { Link } from "react-router-dom"
import '../styles/Hero.scss'

export const Hero = () => {
    return (
        <section className="hero">
            <Navbar />
            {/* <div className="overlay"/> */}
            <article className="hero-content">
                <div className="hero-info">
                    <p className="cta-sub">Pure Sound</p>
                    <p className="cta-main">Zero Compromise</p>
                    <p className="cta-description">Studio-quality wireless headphones with adaptive noise cancellation and 40-hour battery life.</p>
                    <div className="hero-links">
                        <Link to="/shop" className="shop-now-btn">Shop Now</Link>
                        <Link to="/about" className="learn-more-btn">Learn More</Link>
                    </div>
                </div>
            </article>
        </section>
    )
}