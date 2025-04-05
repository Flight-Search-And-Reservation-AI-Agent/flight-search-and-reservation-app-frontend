import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'

function App() {

  return (
    <>
       <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="flights" element={<Flights />} />
          <Route path="users" element={<Users />} />
          <Route path="reservations" element={<Reservations />} />
        </Route> */}
      </Routes>

    </>
  )
}

export default App
