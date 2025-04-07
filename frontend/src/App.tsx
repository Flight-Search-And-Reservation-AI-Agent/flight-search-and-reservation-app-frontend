import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import Flights from './pages/admin/Flight'
import AddFlight from './pages/admin/helpers/AddFlight'
import EditFlight from './pages/admin/helpers/EditFlight'

function App() {

  return (
    <>
       <Header />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="flights" element={<Flights />} />
          <Route path="/admin/flights/add" element={<AddFlight />} />
          <Route path="/admin/flights/edit/:id" element={<EditFlight />} />
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="airports" element={<Airports />} /> */}
          {/* <Route path="aircrafts" element={<Aircrafts />} /> */}
          {/* <Route path="reservations" element={<Reservations />} /> */}
        </Route>
      </Routes>

    </>
  )
}

export default App
