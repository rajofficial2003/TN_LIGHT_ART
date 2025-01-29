import React from "react"

const SizeSelector = ({ sizes, size, setSize }) => {
  return (
    <div className="coo d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
      {sizes.map((sizeOption, index) => (
        <div
          key={index}
          className={`cont size d-flex justify-content-around align-items-center flex-row ${size.name === sizeOption.name ? "active" : ""}`}
          onClick={() => setSize(sizeOption)}
        >
          <div className="p-1 text-lg">
            <div>{sizeOption.name}</div>
            <div className={`${sizeOption.name.toLowerCase().replace(" ", "-")}-price`}>${sizeOption.price}</div>
          </div>
          <div className="p-1 text-sm">
            <div className="m-1">
              Length:{" "}
              <span className={`${sizeOption.name.toLowerCase().replace(" ", "-")}-length`}>{sizeOption.length}</span>"
            </div>
            <div className="m-1">
              Height:{" "}
              <span className={`${sizeOption.name.toLowerCase().replace(" ", "-")}-height`}>{sizeOption.height}</span>"
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SizeSelector

