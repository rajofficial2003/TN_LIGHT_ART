import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"

// Data
const fonts = [
  { name: "Alexa", size: "80px", lineHeight: "94%", image: "/assets/images/fonts/alexa.svg" },
  { name: "Amanda", size: "80px", lineHeight: "125%", image: "/assets/images/fonts/amanda.svg" },
  { name: "Amsterdam", size: "88px", lineHeight: "105%", image: "/assets/images/fonts/amsterdam.svg" },
  { name: "Austin", size: "115px", lineHeight: "76%", image: "/assets/images/fonts/austin.svg" },
  { name: "Avante", size: "75px", lineHeight: "97%", image: "/assets/images/fonts/avante.svg" },
  { name: "Barcelona", size: "70px", lineHeight: "150%", image: "/assets/images/fonts/barcelona.svg" },
  { name: "Bayview", size: "105px", lineHeight: "90%", image: "/assets/images/fonts/bayview.svg" },
  { name: "Beachfront", size: "73px", lineHeight: "120%", image: "/assets/images/fonts/beachfront.svg" },
  { name: "Bellview", size: "100px", lineHeight: "88%", image: "/assets/images/fonts/bellview.svg" },
  { name: "Buttercup", size: "120px", lineHeight: "90%", image: "/assets/images/fonts/buttercup.svg" },
  { name: "Chelsea", size: "110px", lineHeight: "100%", image: "/assets/images/fonts/chelsea.svg" },
  { name: "Freehand", size: "90px", lineHeight: "97%", image: "/assets/images/fonts/freehand.svg" },
  { name: "Freespirit", size: "47px", lineHeight: "180%", image: "/assets/images/fonts/freespirit.svg" },
  { name: "Greenworld", size: "100px", lineHeight: "84%", image: "/assets/images/fonts/greenworld.svg" },
  { name: "Loveneon", size: "60px", lineHeight: "95%", image: "/assets/images/fonts/loveneon.svg" },
  { name: "Lovenote", size: "70px", lineHeight: "100%", image: "/assets/images/fonts/lovenote.svg" },
  { name: "Marquee", size: "85px", lineHeight: "100%", image: "/assets/images/fonts/marquee.svg" },
  { name: "Mayfair", size: "76px", lineHeight: "95%", image: "/assets/images/fonts/mayfair.svg" },
  { name: "Melbourne", size: "70px", lineHeight: "100%", image: "/assets/images/fonts/melbourne.svg" },
  { name: "Monaco", size: "70px", lineHeight: "87%", image: "/assets/images/fonts/monaco.svg" },
  { name: "Neonglow", size: "75px", lineHeight: "100%", image: "/assets/images/fonts/neonglow.svg" },
  { name: "Neonlite", size: "62px", lineHeight: "95%", image: "/assets/images/fonts/neonlite.svg" },
  { name: "Neonscript", size: "95px", lineHeight: "115%", image: "/assets/images/fonts/neonscript.svg" },
  { name: "Neontrace", size: "62px", lineHeight: "100%", image: "/assets/images/fonts/neontrace.svg" },
  { name: "Neotokyo", size: "73px", lineHeight: "105%", image: "/assets/images/fonts/neotokyo.svg" },
  { name: "Nevada", size: "100px", lineHeight: "93%", image: "/assets/images/fonts/nevada.svg" },
  { name: "Newcursive", size: "100px", lineHeight: "87%", image: "/assets/images/fonts/newcursive.svg" },
  { name: "Northshore", size: "93px", lineHeight: "115%", image: "/assets/images/fonts/northshore.svg" },
  { name: "Photogenic", size: "90px", lineHeight: "120%", image: "/assets/images/fonts/photogenic.svg" },
  { name: "Rocket", size: "50px", lineHeight: "160%", image: "/assets/images/fonts/rocket.svg" },
  { name: "Royalty", size: "68px", lineHeight: "130%", image: "/assets/images/fonts/royalty.svg" },
  { name: "Scifi", size: "50px", lineHeight: "108%", image: "/assets/images/fonts/scifi.svg" },
  { name: "Signature", size: "100px", lineHeight: "95%", image: "/assets/images/fonts/signature.svg" },
  { name: "Sorrento", size: "70px", lineHeight: "130%", image: "/assets/images/fonts/sorrento.svg" },
  { name: "Typewriter", size: "70px", lineHeight: "92%", image: "/assets/images/fonts/typewriter.svg" },
  { name: "Venetian", size: "80px", lineHeight: "100%", image: "/assets/images/fonts/venetian.svg" },
  { name: "Vintage", size: "75px", lineHeight: "110%", image: "/assets/images/fonts/vintage.svg" },
  { name: "Waikiki", size: "70px", lineHeight: "87%", image: "/assets/images/fonts/waikiki.svg" },
  { name: "Wildscript", size: "105px", lineHeight: "105%", image: "/assets/images/fonts/wildscript.svg" },
]

const colors = [
  {
    name: "Warm White",
    color: "rgb(255, 255, 255)",
    iconColor: "rgba(255, 253, 207, 0.925)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 253 207) 0px 0px 20px, rgb(255 253 207) 0px 0px 30px, rgb(255 253 207) 0px 0px 40px, rgb(255 253 207) 0px 0px 55px, rgb(255 253 207) 0px 0px 75px",
  },
  {
    name: "White",
    color: "rgb(255, 255, 255)",
    iconColor: "rgba(199, 193, 193, 0.925)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 253 207) 0px 0px 20px, rgb(255 253 207) 0px 0px 30px, rgb(255 253 207) 0px 0px 40px, rgb(255 253 207) 0px 0px 55px, rgb(255 253 207) 0px 0px 75px",
  },
  {
    name: "Lemon Yellow",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 249, 124)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 249 124) 0px 0px 20px, rgb(255 249 124) 0px 0px 30px, rgb(255 249 124) 0px 0px 40px, rgb(255 249 124) 0px 0px 55px, rgb(255 249 124) 0px 0px 75px",
  },
  {
    name: "Golden Yellow",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 215, 0)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 215 0) 0px 0px 20px, rgb(255 215 0) 0px 0px 30px, rgb(255 215 0) 0px 0px 40px, rgb(255 215 0) 0px 0px 55px, rgb(255 215 0) 0px 0px 75px",
  },
  {
    name: "Orange",
    color: "rgb(255, 255, 255)",
    iconColor: "orange",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 141 2) 0px 0px 20px, rgb(255 141 2) 0px 0px 30px, rgb(255 141 2) 0px 0px 40px, rgb(255 141 2) 0px 0px 55px, rgb(255 141 2) 0px 0px 75px",
  },
  {
    name: "Light Red",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 99, 71)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 99 71) 0px 0px 20px, rgb(255 99 71) 0px 0px 30px, rgb(255 99 71) 0px 0px 40px, rgb(255 99 71) 0px 0px 55px, rgb(255 99 71) 0px 0px 75px",
  },
  {
    name: "Red",
    color: "rgb(255, 255, 255)",
    iconColor: "red",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 42 77) 0px 0px 20px, rgb(255 42 77) 0px 0px 30px, rgb(255 42 77) 0px 0px 40px, rgb(255 42 77) 0px 0px 55px, rgb(255 42 77) 0px 0px 75px",
  },
  {
    name: "Pink",
    color: "rgb(255, 255, 255)",
    iconColor: "pink",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 144 255) 0px 0px 20px, rgb(255 144 255) 0px 0px 30px, rgb(255 144 255) 0px 0px 40px, rgb(255 144 255) 0px 0px 55px, rgb(255 144 255) 0px 0px 75px",
  },
  {
    name: "Cotton Candy",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 188, 217)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 188 217) 0px 0px 20px, rgb(255 188 217) 0px 0px 30px, rgb(255 188 217) 0px 0px 40px, rgb(255 188 217) 0px 0px 55px, rgb(255 188 217) 0px 0px 75px",
  },
  {
    name: "Deep Pink",
    color: "rgb(255, 255, 255)",
    iconColor: "deeppink",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 92 232) 0px 0px 20px, rgb(255 92 232) 0px 0px 30px, rgb(255 92 232) 0px 0px 40px, rgb(255 92 232) 0px 0px 55px, rgb(255 92 232) 0px 0px 75px",
  },
  {
    name: "Purple",
    color: "rgb(255, 255, 255)",
    iconColor: "purple",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(128 0 128) 0px 0px 20px, rgb(128 0 128) 0px 0px 30px, rgb(128 0 128) 0px 0px 40px, rgb(128 0 128) 0px 0px 55px, rgb(128 0 128) 0px 0px 75px",
  },
  {
    name: "Deep Blue",
    color: "rgb(255, 255, 255)",
    iconColor: "blue",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(2 116 252) 0px 0px 20px, rgb(2 116 252) 0px 0px 30px, rgb(2 116 252) 0px 0px 40px, rgb(2 116 252) 0px 0px 55px, rgb(2 116 252) 0px 0px 75px",
  },
  {
    name: "Electric Blue",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(99, 170, 255)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(99 170 255) 0px 0px 20px, rgb(99 170 255) 0px 0px 30px, rgb(99 170 255) 0px 0px 40px, rgb(99 170 255) 0px 0px 55px, rgb(99 170 255) 0px 0px 75px",
  },
  {
    name: "Ice Blue",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(173, 216, 230)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(173 216 230) 0px 0px 20px, rgb(173 216 230) 0px 0px 30px, rgb(173 216 230) 0px 0px 40px, rgb(173 216 230) 0px 0px 55px, rgb(173 216 230) 0px 0px 75px",
  },
  {
    name: "Tropical Blue",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(0, 255, 255)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(0 255 255) 0px 0px 20px, rgb(0 255 255) 0px 0px 30px, rgb(0 255 255) 0px 0px 40px, rgb(0 255 255) 0px 0px 55px, rgb(0 255 255) 0px 0px 75px",
  },
  {
    name: "Mint",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(152, 255, 152)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(152 255 152) 0px 0px 20px, rgb(152 255 152) 0px 0px 30px, rgb(152 255 152) 0px 0px 40px, rgb(152 255 152) 0px 0px 55px, rgb(152 255 152) 0px 0px 75px",
  },
  {
    name: "Green",
    color: "rgb(255, 255, 255)",
    iconColor: "green",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(11 215 72) 0px 0px 20px, rgb(11 215 72) 0px 0px 30px, rgb(11 215 72) 0px 0px 40px, rgb(11 215 72) 0px 0px 55px, rgb(11 215 72) 0px 0px 75px",
  },
  {
    name: "Deep Green",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(0, 128, 0)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(0 128 0) 0px 0px 20px, rgb(0 128 0) 0px 0px 30px, rgb(0 128 0) 0px 0px 40px, rgb(0 128 0) 0px 0px 55px, rgb(0 128 0) 0px 0px 75px",
  },
]

const sizes = [
  { name: "Mini", price: 84, length: 18.5, height: 9, code: "cnz0" },
  { name: "Extra Small", price: 95, length: 20, height: 10, code: "cnz1" },
  { name: "Small", price: 118, length: 25, height: 12.5, code: "cnz2" },
  { name: "Medium", price: 134, length: 30, height: 15, code: "cnz3" },
  { name: "Large", price: 170, length: 38, height: 19, code: "cnz4" },
  { name: "X Large", price: 180, length: 48, height: 24, code: "cnz5" },
  { name: "XX Large", price: 211, length: 54, height: 27, code: "cnz6" },
  { name: "Supersized", price: 281, length: 85, height: 42.5, code: "cnz7" },
]

const backgrounds = [
  "/assets/images/background/background1.jpg",
  "/assets/images/background/background2.jpg",
  "/assets/images/background/background3.jpg",
  "/assets/images/background/background4.jpg",
  "/assets/images/background/background5.jpg",
  "/assets/images/background/background6.jpg",
  "/assets/images/background/background7.jpg",
  "/assets/images/background/background8.jpg",
]

const backboardStyles = [
  { name: "Cut Around", price: 0, image: "/assets/images/backboard/cut-around.png" },
  { name: "Rectangle", price: 0, image: "/assets/images/backboard/rectangle.png" },
  { name: "Cut-To-Letter", price: 24, image: "/assets/images/backboard/cut-to-letter.png" },
  { name: "Naked Neon", price: 40, image: "/assets/images/backboard/naked.png" },
  { name: "Acrylic Stand", price: 40, image: "/assets/images/backboard/stand.png" },
  { name: "Open Box", price: 72, image: "/assets/images/backboard/open-box.png" },
]

const backboardColors = [
  { name: "Standard clear acrylic backboard", price: 0, color: "#ffffff" },
  { name: "Glossy White acrylic backboard", price: 10, color: "#f8f8f8" },
  { name: "Glossy Black acrylic backboard", price: 10, color: "#000000" },
  { name: "Silver acrylic backboard", price: 20, color: "#c0c0c0" },
  { name: "Gold acrylic backboard", price: 20, color: "#ffd700" },
]

// Components
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

const ColorSelector = ({ colors, setColor }) => {
  return (
    <div className="color-container tablet">
      <h5 className="mla-7">Select your Color</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color cont"
            style={{ backgroundColor: color.iconColor }}
            onClick={() => setColor(color)}
          ></div>
        ))}
      </div>
    </div>
  )
}

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

const LocationSelector = ({ isOutdoor, setIsOutdoor }) => {
  return (
    <div className="mt-4">
      <h5 className="mla-7">Indoor or Outdoor</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        <div
          className={`cont size d-flex justify-content-around align-items-center flex-row ${!isOutdoor ? "active" : ""}`}
          onClick={() => setIsOutdoor(false)}
        >
          <div className="p-1">Indoor</div>
        </div>
        <div
          className={`cont size d-flex justify-content-around align-items-center flex-row ${isOutdoor ? "active" : ""}`}
          onClick={() => setIsOutdoor(true)}
        >
          <div className="p-1">
            <div>IP67 Waterproof Technology*</div>
            <div className="text-primary">+ $54</div>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted mt-2">
        Indoor Signs are not suitable for use outdoors or anywhere they might get wet. Inappropriate use will void the
        warranty.
      </p>
    </div>
  )
}

const BackboardSelector = ({ styles, style, setStyle, colors, color, setColor }) => {
  return (
    <div className="mt-4">
      <h5 className="mla-7">Backboard Style</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        {styles.map((s, index) => (
          <div
            key={index}
            className={`cont size d-flex justify-content-around align-items-center flex-row ${style.name === s.name ? "active" : ""}`}
            onClick={() => setStyle(s)}
          >
            <div className="p-1">
              <img src={s.image || "/placeholder.svg"} alt={s.name} className="w-100 mb-2" />
              <div>{s.name}</div>
              <div className="text-primary">{s.price ? `+$${s.price}` : "FREE"}</div>
            </div>
          </div>
        ))}
      </div>
      <h5 className="mla-7 mt-4">Backboard Color</h5>
      <div className="d-flex justify-content-start align-items-start flex-wrap text-center sizes w-100">
        {colors.map((c, index) => (
          <div
            key={index}
            className={`cont size d-flex justify-content-around align-items-center flex-row ${color.name === c.name ? "active" : ""}`}
            onClick={() => setColor(c)}
          >
            <div className="p-1 d-flex align-items-center">
              <div
                className="color-preview mr-2"
                style={{ width: "20px", height: "20px", backgroundColor: c.color, border: "1px solid #ddd" }}
              ></div>
              <div>
                <div>{c.name}</div>
                <div className="text-primary">{c.price ? `+$${c.price}` : "FREE"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const OptionsSelector = ({ options, setOptions }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div>
      <div className="row w-100 mt-5">
        <h5 className="col-md-6">Power adapter</h5>
        <select
          name="powerAdapter"
          id="power_adapter"
          className="col-md-6"
          value={options.powerAdapter}
          onChange={handleChange}
        >
          <option value="USA / CANADA 120V">USA / CANADA 120V</option>
          <option value="UK / IRELAND 230V">UK / IRELAND 230V</option>
          <option value="EUROPE 230V">EUROPE 230V</option>
          <option value="AUSTRALIA / NZ 230V">AUSTRALIA / NZ 230V</option>
          <option value="JAPAN 100V">JAPAN 100V</option>
        </select>
      </div>
      <div className="d-flex checkboxes w-100 mt-5">
        <div className="check customcb">
          <input
            type="checkbox"
            checked={options.bumperSale}
            id="bumper_sale"
            name="bumperSale"
            onChange={handleChange}
          />
          <label className="inner" htmlFor="bumper_sale"></label>
        </div>
        <h5 className="mla-4">
          <label htmlFor="bumper_sale">
            Special offer: Remote and Dimmer <span className="text-primary">Free</span>
          </label>
        </h5>
      </div>
      <div className="d-flex checkboxes w-100 mt-3">
        <div className="check customcb">
          <input type="checkbox" checked={options.hanging} id="hanging" name="hanging" onChange={handleChange} />
          <label className="inner" htmlFor="hanging"></label>
        </div>
        <h5 className="mla-4">
          <label htmlFor="hanging">Sign Hanging Kit $15</label>
        </h5>
      </div>
      <div className="d-flex checkboxes w-100 mt-3">
        <div className="check customcb">
          <input
            type="checkbox"
            checked={options.wallMounting}
            id="wall_mounting"
            name="wallMounting"
            onChange={handleChange}
          />
          <label className="inner" htmlFor="wall_mounting"></label>
        </div>
        <h5 className="mla-4">
          <label htmlFor="wall_mounting">Sign Wall Mounting Kit $15</label>
        </h5>
      </div>
      <p className="text-sm text-muted mt-3">Rush Order option available at checkout</p>
    </div>
  )
}

const BackgroundSelector = ({ background, setBackground }) => {
  return (
    <div className="background-slider-container">
      {backgrounds.map((bg, index) => (
        <img
          key={index}
          className={`bgs ${bg === background ? "active" : ""}`}
          src={bg || "/placeholder.svg"}
          alt={`Background ${index + 1}`}
          onClick={() => setBackground(bg)}
        />
      ))}
    </div>
  )
}

const NeonPreview = ({ text, font, color, background, setBackground, size }) => {
  const nodeRef = useRef(null)

  const getBackgroundSize = () => {
    const baseSize = 100
    const scaleFactor = size.length / sizes[0].length
    return `${baseSize * scaleFactor}%`
  }

  return (
    <div className="editing imagePreview position-relative">
      <div
        className="editing mover"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: getBackgroundSize(),
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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
      <BackgroundSelector background={background} setBackground={setBackground} />
    </div>
  )
}

const NeonDesigner = () => {
  const [text, setText] = useState("")
  const [font, setFont] = useState(fonts[0])
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(sizes[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [isOutdoor, setIsOutdoor] = useState(false)
  const [backboardStyle, setBackboardStyle] = useState(backboardStyles[0])
  const [backboardColor, setBackboardColor] = useState(backboardColors[0])
  const [options, setOptions] = useState({
    powerAdapter: "USA / CANADA 120V",
    bumperSale: true,
    hanging: false,
    wallMounting: false,
  })
  const [totalPrice, setTotalPrice] = useState(84)

  useEffect(() => {
    updatePrice()
  }, [size, isOutdoor, backboardStyle, backboardColor, options])

  const updatePrice = () => {
    let price = size.price
    if (isOutdoor) price += 54
    price += backboardStyle.price
    price += backboardColor.price
    if (options.hanging) price += 15
    if (options.wallMounting) price += 15
    setTotalPrice(price)
  }

  const handleAddToCart = () => {
    const message = encodeURIComponent(`I'd like to order a custom neon sign:
Text: ${text}
Font: ${font.name}
Color: ${color.name}
Size: ${size.name}
Indoor/Outdoor: ${isOutdoor ? "Outdoor" : "Indoor"}
Backboard Style: ${backboardStyle.name}
Backboard Color: ${backboardColor.name}
Options: ${JSON.stringify(options)}
Total Price: $${totalPrice}`)
    window.open(`https://wa.me/7806844491?text=${message}`, "_blank")
  }

  return (
    <section className="tabs page1">
      <div className="d-sm-flex w-100 align-items-center">
        <div className="name d-flex justify-content-start flex-column w-100">
          <div>
            <span className="maxine-title">Custom NeonZ</span>
          </div>
          <div className="sub-title text-center w-100" style={{ fontSize: "34px", fontWeight: 700 }}>
            Design your slang!
          </div>
        </div>
      </div>
      <div className="d-sm-flex w-100 h-100 justify-content-start align-items-start mt-3 cont-Pre-Edit">
        <NeonPreview
          text={text}
          font={font}
          color={color}
          background={background}
          setBackground={setBackground}
          size={size}
        />
        <div className="editing editor-container">
          <div className="content-editor w-100 h-100">
            <div className="w-100 header row">
              <div className="d-flex justify-content-center align-items-center items col-md-4 tabs active">
                Design Your Sign
              </div>
            </div>
            <div className="p-2 w-100 all-content">
              <TextEditor text={text} setText={setText} />
              <FontSelector fonts={fonts} setFont={setFont} />
              <ColorSelector colors={colors} setColor={setColor} />
              <SizeSelector sizes={sizes} size={size} setSize={setSize} />
              <LocationSelector isOutdoor={isOutdoor} setIsOutdoor={setIsOutdoor} />
              <BackboardSelector
                styles={backboardStyles}
                style={backboardStyle}
                setStyle={setBackboardStyle}
                colors={backboardColors}
                color={backboardColor}
                setColor={setBackboardColor}
              />
              <OptionsSelector options={options} setOptions={setOptions} />
              <div className="repel d-flex justify-content-start m-auto align-items-center flex-wrap text-center sizes w-100 pt-2 pb-2 cont total-amount">
                <div className="col-md-6 a2">Total Amount :</div>
                <div className="col-md-6 h price amount" id="OverallAmount">
                  ${totalPrice}
                </div>
              </div>
              <div className="cart-btn d-flex justify-content-center align-items-center flex-wrap text-center sizes pt-2 pb-2 btn a2">
                <button className="col-md-12 cart" id="add_cart" onClick={handleAddToCart}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NeonDesigner

