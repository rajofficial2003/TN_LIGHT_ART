import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import HomePage from './Pages/Home';
import UploadLogo from './Pages/UploadYourLogo';
import SingleFooter from './Components/Footer';
import Gallery from './Pages/Gallery';
import CustomNeonPage from './Pages/CustomNeon';
import ProductDetails from './Pages/productdetails';
import ContactPage from './Pages/Contact';


function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-logo" element={<UploadLogo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/custom-neon" element={<CustomNeonPage />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactPage />} />
        
        
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
