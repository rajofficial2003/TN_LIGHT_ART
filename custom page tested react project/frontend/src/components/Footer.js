import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="tabs page11 footer mta-5">
      <div
        style={{ margin: "10rem 0 10rem 0" }}
        className="footer-content d-flex justify-content-around w-100 h-100 align-items-start"
      >
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/return-policy">Refund Policy</Link>
          </li>
          <li>
            <Link to="/terms">Terms & Conditions</Link>
          </li>
        </ul>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/design">Design your own neon sign</Link>
          </li>
          <li>
            <Link to="/upload">Upload an Image</Link>
          </li>
          <li>
            <Link to="/business-logo">Business Logo</Link>
          </li>
          <li>
            <Link to="/hire-designer">Hire a Designer</Link>
          </li>
        </ul>
        <ul style={{ listStyleType: "none" }}>
          <div>
            <span className="maxine-title">Custom NeonZ</span>
          </div>
          <li style={{ width: "315rem", textAlign: "left" }} className="text-wrap">
            7426 Camp Alger Ave, Falls Church, VA 22042, USA
          </li>
        </ul>
      </div>
      <div className="tabs m-auto" style={{ fontSize: "15rem", width: "90%" }}>
        Custom NeonZ® 2022-23
      </div>
    </footer>
  )
}

export default Footer

