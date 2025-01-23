import React from "react"

const FontSelector = ({ fonts, setFont }) => {
  return (
    <div className="font-container tablet">
      <h5 className="mla-7">Select your Font</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        {fonts.map((font, index) => (
          <div key={index} style={{ fontFamily: font.name }} className="font cont" onClick={() => setFont(font)}>
            <img src={font.image || "/placeholder.svg"} alt={font.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FontSelector

