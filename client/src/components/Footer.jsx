import "../styles/Footer.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='Footer'>
            <div className="footer-inner">
                <section className="footer-col footer-brand">
                    <h3>PureTone Labs</h3>
                    <p>Premium audio gear for everyday creators.</p>
                    <p className="footer-trust">Secure checkout with Stripe.</p>
                </section>

                <section className="footer-col">
                    <h4>Quick Links</h4>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About</Link>
                    <Link to="/cart">Cart</Link>
                </section>

                <section className="footer-col">
                    <h4>Support</h4>
                    <a href="mailto:support@puretone-labs.com">support@puretone-labs.com</a>
                    <p>Mon-Fri, 9:00 AM - 5:00 PM</p>
                    <p>FAQ, Shipping & Returns</p>
                </section>

                <section className="footer-col">
                    <h4>Legal</h4>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Refund Policy</a>
                </section>

                <section className="footer-col">
                    <h4>Stay in the Loop</h4>
                    <p>Get product updates and launch alerts.</p>
                    <div className="newsletter-row">
                        <input type="email" placeholder="Email address" aria-label="Email address" />
                        <button type="button">Subscribe</button>
                    </div>
                </section>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} PureTone Labs. All rights reserved.</p>
            </div>
        </footer>
    )
};