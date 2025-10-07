import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="page-wrap" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌊 Marine Weather Dashboard</h1>
      <p>Fetching live ocean weather for Halifax, Nova Scotia...</p>
  </div>
    </>
  )
}

export default App
