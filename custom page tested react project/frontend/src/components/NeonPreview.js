import React, { useRef } from "react"
import Draggable from "react-draggable"

const NeonPreview = ({ text, font, color, background }) => {
  const nodeRef = useRef(null)

  return (
    <div className="editing imagePreview position-relative">
      <div className="editing mover" style={{ backgroundImage: `url(${background})` }}>
        <Draggable nodeRef={nodeRef} bounds="parent">
          <p
            ref={nodeRef}
            className="text-preview"
            id="typed_text"
            style={{
              fontFamily: font.name,
              color: color.color,
              textShadow: color.neon,
            }}
          >
            {text}
          </p>
        </Draggable>
      </div>
    </div>
  )
}

export default NeonPreview

