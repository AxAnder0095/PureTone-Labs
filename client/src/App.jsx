import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the test message from the backend
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching test message:', error));
  }, []);

  return (
    <div className='App'>
      <h1>PureTone Labs</h1>
      {message && <p>{message}</p>}
    </div>
  )
}

export default App
