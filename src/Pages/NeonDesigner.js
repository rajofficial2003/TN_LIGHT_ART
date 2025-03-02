"use client"

import { useState, useEffect, useRef } from "react"
import Draggable from "react-draggable"
import { Minus, Plus } from "lucide-react"
import Header from "../Components/Header"
import SingleFooter from "../Components/Footer"
import "./NeonDesigner.css"
import styled, { keyframes } from "styled-components"
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore"
import { db } from "../Firebase/firebase"

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
    iconColor: "rgb(99, 170, 255)",
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
    name: "Purple",
    color: "rgb(255, 255, 255)",
    iconColor: "rgb(255, 0, 255)",
    neon: "rgb(255 255 255) 0px 0px 5px, rgb(255 255 255) 0px 0px 10px, rgb(255 0 255) 0px 0px 20px, rgb(255 0 255) 0px 0px 30px, rgb(255 0 255) 0px 0px 40px, rgb(255 0 255) 0px 0px 55px, rgb(255 0 255) 0px 0px 75px",
  },
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

const sizes = [
  { id: "regular", name: "Regular", description: 'H ~6" x W (as per letters)' },
  { id: "medium", name: "Medium", description: 'H ~9" x W (as per letters)' },
  { id: "large", name: "Large", description: 'H ~12" x W (as per letters)' },
]

const dimmers = [
  { id: "no-dimmer", name: "No Dimmer", image: "../dimmer-images/No-Dimmer.jpg", price: 0 },
  { id: "smart-dimmer", name: "Dimmer-Knob", image: "../dimmer-images/Dimmer-Knob.jpg", price: 1000 },
  { id: "remote-dimmer", name: "Remote Dimmer", image: "../dimmer-images/Mini-IR-Dimmer.jpg", price: 500 },
]

const backboardColors = [
  { id: "clear", name: "Standard clear acrylic backboard", color: "transparent" },
  { id: "white", name: "Glossy White acrylic backboard", color: "#FFFFFF" },
  { id: "black", name: "Glossy Black acrylic backboard", color: "#000000" },
  { id: "silver", name: "Silver acrylic backboard", color: "#C0C0C0" },
  { id: "gold", name: "Gold acrylic backboard", color: "#FFD700" },
]

const backboardStyles = [
  { id: "cut-around", name: "Cut Around" },
  { id: "rectangle", name: "Rectangle" },
  { id: "cut-to-letter", name: "Cut-To-Letter" },
  { id: "naked-neon", name: "Naked Neon" },
  { id: "acrylic-stand", name: "Acrylic Stand" },
  { id: "open-box", name: "Open Box" },
]

const ProductOptions = styled.div`
  margin: 2rem 0;
`

const SizeSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`

const SizeOption = styled.button`
  padding: 1rem;
  border: 2px solid ${(props) => (props.selected ? "#40E0D0" : "#ddd")};
  border-radius: 8px;
  background: ${(props) => (props.selected ? "rgba(64, 224, 208, 0.1)" : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #40E0D0;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;

    h3 {
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
`

const DimmerSelector = styled.div`
  margin: 2rem 0;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .dimmer-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
  }
`

const DimmerOption = styled.button`
  border: 2px solid ${(props) => (props.selected ? "#40E0D0" : "#ddd")};
  border-radius: 8px;
  background: ${(props) => (props.selected ? "rgba(64, 224, 208, 0.1)" : "white")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  &:hover {
    border-color: #40E0D0;
  }

  img {
    width: 100%;
    height: auto;
    margin-bottom: 0.5rem;
    border-radius: 4px;
  }

  .dimmer-name {
    font-size: 0.75rem;
    color: #333;
    margin-bottom: 0.25rem;
    text-align: center;
  }

  .dimmer-price {
    font-size: 0.7rem;
    color: #666;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0.25rem;

    .dimmer-name {
      font-size: 0.7rem;
    }

    .dimmer-price {
      font-size: 0.6rem;
    }
  }
`

const QuantitySelector = styled.div`
  margin: 2rem 0;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 200px;
  }

  button {
    width: 36px;
    height: 36px;
    border: 2px solid #ddd;
    border-radius: 4px;
    background: white;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      border-color: #40E0D0;
      color: #40E0D0;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  input {
    width: 60px;
    height: 36px;
    border: 2px solid #ddd;
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    color: #333;

    &:focus {
      border-color: #40E0D0;
      outline: none;
    }
  }
`

const TrustIndicators = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
      color: #666;
    }
  }
`

const InfoSection = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  button {
    width: 100%;
    padding: 1rem;
    background: white;
    border: none;
    border-bottom: ${(props) => (props.isOpen ? "1px solid #ddd" : "none")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f8f9fa;
    }

    h2 {
      font-size: 1.25rem;
      margin: 0;
      color: #333;
    }

    span {
      font-size: 1.5rem;
      color: #666;
    }
  }

  .content {
    padding: ${(props) => (props.isOpen ? "1rem" : "0")};
    max-height: ${(props) => (props.isOpen ? "500px" : "0")};
    opacity: ${(props) => (props.isOpen ? "1" : "0")};
    transition: all 0.3s ease;
    background: white;
  }
`

const RGBButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin: 20px auto;
  display: block;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;

  &::after {
    content: "RGB COLOR CHANGING";
    position: absolute;
    width: 200px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 5px);
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  &::before {
    content: "Multiple colors with static and dynamic modes";
    position: absolute;
    width: 200px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 25px);
    font-size: 12px;
    color: #666;
  }
`

const BackboardSection = styled.div`
  margin: 2rem 0;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .color-options, .style-options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }
  }

  .backboard-option, .style-option {
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &.selected {
      border-color: #40E0D0;
      background: rgba(64, 224, 208, 0.1);
    }

    .color-preview {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }

    .option-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-align: center;
    }

    .price {
      color: #666;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      padding: 0.5rem;

      .color-preview {
        width: 30px;
        height: 30px;
      }

      .option-details {
        font-size: 0.7rem;
      }

      .price {
        font-size: 0.6rem;
      }
    }
  }
`

const CustomerRightsSection = styled.div`
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #40E0D0;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    position: relative;
    padding-bottom: 0.5rem;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: #40E0D0;
    }
  }

  .rights-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .right-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    h3 {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 0.95rem;
      color: #555;
      line-height: 1.6;
    }
    
    ul {
      padding-left: 1.5rem;
      
      li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        color: #555;
      }
    }
  }
`

const NeonDesigner = () => {
  const [text, setText] = useState("")
  const [font, setFont] = useState(fonts[0])
  const [color, setColor] = useState(colors[0])
  const [background, setBackground] = useState(backgrounds[0])
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedDimmer, setSelectedDimmer] = useState(dimmers[0])
  const [quantity, setQuantity] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const previewRef = useRef(null)
  const [letterPrice, setLetterPrice] = useState(100)
  const [rgbColor, setRgbColor] = useState(colors[0].iconColor)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)
  const [isColorCycling, setIsColorCycling] = useState(false)
  const [selectedBackboardColor, setSelectedBackboardColor] = useState(backboardColors[0])
  const [selectedBackboardStyle, setSelectedBackboardStyle] = useState(backboardStyles[0])
  const [backboardColorPrices, setBackboardColorPrices] = useState({})
  const [backboardStylePrices, setBackboardStylePrices] = useState({})
  const [sizePrices, setSizePrices] = useState({})

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    fetchPrices()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    let intervalId
    if (isColorCycling) {
      intervalId = setInterval(() => {
        setCurrentColorIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % colors.length
          setRgbColor(colors[nextIndex].iconColor)
          return nextIndex
        })
      }, 1000) // Change color every second
    }
    return () => clearInterval(intervalId)
  }, [isColorCycling])

  const fetchPrices = async () => {
    try {
      const settingsCollection = collection(db, "settings")
      const settingsSnapshot = await getDocs(settingsCollection)
      const settingsDoc = settingsSnapshot.docs.find((doc) => doc.id === "global")
      if (settingsDoc) {
        const settingsData = settingsDoc.data()
        if (settingsData) {
          setLetterPrice(settingsData.letterPrice || 100)
          setBackboardColorPrices(settingsData.backboardColorPrices || {})
          setBackboardStylePrices(settingsData.backboardStylePrices || {})
          setSizePrices(settingsData.sizePrices || {})
        }
      }
    } catch (error) {
      console.error("Error fetching prices:", error)
    }
  }

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value))
    setQuantity(newQuantity)
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section)
  }

  const calculatePrice = () => {
    const basePrice = letterPrice * text.length
    const sizeMultiplier = sizePrices[selectedSize.id] || 1
    const dimmerPrice = selectedDimmer.price
    const backboardColorPrice = backboardColorPrices[selectedBackboardColor.id] || 0
    const backboardStylePrice = backboardStylePrices[selectedBackboardStyle.id] || 0
    const subtotal = (basePrice * sizeMultiplier + dimmerPrice + backboardColorPrice + backboardStylePrice) * quantity

    return subtotal
  }

  const handleAddToCart = async () => {
    const totalPrice = calculatePrice()
    const orderData = {
      text,
      font: font.name,
      color: isColorCycling ? "RGB" : color.name,
      rgbColor: rgbColor,
      size: selectedSize.name,
      dimmer: selectedDimmer.name,
      quantity,
      totalPrice,
      timestamp: serverTimestamp(),
      backboardColor: selectedBackboardColor.name,
      backboardStyle: selectedBackboardStyle.name,
    }

    try {
      const docRef = await addDoc(collection(db, "custom-neon-orders"), orderData)
      console.log("Order added with ID: ", docRef.id)

      const message = encodeURIComponent(`I'd like to order a custom neon sign:
Text: ${text}
Font: ${font.name}
Color: ${isColorCycling ? "RGB" : color.name}
Size: ${selectedSize.name}
Dimmer: ${selectedDimmer.name}
Backboard Color: ${selectedBackboardColor.name}
Backboard Style: ${selectedBackboardStyle.name}
Quantity: ${quantity}
Total Price: ₹${totalPrice.toLocaleString()}`)
      window.open(`https://wa.me/9894924809?text=${message}`, "_blank")
    } catch (error) {
      console.error("Error adding order: ", error)
    }
  }

  const toggleColorCycling = () => {
    setIsColorCycling(!isColorCycling)
    if (!isColorCycling) {
      setRgbColor(colors[0].iconColor)
      setCurrentColorIndex(0)
    }
  }

  return (
    <div className="neon-designer-wrapper">
      <Header />
      <div className="neon-designer-container mt-5">
        <div className="neonDesigner">
          <MainTitle className="text-center mt-5">Design your slang!</MainTitle>
          <div className={`editing ${isMobile ? "mobile-view" : ""}`}>
            <div className={`preview-column ${isMobile ? "mobile-preview" : ""}`} ref={previewRef}>
              <NeonPreview
                text={text}
                font={font}
                background={background}
                color={isColorCycling ? { color: rgbColor, neon: colors[currentColorIndex].neon } : color}
              />
              <BackgroundSelector background={background} setBackground={setBackground} />
            </div>
            <div className="editor-column">
              <div className="editor-container">
                <div className="content-editor">
                  <TextEditor text={text} setText={setText} />
                  <FontSelector fonts={fonts} setFont={setFont} />
                  <ColorSelector
                    colors={colors}
                    color={color}
                    setColor={setColor}
                    rgbColor={rgbColor}
                    isColorCycling={isColorCycling}
                    setIsColorCycling={setIsColorCycling}
                    toggleColorCycling={toggleColorCycling}
                    currentColorIndex={currentColorIndex}
                    setRgbColor={setRgbColor}
                  />

                  <ProductOptions>
                    <h2>Size</h2>
                    <SizeSelector>
                      {sizes.map((size) => (
                        <SizeOption
                          key={size.id}
                          selected={selectedSize.id === size.id}
                          onClick={() => setSelectedSize(size)}
                        >
                          <h3>{size.name}</h3>
                          <p>{size.description}</p>
                          <p>Price: ₹{sizePrices[size.id] || 0}</p>
                        </SizeOption>
                      ))}
                    </SizeSelector>

                    <DimmerSelector>
                      <h2>Choose your Dimmer</h2>
                      <div className="dimmer-options">
                        {dimmers.map((dimmer) => (
                          <DimmerOption
                            key={dimmer.id}
                            selected={selectedDimmer.id === dimmer.id}
                            onClick={() => setSelectedDimmer(dimmer)}
                          >
                            <img src={dimmer.image || "/placeholder.svg"} alt={dimmer.name} />
                            <div className="dimmer-name">{dimmer.name}</div>
                            <div className="dimmer-price">
                              {dimmer.price === 0 ? "Included" : `+₹${dimmer.price.toLocaleString()}`}
                            </div>
                          </DimmerOption>
                        ))}
                      </div>
                    </DimmerSelector>

                    <BackboardSection>
                      <h2>Backboard Color</h2>
                      <div className="color-options">
                        {backboardColors.map((backboard) => (
                          <div
                            key={backboard.id}
                            className={`backboard-option ${selectedBackboardColor.id === backboard.id ? "selected" : ""}`}
                            onClick={() => setSelectedBackboardColor(backboard)}
                          >
                            <div className="color-preview" style={{ backgroundColor: backboard.color }} />
                            <div className="option-details">
                              <span>{backboard.name}</span>
                              <span className="price">
                                {backboardColorPrices[backboard.id] === 0
                                  ? "FREE"
                                  : `+₹${backboardColorPrices[backboard.id] || 0}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </BackboardSection>

                    <BackboardSection>
                      <h2>Backboard Style</h2>
                      <div className="style-options">
                        {backboardStyles.map((style) => (
                          <div
                            key={style.id}
                            className={`style-option ${selectedBackboardStyle.id === style.id ? "selected" : ""}`}
                            onClick={() => setSelectedBackboardStyle(style)}
                          >
                            <div className="option-details">
                              <span>{style.name}</span>
                              <span className="price">
                                {backboardStylePrices[style.id] === 0
                                  ? "FREE"
                                  : `+₹${backboardStylePrices[style.id] || 0}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </BackboardSection>

                    <QuantitySelector>
                      <h2>Quantity</h2>
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                          min="1"
                          max="10"
                        />
                        <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= 10}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </QuantitySelector>

                    <div className="total-price">
                      <h2>Total Price</h2>
                      <p>₹{calculatePrice().toLocaleString()}</p>
                    </div>
                  </ProductOptions>

                  <button className="cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>

                  <TrustIndicators>
                    <div className="indicator">
                      <img src="../dimmer-images/free shipping (2).png" alt="Free Shipping" />
                      <h3>FREE SHIPPING</h3>
                      <p>On 999/- & above</p>
                    </div>
                    <div className="indicator">
                      <img src="../dimmer-images/trusted.png" alt="Trusted" />
                      <h3>TRUSTED BY 50,000+</h3>
                      <p>Happy Customers</p>
                    </div>
                    <div className="indicator">
                      <img src="../dimmer-images/secure payment.png" alt="Secure Payment" />
                      <h3>SECURE PAYMENT</h3>
                      <p>100% Safe & Secure</p>
                    </div>
                  </TrustIndicators>

                  <InfoSection isOpen={openSection === "description"}>
                    <button onClick={() => toggleSection("description")}>
                      <h2>Description</h2>
                      <span>{openSection === "description" ? "−" : "+"}</span>
                    </button>
                    <div className="content">
                      <p>Our custom neon signs are crafted with premium LED technology, offering:</p>
                      <ul>
                        <li>Energy-efficient LED neon</li>
                        <li>Customizable colors and sizes</li>
                        <li>Easy installation kit included</li>
                        <li>1-year warranty</li>
                        <li>Indoor & outdoor use</li>
                      </ul>
                    </div>
                  </InfoSection>

                  <InfoSection isOpen={openSection === "shipping"}>
                    <button onClick={() => toggleSection("shipping")}>
                      <h2>Shipping & Delivery</h2>
                      <span>{openSection === "shipping" ? "−" : "+"}</span>
                    </button>
                    <div className="content">
                      <p>Free shipping on orders above ₹999</p>
                      <ul>
                        <li>Standard delivery: 5-7 business days</li>
                        <li>Express delivery: 2-3 business days (additional charges)</li>
                        <li>Secure packaging guaranteed</li>
                        <li>Track your order 24/7</li>
                      </ul>
                    </div>
                  </InfoSection>

                  <InfoSection isOpen={openSection === "bulk"}>
                    <button onClick={() => toggleSection("bulk")}>
                      <h2>Bulk B2B & Corporate Gifting</h2>
                      <span>{openSection === "bulk" ? "−" : "+"}</span>
                    </button>
                    <div className="content">
                      <p>Special pricing for bulk orders:</p>
                      <ul>
                        <li>Minimum order quantity: 5 pieces</li>
                        <li>Customized packaging available</li>
                        <li>Corporate branding options</li>
                        <li>Dedicated account manager</li>
                        <li>Volume discounts available</li>
                      </ul>
                      <p>Contact our B2B team for quotes and details.</p>
                    </div>
                  </InfoSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Rights Section - Outside the main UI box */}
      <CustomerRightsSection>
        <h2>Your Rights as a Customer</h2>
        <div className="rights-grid">
          <div className="right-item">
            <h3>Warranty Rights</h3>
            <p>All our neon signs come with a comprehensive warranty that protects your purchase:</p>
            <ul>
              <li>1-year manufacturer warranty against defects</li>
              <li>Free repair or replacement for manufacturing defects</li>
              <li>Extended warranty options available for purchase</li>
              <li>Warranty covers LED failures, power adapter issues, and dimmer malfunctions</li>
              <li>Warranty card included with every purchase</li>
            </ul>
          </div>
          <div className="right-item">
            <h3>Return & Refund Policy</h3>
            <p>We want you to be completely satisfied with your purchase:</p>
            <ul>
              <li>30-day return policy for unused items in original packaging</li>
              <li>Full refund for damaged items reported within 48 hours of delivery</li>
              <li>Exchange option available for size or color preferences</li>
              <li>Refunds processed within 5-7 business days after inspection</li>
              <li>Return shipping costs covered for defective products</li>
            </ul>
          </div>
          <div className="right-item">
            <h3>Privacy Rights</h3>
            <p>We respect and protect your personal information:</p>
            <ul>
              <li>Your data is encrypted and securely stored</li>
              <li>We never share your information with third parties without consent</li>
              <li>You can request deletion of your personal data at any time</li>
              <li>Transparent privacy policy available on our website</li>
              <li>Option to opt out of marketing communications</li>
            </ul>
          </div>
          <div className="right-item">
            <h3>Quality Assurance</h3>
            <p>Every neon sign undergoes rigorous quality checks:</p>
            <ul>
              <li>Each product is individually tested before shipping</li>
              <li>CE and RoHS certified components</li>
              <li>Energy-efficient LEDs with 50,000+ hours lifespan</li>
              <li>Quality inspection certificate included</li>
              <li>Satisfaction guarantee or money back</li>
            </ul>
          </div>
        </div>
      </CustomerRightsSection>

      <SingleFooter />
    </div>
  )
}

const ColorSelector = ({
  colors,
  color,
  setColor,
  rgbColor,
  isColorCycling,
  setIsColorCycling,
  toggleColorCycling,
  currentColorIndex,
  setRgbColor,
}) => {
  return (
    <div className="color-container">
      <h5>Select your Color</h5>
      <div className="color-grid">
        {colors.map((c, index) => (
          <div
            key={index}
            className={`color cont ${c.name === color.name && !isColorCycling ? "active" : ""} ${isColorCycling && index === currentColorIndex ? "active" : ""}`}
            style={{ backgroundColor: c.iconColor }}
            onClick={() => {
              setColor(c)
              setIsColorCycling(false)
              setRgbColor(c.iconColor)
            }}
          >
            <i className="material-icons"></i>
          </div>
        ))}
      </div>
      <RGBButton
        onClick={toggleColorCycling}
        style={{
          backgroundColor: isColorCycling ? rgbColor : "transparent",
          backgroundImage: isColorCycling
            ? "none"
            : "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
        }}
      >
        {isColorCycling ? "Stop RGB" : "Start RGB"}
      </RGBButton>
    </div>
  )
}

const NeonPreview = ({ text, font, background, color }) => {
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

export default NeonDesigner

