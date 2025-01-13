import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import one from '../Images/Neon-lights/one.jpg'
import two from '../Images/Neon-lights/two.jpg'
import three from '../Images/Neon-lights/three.jpg'

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SL_111219_25000_17.jpg-6AEQJTFQmq5d0jUPSPgI7vr9A3x1bL.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        marginTop: '60px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-3">Illuminate Your Space with Custom Neon</h1>
              <p className="lead mb-4">Turn your ideas into eye-catching LED neon signs</p>
             <div className="row justify-content-center ">
             <a style={{backgroundColor:"#40E0D0",textDecoration:"none",color:"#000310"}} href="#custom" className=" col-8  col-lg-4 fw-bolder  me-2 px-3 py-3 rounded ">Create Your Design</a>
             <a href="#gallery" style={{border:"1px solid white",textDecoration:"none",color:"#40E0D0"}} className=" fw-bolder col-8 mt-3 mt-lg-0 col-lg-4  me-2 px-4 py-3 rounded">View Gallery</a>
             </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <i className="fas fa-bolt fa-3x text-primary mb-3"></i>
              <h3>Energy Efficient</h3>
              <p>Our LED neon signs use less energy and last longer</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <i className="fas fa-paint-brush fa-3x text-primary mb-3"></i>
              <h3>Custom Designs</h3>
              <p>Create your perfect neon sign with our design tool</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <i className="fas fa-truck fa-3x text-primary mb-3"></i>
              <h3>Fast Shipping</h3>
              <p>Quick production and worldwide delivery options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Popular Neon Signs</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={one} className="card-img-top" alt="Custom Text Neon Sign" style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Custom Text Neon Sign</h5>
                  <p className="card-text text-primary fw-bold">From $99</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={two} className="card-img-top" alt="Heart Neon Sign" style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Heart Neon Sign</h5>
                  <p className="card-text text-primary fw-bold">From $79</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={three} className="card-img-top" alt="Business Logo Neon Sign" style={{height: '200px', objectFit: 'cover'}} />
                <div className="card-body">
                  <h5 className="card-title">Business Logo Neon Sign</h5>
                  <p className="card-text text-primary fw-bold">From $149</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;

