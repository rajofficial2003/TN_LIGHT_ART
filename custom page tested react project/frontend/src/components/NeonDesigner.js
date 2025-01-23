import React, { useState, useEffect } from "react"
import { fonts, colors, sizes, backgrounds } from "../data/designerData"
import TextEditor from "./TextEditor"
import FontSelector from "./FontSelector"
import ColorSelector from "./ColorSelector"
import SizeSelector from "./SizeSelector"
import OptionsSelector from "./OptionsSelector"
import BackgroundSelector from "./BackgroundSelector"
import NeonPreview from "./NeonPreview"

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
  }, [size, options])

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

