import { useState } from "react"
import logo from "../Images/Logo/2.png"

const SingleFooter = () => {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const footerSections = [
    {
      title: "About Neon Signs",
      content: ["Custom Designs", "Our Process", "Installation Guide", "Care Instructions"],
    },
    {
      title: "Shop",
      content: ["All Products", "New Arrivals", "Best Sellers", "Custom Orders"],
    },
    {
      title: "Customer Service",
      content: ["Contact Us", "Shipping Info", "Returns & Exchanges", "FAQ"],
    },
    {
      title: "Connect",
      content: ["Instagram", "Facebook", "Twitter", "Pinterest"],
    },
  ]

  return (
    <footer className="text-white" style={{ background: "linear-gradient(to right, #0A0F10, #1a1a1a)" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <img
              src={logo || "/placeholder.svg"}
              alt="Neon Signs Logo"
              className="img-fluid mb-3"
              style={{ height: "60px" }}
            />
            <p className="text-light mb-3">Illuminating lives with bespoke neon artistry.</p>
            <p className="text-light mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              tnlightart@gmail.com
            </p>
            <p className="text-light mb-3">
              <i className="bi bi-telephone-fill me-2"></i>
              88074 88021
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-4 hover-glow">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light fs-4 hover-glow">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-4 hover-glow">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-4 hover-glow">
                <i className="bi bi-pinterest"></i>
              </a>
            </div>
          </div>
          {footerSections.map((section, index) => (
            <div key={index} className="col-lg-2 col-md-6 mb-4">
              <div
                className="d-flex justify-content-between align-items-center d-lg-none mb-2"
                onClick={() => toggleSection(section.title)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0 text-light">{section.title}</h5>
                <span
                  className={`fs-4 ${openSections[section.title] ? "rotate-45" : ""}`}
                  style={{ transition: "transform 0.3s ease" }}
                >
                  +
                </span>
              </div>
              <div className={`d-lg-block ${openSections[section.title] ? "" : "d-none d-lg-block"}`}>
                <h5 className="text-uppercase mb-3 position-relative pb-2 d-none d-lg-block text-light">
                  {section.title}
                  <span
                    className="position-absolute bottom-0 start-0"
                    style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #f0f0f0, transparent)" }}
                  ></span>
                </h5>
                <ul className="list-unstyled">
                  {section.content.map((item, i) => (
                    <li key={i} className="mb-2">
                      <a
                        href="#"
                        className="text-light text-decoration-none hover-glow"
                        style={{ transition: "color 0.3s ease, transform 0.3s ease", display: "inline-block" }}
                      >
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
      <div className="py-3" style={{ background: "rgba(0, 0, 0, 0.2)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 text-light">&copy; {new Date().getFullYear()} Neon Signs. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <a href="#" className="text-light text-decoration-none me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-light text-decoration-none">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hover-glow {
          transition: text-shadow 0.3s ease;
        }
        .hover-glow:hover {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }
        @keyframes neonPulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }
        .neon-pulse {
          animation: neonPulse 2s infinite;
        }
      `}</style>
    </footer>
  )
}

export default SingleFooter

