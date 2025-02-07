import { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import Header from "../Components/Header"
import SingleFooter from "../Components/Footer"
import "./NeonDesigner.css"
import styled, { keyframes } from "styled-components"

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

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg,
    #000000 0%,
    #40e0d0 50%,
    #000000 100%
  );
  background-size: 1000px 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmerAnimation} 8s linear infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

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
    name: "Ice Blue",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(0, 255, 255)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(0 255 255) 0px 0px 20px, rgb(0 255 255) 0px 0px 30px, rgb(0 255 255) 0px 0px 40px, rgb(0 255 255) 0px 0px 55px, rgb(0 255 255) 0px 0px 75px",
  },
  {
    name: "Mint Green",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(0, 255, 128)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(0 255 128) 0px 0px 20px, rgb(0 255 128) 0px 0px 30px, rgb(0 255 128) 0px 0px 40px, rgb(0 255 128) 0px 0px 55px, rgb(0 255 128) 0px 0px 75px",
  },
  {
    name: "Lime Green",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(0, 255, 0)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 10px, rgb(0 255 0) 0px 0px 20px, rgb(0 255 0) 0px 0px 30px, rgb(0 255 0) 0px 0px 40px, rgb(0 255 0) 0px 0px 55px, rgb(0 255 0) 0px 0px 75px",
  },
  {
    name: "Purple",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 0, 255)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 0 255) 0px 0px 20px, rgb(255 0 255) 0px 0px 30px, rgb(255 0 255) 0px 0px 40px, rgb(255 0 255) 0px 0px 55px, rgb(255 0 255) 0px 0px 75px",
  },
]

const sizes = [
  { name: "Small", price: 99, length: 24, height: 12, code: "cnz1" },
  { name: "Medium", price: 149, length: 36, height: 18, code: "cnz2" },
  { name: "Large", price: 199, length: 48, height: 24, code: "cnz3" },
  { name: "X-Large", price: 249, length: 60, height: 30, code: "cnz4" },
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
  "/assets/images/background/background9.jpg",
  "/assets/images/background/background10.jpg",
]

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
  const [isMobile, setIsMobile] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    updatePrice()
  }, [size, options]) //This line remains unchanged as it is not the target of the update.

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
    <div className="neon-designer-wrapper">
      <Header />
      <div className="neon-designer-container mt-5">
        <div className="neonDesigner">
          <MainTitle className="text-center mt-5">Design your slang!</MainTitle>
          <div className={`editing ${isMobile ? "mobile-view" : ""}`}>
            <div className={`preview-column ${isMobile ? "mobile-preview" : ""}`} ref={previewRef}>
              <NeonPreview text={text} font={font} color={color} background={background} />
              <BackgroundSelector background={background} setBackground={setBackground} />
            </div>
            <div className="editor-column">
              <div className="editor-container">
                <div className="content-editor">
                  <TextEditor text={text} setText={setText} />
                  <FontSelector fonts={fonts} setFont={setFont} />
                  <ColorSelector colors={colors} color={color} setColor={setColor} />
                  <SizeSelector sizes={sizes} size={size} setSize={setSize} />
                  <OptionsSelector options={options} setOptions={setOptions} />
                  <div className="total-amount">
                    <div>Total Amount :</div>
                    <div>${totalPrice}</div>
                  </div>
                  <button className="cart-btn" >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SingleFooter />
    </div>
  )
}

const NeonPreview = ({ text, font, color, background }) => {
  const nodeRef = useRef(null)

  return (
    <div className="imagePreview">
      <div className="mover" style={{ backgroundImage: `url(${background})` }}>
        <Draggable nodeRef={nodeRef} bounds="parent">
          <p
            ref={nodeRef}
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

const TextEditor = ({ text, setText }) => {
  return (
    <div className="text-container">
      <h5>Enter Your Text</h5>
      <textarea
        id="type_text"
        rows="5"
        placeholder="Enter Text Here.. Press Enter for a new Line"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

const FontSelector = ({ fonts, setFont }) => {
  return (
    <div className="font-container">
      <h5>Select your Font</h5>
      <div className="font-grid">
        {fonts.map((font, index) => (
          <div key={index} className="cont font" onClick={() => setFont(font)}>
            <img src={font.image || "/placeholder.svg"} alt={font.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

const ColorSelector = ({ colors, color, setColor }) => {
  return (
    <div className="color-container">
      <h5>Select your Color</h5>
      <div className="color-grid">
        {colors.map((c, index) => (
          <div
            key={index}
            className={`color cont ${c.name === color.name ? "active" : ""}`}
            style={{ backgroundColor: c.iconColor }}
            onClick={() => setColor(c)}
          >
            <i className="material-icons"></i>
          </div>
        ))}
      </div>
    </div>
  )
}

const SizeSelector = ({ sizes, size, setSize }) => {
  return (
    <div className="size-selector">
      <h5>Select your Size</h5>
      {sizes.map((sizeOption, index) => (
        <div
          key={index}
          className={`cont size ${size.name === sizeOption.name ? "active" : ""}`}
          onClick={() => setSize(sizeOption)}
        >
          <div>
            <div className="text-lg">{sizeOption.name}</div>
            <div className="text-lg">${sizeOption.price}</div>
          </div>
          <div>
            <div className="text-sm">Length: {sizeOption.length}"</div>
            <div className="text-sm">Height: {sizeOption.height}"</div>
          </div>
        </div>
      ))}
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
    <div className="options-selector">
      <h5>Additional Options</h5>
      <select name="powerAdapter" value={options.powerAdapter} onChange={handleChange}>
        <option value="UK / IRELAND 230V">UK / IRELAND 230V</option>
        <option value="EUROPE 230V">EUROPE 230V</option>
        <option value="USA / CANADA 120V">USA / CANADA 120V</option>
        <option value="AUSTRALIA / NZ 230V">AUSTRALIA / NZ 230V</option>
        <option value="JAPAN 100V">JAPAN 100V</option>
      </select>
      <select name="backboardShape" value={options.backboardShape} onChange={handleChange}>
        <option value="1">Cut Around Acrylic: Hang/Wall-mount</option>
        <option value="2">Rectangle Acrylic: Hang/Wall-mount</option>
        <option value="3">Cut To Letter: Hang/Wall-mount +21$</option>
      </select>
      <div className="checkboxes">
        <div className="customcb check">
          <input
            type="checkbox"
            checked={options.bumperSale}
            id="bumper_sale"
            name="bumperSale"
            onChange={handleChange}
          />
          <label htmlFor="bumper_sale" className="inner"></label>
        </div>
        <label htmlFor="bumper_sale" className="outer">
          <b>Free</b> Bumper Sale: Remote and Dimmer
        </label>
      </div>
      <div className="checkboxes">
        <div className="customcb check">
          <input type="checkbox" checked={options.hanging} id="hanging" name="hanging" onChange={handleChange} />
          <label htmlFor="hanging" className="inner"></label>
        </div>
        <label htmlFor="hanging" className="outer">
          Sign Hanging chain Kit $15
        </label>
      </div>
      <div className="checkboxes">
        <div className="customcb check">
          <input
            type="checkbox"
            checked={options.wallMounting}
            id="wall_mounting"
            name="wallMounting"
            onChange={handleChange}
          />
          <label htmlFor="wall_mounting" className="inner"></label>
        </div>
        <label htmlFor="wall_mounting" className="outer">
          Sign Wall Mounting Kit $15
        </label>
      </div>
    </div>
  )
}

export default NeonDesigner
