import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProjectPage from './components/pages/ProjectPages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ProjectPage />
    </div>
  )
}

export default App
