import { Link } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import "../styles/About.scss";

export const About = () => {
    return (
        <div className='About'>
            <section className='about-section'>
                <article className='about-nav'>
                    <Navbar />
                </article>

                <article className='about-content'>
                    <header className='about-hero'>
                        <p className='about-kicker'>About PureTone Labs</p>
                        <h1>Built for people who care about great sound.</h1>
                        <p>
                            We create a simple way to discover premium audio gear without the noise.
                            From wireless headphones to home listening essentials, every product in our
                            catalog is selected for performance, reliability, and value.
                        </p>
                    </header>

                    <section className='about-grid'>
                        <article className='about-card'>
                            <h2>Our Mission</h2>
                            <p>
                                Make high-quality audio accessible to everyday creators, listeners, and
                                professionals by offering gear you can trust.
                            </p>
                        </article>

                        <article className='about-card'>
                            <h2>What We Value</h2>
                            <p>
                                Sound quality first, transparent pricing, and a smooth shopping experience
                                from product discovery to checkout.
                            </p>
                        </article>

                        <article className='about-card'>
                            <h2>Why Shop With Us</h2>
                            <p>
                                Curated products, secure checkout, and helpful support when you need it.
                                No clutter, no gimmicks, just gear that performs.
                            </p>
                        </article>
                    </section>

                    <section className='about-cta'>
                        <p>Ready to upgrade your setup?</p>
                        <Link to='/shop' className='about-shop-btn'>Explore the Shop</Link>
                    </section>
                </article>
            </section>

            <article className='about-footer'>
                <Footer />
            </article>
        </div>
    )
};