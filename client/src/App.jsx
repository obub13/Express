import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Stores from './pages/stores'


function App() {
//react app elements

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">Home</Link>
          <span>&nbsp;</span>
          <Link to="/about">About</Link>
          <span>&nbsp;</span>
          <Link to="/stores">Stores</Link>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/stores' element={<Stores/>}/>
            <Route path='/stores/:id' element={<Stores/>}/>
            <Route path='/stores/:id/:item' element={<Stores/>}/>
            <Route path='/stores/add/' element={<Stores/>}/>
            <Route path='/stores/add/:store' element={<Stores/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
