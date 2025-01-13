import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import HomePage from './Pages/Home';
import UploadLogo from './Pages/UploadYourLogo';
import SingleFooter from './Components/Footer';
import Gallery from './Pages/Gallery';
import CustomNeonPage from './Pages/CustomNeon';


function App() {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-logo" element={<UploadLogo />} />
          <Route path="/custom-signs" element={<Gallery />} />
          <Route path="/custom-neon" element={<CustomNeonPage />} />
        
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
