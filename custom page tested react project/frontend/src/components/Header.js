import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header
      className="d-flex justify-content-center w-75 h-100 align-items-center m-auto"
      style={{ padding: "0 0 0 69rem" }}
    >
      <div className="p-2">
        <Link to="/">Home</Link>
      </div>
      <div className="p-2">
        <Link to="/design">Customize your Neon Light</Link>
      </div>
      <div className="p-2">
        <Link to="/upload">Upload your own design</Link>
      </div>
      <div className="p-2 bestsellers-nav">
        <Link to="/bestsellers">Our Bestsellers</Link>
      </div>
    </header>
  )
}

export default Header

