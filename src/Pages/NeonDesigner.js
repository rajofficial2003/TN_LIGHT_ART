import React, { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import Header from "../Components/Header"
import SingleFooter from "../Components/Footer"

// Inline CSS styles
const styles = `
* {
    box-sizing: border-box;
    user-select: none;
    -webkit-user-drag: none;
}

body, html {
    margin: 0;
    padding: 0;
    font-family: 'Gothic A1', sans-serif;
    font-size: 16px;
}

.neonDesigner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    margin-top:80px;
}

.maxine-title {
    font-family: maxine, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 85px;
    line-height: 129px;
    background: linear-gradient(264.14deg, #EF19F3 2.71%, #971BF8 54.65%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
}

.sub-title {
    font-style: normal;
    font-weight: 500;
    font-size: 54px;
    line-height: 65px;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
}

.editing {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;
}

.imagePreview {
    width: 65%;
    height: 500px;
    background-color: #F9F9F9;
    border-radius: 33px;
    overflow: hidden;
    position: relative;
}

.mover {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

#typed_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3em;
    text-align: center;
    color: #ffffff;
    cursor: move;
    white-space: nowrap;
}

.editor-container {
    width: 33%;
    background-image: linear-gradient(180deg, #FBF225 0%, #86F21B 16.98%, #17FEFE 33.65%, #6B1CED 50.31%, #C024F7 67.5%, #FC1D95 83.65%, #F72424 100%);
    border-radius: 33px;
    padding: 2px;
}

.content-editor {
    background-color: #F9F9F9;
    border-radius: 30px;
    overflow: hidden;
}

.header {
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    border-bottom: 1px solid #efefef;
}

.items {
    padding: 15px;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
}

.items.active {
    background-color: #C746F8;
    color: white;
}

.all-content {
    padding: 20px;
}

.text-container textarea {
    width: 100%;
    height: 100px;
    border-radius: 15px;
    resize: none;
    background: #EFEFEF;
    border: none;
    font-size: 18px;
    padding: 15px;
    text-align: center;
}

.font-container,
.color-container {
    margin-top: 20px;
}

.font-container h5,
.color-container h5 {
    margin-bottom: 10px;
}

.font-grid,
.color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
}

.cont.font,
.color.cont {
    width: 80px;
    height: 80px;
    background-color: #EFEFEF;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.cont.font img {
    max-width: 100%;
    max-height: 100%;
}

.color.cont i {
    font-size: 40px;
}

.size-selector {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
}

.cont.size {
    background-color: #EFEFEF;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
}

.cont.size.active {
    border: 1px solid #D930F4;
    background: white;
}

.options-selector {
    margin-top: 20px;
}

.options-selector select {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 1px solid #EF19F3;
}

.checkboxes {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.customcb {
    width: 25px;
    height: 25px;
    border: 2px solid black;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
}

.customcb input {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.customcb label.inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    cursor: pointer;
}

.customcb input:checked + label.inner {
    background: #FD95FF;
}

.cont.total-amount {
    margin-top: 20px;
    background-color: #EFEFEF;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-btn {
    margin-top: 20px;
    width: 100%;
}

.cart-btn button {
    width: 100%;
    padding: 15px;
    background: #F36AB4;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: 900;
    font-size: 21px;
    cursor: pointer;
}

.background-slider-container {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
    margin-top: 20px;
}

.background-slider-container img {
    width: 100px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.background-slider-container img.active {
    border: 2px solid #C746F8;
}

@media (max-width: 768px) {
    .editing {
        flex-direction: column;
    }

    .imagePreview,
    .editor-container {
        width: 100%;
        margin-bottom: 20px;
    }

    .header {
        overflow-x: auto;
        white-space: nowrap;
    }

    .items {
        display: inline-block;
    }
}

@font-face {
    font-family: 'Alexa';
    src: url('../assets/css/fonts/custom/Alexa.ttf') format('truetype');
}

@font-face {
    font-family: 'Amanda';
    src: url('../assets/css/fonts/custom/Amanda.ttf') format('truetype');
}

@font-face {
    font-family: 'Amsterdam';
    src: url('../assets/css/fonts/custom/Amsterdam.ttf') format('truetype');
}

@font-face {
    font-family: 'Austin';
    src: url('../assets/css/fonts/custom/Austin.ttf') format('truetype');
}

@font-face {
    font-family: 'Avante';
    src: url('../assets/css/fonts/custom/Avante.ttf') format('truetype');
}

@font-face {
    font-family: 'Barcelona';
    src: url('../assets/css/fonts/custom/Barcelona.ttf') format('truetype');
}

@font-face {
    font-family: 'Bayview';
    src: url('../assets/css/fonts/custom/Bayview.ttf') format('truetype');
}

@font-face {
    font-family: 'Beachfront';
    src: url('../assets/css/fonts/custom/Beachfront.ttf') format('truetype');
}

@font-face {
    font-family: 'Bellview';
    src: url('../assets/css/fonts/custom/Bellview.ttf') format('truetype');
}

@font-face {
    font-family: 'Buttercup';
    src: url('../assets/css/fonts/custom/Buttercup.ttf') format('truetype');
}

@font-face {
    font-family: 'Chelsea';
    src: url('../assets/css/fonts/custom/Chelsea.ttf') format('truetype');
}

@font-face {
    font-family: 'ClassicType';
    src: url('../assets/css/fonts/custom/ClassicType.ttf') format('truetype');
}

@font-face {
    font-family: 'Freehand';
    src: url('../assets/css/fonts/custom/Freehand.ttf') format('truetype');
}

@font-face {
    font-family: 'Freespirit';
    src: url('../assets/css/fonts/custom/Freespirit.ttf') format('truetype');
}

@font-face {
    font-family: 'Greenworld';
    src: url('../assets/css/fonts/custom/Greenworld.ttf') format('truetype');
}

@font-face {
    font-family: 'LoveNeon';
    src: url('../assets/css/fonts/custom/LoveNeon.ttf') format('truetype');
}

@font-face {
    font-family: 'LoveNote';
    src: url('../assets/css/fonts/custom/LoveNote.ttf') format('truetype');
}

@font-face {
    font-family: 'Marquee';
    src: url('../assets/css/fonts/custom/Marquee.ttf') format('truetype');
}

@font-face {
    font-family: 'Mayfair';
    src: url('../assets/css/fonts/custom/Mayfair.ttf') format('truetype');
}

@font-face {
    font-family: 'Melbourne';
    src: url('../assets/css/fonts/custom/Melbourne.ttf') format('truetype');
}

@font-face {
    font-family: 'Monaco';
    src: url('../assets/css/fonts/custom/Monaco.ttf') format('truetype');
}

@font-face {
    font-family: 'NeonGlow';
    src: url('../assets/css/fonts/custom/NeonGlow.ttf') format('truetype');
}

@font-face {
    font-family: 'NeonLite';
    src: url('../assets/css/fonts/custom/NeonLite.ttf') format('truetype');
}

@font-face {
    font-family: 'Neonscript';
    src: url('../assets/css/fonts/custom/Neonscript.ttf') format('truetype');
}

@font-face {
    font-family: 'Neontrace';
    src: url('../assets/css/fonts/custom/Neontrace.ttf') format('truetype');
}

@font-face {
    font-family: 'NeoTokyo';
    src: url('../assets/css/fonts/custom/NeoTokyo.ttf') format('truetype');
}

@font-face {
    font-family: 'Nevada';
    src: url('../assets/css/fonts/custom/Nevada.ttf') format('truetype');
}

@font-face {
    font-family: 'NewCursive';
    src: url('../assets/css/fonts/custom/NewCursive.ttf') format('truetype');
}

@font-face {
    font-family: 'Northshore';
    src: url('../assets/css/fonts/custom/Northshore.ttf') format('truetype');
}

@font-face {
    font-family: 'Photogenic';
    src: url('../assets/css/fonts/custom/Photogenic.ttf') format('truetype');
}

@font-face {
    font-family: 'Rocket';
    src: url('../assets/css/fonts/custom/Rocket.ttf') format('truetype');
}

@font-face {
    font-family: 'Royalty';
    src: url('../assets/css/fonts/custom/Royalty.ttf') format('truetype');
}

@font-face {
    font-family: 'SciFi';
    src: url('../assets/css/fonts/custom/SciFi.ttf') format('truetype');
}

@font-face {
    font-family: 'Signature';
    src: url('../assets/css/fonts/custom/Signature.ttf') format('truetype');
}

@font-face {
    font-family: 'Sorrento';
    src: url('../assets/css/fonts/custom/Sorrento.ttf') format('truetype');
}

@font-face {
    font-family: 'Typewriter';
    src: url('../assets/css/fonts/custom/Typewriter.ttf') format('truetype');
}

@font-face {
    font-family: 'Venetian';
    src: url('../assets/css/fonts/custom/Venetian.ttf') format('truetype');
}

@font-face {
    font-family: 'Vintage';
    src: url('../assets/css/fonts/custom/Vintage.ttf') format('truetype');
}

@font-face {
    font-family: 'Waikiki';
    src: url('../assets/css/fonts/custom/Waikiki.ttf') format('truetype');
}

@font-face {
    font-family: 'WildScript';
    src: url('../assets/css/fonts/custom/WildScript.ttf') format('truetype');
}
`;

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
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(0 255 0) 0px 0px 20px, rgb(0 255 0) 0px 0px 30px, rgb(0 255 0) 0px 0px 40px, rgb(0 255 0) 0px 0px 55px, rgb(0 255 0) 0px 0px 75px",
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
    <div className="color-container">
      <h5>Select your Color</h5>
      <div className="color-grid">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color cont"
            style={{ color: color.iconColor }}
            onClick={() => setColor(color)}
          >
            <i className="material-icons">highlight</i>
          </div>
        ))}
      </div>
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
        <label htmlFor="hanging" className="outer">Sign Hanging chain Kit $15</label>
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
        <label htmlFor="wall_mounting" className="outer">Sign Wall Mounting Kit $15</label>
      </div>
    </div>
  )
}

const SizeSelector = ({ sizes, size, setSize }) => {
  return (
    <div className="size-selector">
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

const TextEditor = ({ text, setText }) => {
  return (
    <div className="text-container">
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
   <div className="">
       <Header />
     <div className="neonDesigner">
      <style>{styles}</style>
   
      <section className="tabs">
        <div className="maxine-title">Custom NeonZ</div>
        <div className="sub-title">Design your slang!</div>
        <div className="editing">
          <NeonPreview text={text} font={font} color={color} background={background} />
          <div className="editor-container">
            <div className="content-editor">
              <div className="header">
                <div
                  className={`items ${activeTab === "text" ? "active" : ""}`}
                  onClick={() => setActiveTab("text")}
                >
                  Text
                </div>
                <div
                  className={`items ${activeTab === "font" ? "active" : ""}`}
                  onClick={() => setActiveTab("font")}
                >
                  Font
                </div>
                <div
                  className={`items ${activeTab === "color" ? "active" : ""}`}
                  onClick={() => setActiveTab("color")}
                >
                  Color
                </div>
              </div>
              <div className="all-content">
                {activeTab === "text" && <TextEditor text={text} setText={setText} />}
                {activeTab === "font" && <FontSelector fonts={fonts} setFont={setFont} />}
                {activeTab === "color" && <ColorSelector colors={colors} setColor={setColor} />}
                <SizeSelector sizes={sizes} size={size} setSize={setSize} />
                <OptionsSelector options={options} setOptions={setOptions} />
                <BackgroundSelector background={background} setBackground={setBackground} />
                <div className="cont total-amount">
                  <div className="h">Total Amount :</div>
                  <div className="h">${totalPrice}</div>
                </div>
                <div className="cart-btn">
                  <button className="btn a2" onClick={handleAddToCart}>
                    <div className="cart">Add to Cart</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </div>
    <SingleFooter />
   </div>
  )
}

export default NeonDesigner