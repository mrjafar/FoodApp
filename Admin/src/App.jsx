import React from 'react'
import { Navbar } from './componenet/Navbar/Navbar'
import { Sidebar } from './componenet/sidebar/Sidebar'
import { Add } from './pages/Add/Add'
import { List } from './pages/List/List'
import { Orders } from './pages/Orders/Orders'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
