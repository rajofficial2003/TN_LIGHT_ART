import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Pages/Home';
import UploadLogo from './Pages/UploadYourLogo';
import Gallery from './Pages/Gallery';
import CustomNeonPage from './Pages/CustomNeon';
import ProductDetails from './Pages/productdetails';
import ContactPage from './Pages/Contact';
import NeonDesigner from './Pages/NeonDesigner';
import AddToCartForm from './Pages/AddToCart';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-logo" element={<UploadLogo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/custom-neon" element={<NeonDesigner />} />
          <Route path="/cart" element={<AddToCartForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;