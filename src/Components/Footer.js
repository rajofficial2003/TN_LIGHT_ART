import React, { useState } from 'react';
import logo from "../Images/Logo/2.png";

const SingleFooter = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const footerSections = [
    {
      title: 'About Neon Signs',
      content: ['Custom Designs', 'Our Process', 'Installation Guide', 'Care Instructions'],
    },
    {
      title: 'Shop',
      content: ['All Products', 'New Arrivals', 'Best Sellers', 'Custom Orders'],
    },
    {
      title: 'Customer Service',
      content: ['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'FAQ'],
    },
    {
      title: 'Connect',
      content: ['Instagram', 'Facebook', 'Twitter', 'Pinterest'],
    },
  ];

  return (
    <footer className="bg-dark text-white" style={{ background: 'linear-gradient(to bottom, #1a1a1a, #000000)' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <img src={logo} alt="Neon Signs Logo" className="img-fluid mb-3" style={{ height: '60px', }} />
            <p className="text-light mb-3">We create bespoke neon signs to illuminate your life.</p>
            <p className="text-light mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              tnlightart@gmail.com
            </p>
            <p className="text-light mb-3">
              <i className="bi bi-telephone-fill me-2"></i>
              88074 88021
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light fs-4"><i className="bi bi-pinterest"></i></a>
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index} className="col-lg-2 col-md-6 mb-4">
              <div className="d-flex justify-content-between align-items-center d-lg-none mb-2" onClick={() => toggleSection(section.title)} style={{ cursor: 'pointer' }}>
                <h5 className="mb-0">{section.title}</h5>
                <span className={`fs-4 ${openSections[section.title] ? 'rotate-45' : ''}`} style={{ transition: 'transform 0.3s ease' }}>+</span>
              </div>
              <div className={`d-lg-block ${openSections[section.title] ? '' : 'd-none d-lg-block'}`}>
                <h5 className="text-uppercase mb-3 position-relative pb-2 d-none d-lg-block">
                  {section.title}
                  <span className="position-absolute bottom-0 start-0 bg-light" style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, #f0f0f0, transparent)' }}></span>
                </h5>
                <ul className="list-unstyled">
                  {section.content.map((item, i) => (
                    <li key={i} className="mb-2">
                      <a href="#" className="text-light text-decoration-none" style={{ transition: 'color 0.3s ease, transform 0.3s ease', display: 'inline-block' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black text-center py-3">
        <p className="mb-0 text-muted">&copy; {new Date().getFullYear()} Neon Signs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default SingleFooter;

