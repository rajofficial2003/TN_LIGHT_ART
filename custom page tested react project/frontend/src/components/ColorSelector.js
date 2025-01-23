import React from "react"

const ColorSelector = ({ colors, setColor }) => {
  return (
    <div className="color-container tablet">
      <h5 className="mla-7">Select your Color</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        {colors.map((color, index) => (
          <i
            key={index}
            className="material-icons color cont"
            style={{ color: color.iconColor }}
            onClick={() => setColor(color)}
          >
            highlight
          </i>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector

