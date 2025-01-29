import React from "react"

const TextEditor = ({ text, setText }) => {
  return (
    <div className="text-container tablet">
      <textarea
        id="type_text"
        rows="5"
        className="w-100"
        placeholder="Enter Text Here.. Press Enter for a new Line"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  )
}

export default TextEditor

