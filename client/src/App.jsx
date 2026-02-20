import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar.jsx';
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  // Example of fetching data from the backend when the component mounts
  // useEffect(() => {
  //   // Fetch the test message from the backend
  //   fetch('/api/test')
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message))
  //     .catch(error => console.error('Error fetching test message:', error));
  // }, []);

  return (
    <div className='App'>
      <Navbar />
      <h1>PureTone Labs</h1>
      <h2>Welcome to the PureTone Labs full-stack application!</h2>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
