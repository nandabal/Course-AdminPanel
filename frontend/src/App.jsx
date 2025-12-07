
import './App.css'
import Home from './pages/Home'
import Feedback from './pages/Feedback'
import Base from './pages/Base'
import {Routes, Route } from 'react-router-dom'


function App() {
  return (
   <Routes>
    <Route path='/' element={<Base child={<Home/>}/>}/>
    <Route path='/feedback' element={<Base child={<Feedback/>}/>}/>
   </Routes>
  )
}

export default App
