import { useState} from 'react'
import { Hero } from './components/Hero.jsx';
import { useProducts } from './context/ProductsContext.jsx';
import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const { cart, setCart } = useProducts();

  const handleAddToCart = () => {
    const newCart = [...cart, { id: cart.length + 1, name: `Product: Headphones` }];
    setCart(newCart);
    setMessage(`Added Product ${cart.length + 1} to cart!`);
  }


  return (
    <div className='App'>
      <Hero />
      <h1>PureTone Labs</h1>
      <h2>Welcome to the PureTone Labs full-stack application!</h2>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}

export default App
