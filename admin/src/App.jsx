import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the test message from the backend
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching test message:', error));
  }, []);

  return (
    <div className='App'>
      <h1>PureTone Labs</h1>
      <h2>Welcome to the PureTone Labs Admin Panel!</h2>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App