"use client"

import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./Firebase/firebase"
import { ProfileProvider } from "./Admin/ProfileContext"

// Page imports
import HomePage from "./Pages/Home"
import UploadLogo from "./Pages/UploadYourLogo"
import Gallery from "./Pages/Gallery"
import ProductDetails from "./Pages/productdetails"
import ContactPage from "./Pages/Contact"
import NeonDesigner from "./Pages/NeonDesigner"
import AddToCart from "./Pages/AddToCart"
import OrderConfirmation from "./Pages/OrderConfirmation"
import Login from "./Pages/login"

// Admin imports
import Dashboard from "./Admin/Dashboard"
import AdminPanel from "./Admin/AdminPannel"
import Categories from "./Admin/Categories"
import Orders from "./Admin/Orders"
import Products from "./Admin/Products"
import CustomNeonOrders from "./Admin/CustomNeonOrders"
import AdminSettings from "./Admin/AdminSettings"

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
    })

    return () => unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/upload-logo" element={<UploadLogo />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/custom-neon" element={<NeonDesigner />} />
            <Route path="/add-to-cart" element={<AddToCart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />

            {/* Admin routes */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <AdminPanel>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="settings" element={<AdminSettings />} />
                      <Route path="products" element={<Products />} />
                      <Route path="custom-orders" element={<CustomNeonOrders />} />
                    </Routes>
                  </AdminPanel>
                </PrivateRoute>
              }
            />

            {/* Redirect to admin dashboard if just /admin is accessed */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  )
}

export default App

