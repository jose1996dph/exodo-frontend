import { Routes, Route } from 'react-router-dom'
import Login from './componets/pages/Login'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
