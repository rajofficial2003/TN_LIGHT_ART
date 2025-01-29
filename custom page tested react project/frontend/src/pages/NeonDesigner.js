import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"

// Data that was previously in a separate file
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
    name: "Orange",
    color: "rgb(255, 255, 255)",
    iconColor: "orange",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 141 2) 0px 0px 20px, rgb(255 141 2) 0px 0px 30px, rgb(255 141 2) 0px 0px 40px, rgb(255 141 2) 0px 0px 55px, rgb(255 141 2) 0px 0px 75px",
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
    name: "Deep Pink",
    color: "rgb(255, 255, 255)",
    iconColor: "deeppink",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 92 232) 0px 0px 20px, rgb(255 92 232) 0px 0px 30px, rgb(255 92 232) 0px 0px 40px, rgb(255 92 232) 0px 0px 55px, rgb(255 92 232) 0px 0px 75px",
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
    iconColor: "blue",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(99 170 255) 0px 0px 20px, rgb(99 170 255) 0px 0px 30px, rgb(99 170 255) 0px 0px 40px, rgb(99 170 255) 0px 0px 55px, rgb(99 170 255) 0px 0px 75px",
  },
  {
    name: "Green",
    color: "rgb(255, 255, 255)",
    iconColor: "green",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(11 215 72) 0px 0px 20px, rgb(11 215 72) 0px 0px 30px, rgb(11 215 72) 0px 0px 40px, rgb(11 215 72) 0px 0px 55px, rgb(11 215 72) 0px 0px 75px",
  },
]

const sizes = [
  { name: "Small", price: 99, length: 24, height: 12, code: "cnz1" },
  { name: "Medium", price: 125, length: 36, height: 18, code: "cnz2" },
  { name: "Large", price: 150, length: 48, height: 24, code: "cnz3" },
  { name: "X Large", price: 165, length: 60, height: 30, code: "cnz4" },
  { name: "XX Large", price: 190, length: 72, height: 36, code: "cnz5" },
  { name: "Collosal", price: 230, length: 84, height: 42, code: "cnz6" },
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
          <option value="UK / IRELAND 230V">UK / IRELAND 230V</option>
          <option value="EUROPE 230V">EUROPE 230V</option>
          <option value="USA / CANADA 120V">USA / CANADA 120V</option>
          <option value="AUSTRALIA / NZ 230V">AUSTRALIA / NZ 230V</option>
          <option value="JAPAN 100V">JAPAN 100V</option>
        </select>
      </div>
      <div className="row w-100 mt-3">
        <h5 className="col-md-6">Backboard shape</h5>
        <select
          name="backboardShape"
          id="backboard_shape"
          className="col-md-6"
          value={options.backboardShape}
          onChange={handleChange}
        >
          <option value="1">Cut Around Acrylic: Hang/Wall-mount</option>
          <option value="2">Rectangle Acrylic: Hang/Wall-mount</option>
          <option value="3">Cut To Letter: Hang/Wall-mount +21$</option>
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
            <b>Free</b> Bumper Sale: Remote and Dimmer
          </label>
        </h5>
      </div>
      <div className="d-flex checkboxes w-100 mt-3">
        <div className="check customcb">
          <input type="checkbox" checked={options.hanging} id="hanging" name="hanging" onChange={handleChange} />
          <label className="inner" htmlFor="hanging"></label>
        </div>
        <h5 className="mla-4 ">
          <label htmlFor="hanging">Sign Hanging chain Kit $15</label>
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

const NeonDesigner = () => {
  const [text, setText] = useState("")
  const [font, setFont] = useState(fonts[0])
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState(sizes[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [options, setOptions] = useState({
    powerAdapter: "UK / IRELAND 230V",
    backboardShape: "1",
    bumperSale: true,
    hanging: false,
    wallMounting: false,
  })
  const [totalPrice, setTotalPrice] = useState(99)
  const [activeTab, setActiveTab] = useState("text")

  useEffect(() => {
    updatePrice()
  }, [size, options]) //This line was already correct

  const updatePrice = () => {
    let price = size.price
    if (options.backboardShape === "3") price += 21
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
        <NeonPreview text={text} font={font} color={color} background={background} />
        <div className="editing editor-container">
          <div className="content-editor w-100 h-100">
            <div className="w-100 header row">
              <div
                className={`d-flex justify-content-center align-items-center items col-md-4 tabs ${activeTab === "text" ? "active" : ""}`}
                onClick={() => setActiveTab("text")}
              >
                Text
              </div>
              <div
                className={`d-flex justify-content-center align-items-center items col-md-4 tabs ${activeTab === "font" ? "active" : ""}`}
                onClick={() => setActiveTab("font")}
              >
                Font
              </div>
              <div
                className={`d-flex justify-content-center align-items-center items col-md-4 tabs ${activeTab === "color" ? "active" : ""}`}
                onClick={() => setActiveTab("color")}
              >
                Color
              </div>
            </div>
            <div className="p-2 w-100 all-content">
              {activeTab === "text" && <TextEditor text={text} setText={setText} />}
              {activeTab === "font" && <FontSelector fonts={fonts} setFont={setFont} />}
              {activeTab === "color" && <ColorSelector colors={colors} setColor={setColor} />}
              <SizeSelector sizes={sizes} size={size} setSize={setSize} />
              <OptionsSelector options={options} setOptions={setOptions} />
              <BackgroundSelector background={background} setBackground={setBackground} />
              <div className="repel d-flex justify-content-start m-auto align-items-center flex-wrap text-center sizes w-100 pt-2 pb-2 cont total-amount">
                <div className="col-md-6 a2">Total Amount :</div>
                <div className="col-md-6 h price amount" id="OverallAmount">
                  ${totalPrice}
                </div>
              </div>
              <div className="cart-btn d-flex justify-content-center align-items-center flex-wrap text-center sizes pt-2 pb-2 btn a2">
                <button className="col-md-12 cart" id="add_cart" onClick={handleAddToCart}>
                  Add to Cart
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

