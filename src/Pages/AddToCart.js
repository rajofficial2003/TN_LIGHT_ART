"use client"

import { useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Form, Button, Row, Col } from "react-bootstrap"
import html2canvas from "html2canvas"
import { collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc } from "firebase/firestore"
import { db } from "../Firebase/firebase"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

const StyledPlaceOrder = styled.div`
  padding: 2rem 0;
  background-color: #f8f9fa;
  min-height: 100vh;

  .page-title {
    color: #333;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    display: inline-block;
    border-radius: 8px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    .breadcrumb {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
      
      a {
        color: #40E0D0;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .order-container {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .form-section {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #40E0D0;
  }

  .form-control {
    border: 2px solid #40E0D0;
    border-radius: 8px;
    padding: 0.75rem;
    margin-bottom: 1rem;
    
    font-size: 1rem;
    background-color: white;

    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(64, 224, 208, 0.25);
      border-color: #40E0D0;
    }

    &::placeholder {
      color: #999;
    }
  }

  .order-summary {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    height: fit-content;
    position: sticky;
    top: 2rem;

    .product-item {
      display: flex;
      gap: 1rem;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid #40E0D0;

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #40E0D0;
      }

      .product-details {
        flex: 1;

        h4 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .price {
          font-weight: bold;
          color: #40E0D0;
          font-size: 1.1rem;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 0.875rem;
          margin-left: 0.5rem;
        }
      }
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      color: #666;
      padding: 0.5rem 0;

      &.total {
        font-size: 1.25rem;
        font-weight: bold;
        color: #333;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 2px solid #40E0D0;
      }
    }
  }

  .payment-options {
    margin-top: 2rem;

    .payment-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border: 2px solid #40E0D0;
      border-radius: 8px;
      margin-bottom: 1rem;
      cursor: pointer;
      background-color: white;
      transition: all 0.3s ease;

      &:hover {
        background-color: #f0f8ff;
      }

      &.selected {
        background-color: #f0f8ff;
      }

      input[type="radio"] {
        accent-color: #40E0D0;
        width: 18px;
        height: 18px;
      }

      label {
        margin-bottom: 0;
        cursor: pointer;
        flex: 1;
      }
    }
  }

  .place-order-button {
    background-color: #40E0D0;
    border: none;
    color: #000310;
    font-weight: bold;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 8px;
    width: 100%;
    margin-top: 1rem;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
      background-color: #33b3a6;
      transform: translateY(-2px);
    }

    &:disabled {
      background-color: #999;
      color: white;
      transform: none;
    }
  }

  .error-message {
    color: #ff6b6b;
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
    padding: 0.5rem;
    background-color: #fff5f5;
    border-radius: 4px;
    border: 1px solid #ff6b6b;
  }

  textarea.form-control {
    min-height: 100px;
    resize: vertical;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;

    .page-title {
      font-size: 1.5rem;
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }

    .order-container {
      padding: 0 0.5rem;
    }

    .form-section,
    .order-summary {
      padding: 1rem;
    }

    .section-title {
      font-size: 1.1rem;
    }

    .payment-option {
      padding: 0.75rem;
    }

    .place-order-button {
      padding: 0.75rem;
      font-size: 1rem;
    }
  }
`

const OrderTemplate = ({ formData, product, quantity }) => {
  return (
    <div style={{ display: "none" }}>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#40E0D0" }}>Order Confirmation</h1>

        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #40E0D0",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ color: "#40E0D0" }}>Product Information</h2>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price.toFixed(2)}
          </p>
          <p>
            <strong>Quantity:</strong> {quantity}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{(product.price * quantity).toFixed(2)}
          </p>
          <p>
            <strong>Original Price:</strong> ₹{product.originalPrice.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #40E0D0",
            borderRadius: "5px",
          }}
        >
          <h2 style={{ color: "#40E0D0" }}>Customer Information</h2>
          <p>
            <strong>Name:</strong> {formData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode},{" "}
            {formData.country}
          </p>
        </div>

        {formData.notes && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #40E0D0",
              borderRadius: "5px",
            }}
          >
            <h2 style={{ color: "#40E0D0" }}>Additional Notes</h2>
            <p>{formData.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const AddToCart = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, quantity, user } = location.state || {}
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const orderTemplateRef = useRef(null)

  if (!product) {
    navigate("/")
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateOrderImage = async () => {
    if (orderTemplateRef.current) {
      const canvas = await html2canvas(orderTemplateRef.current)
      return canvas.toDataURL("image/png")
    }
    return null
  }

  const removeFromCart = async (userId, productId) => {
    try {
      const cartRef = collection(db, "cart")
      const q = query(cartRef, where("userId", "==", userId), where("productId", "==", productId))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref)
      })

      console.log("Product removed from cart successfully")
    } catch (error) {
      console.error("Error removing product from cart:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const imageDataUrl = await generateOrderImage()

      if (!imageDataUrl) {
        throw new Error("Failed to generate order image")
      }

      // Store order data in Firestore
      const orderData = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        productName: product.name,
        price: product.price,
        quantity: quantity,
        totalPrice: product.price * quantity,
        originalPrice: product.originalPrice,
        notes: formData.notes,
        paymentMethod,
        date: serverTimestamp(),
        status: "Pending",
        userId: user ? user.uid : null,
      }

      const docRef = await addDoc(collection(db, "orders"), orderData)
      console.log("Order added with ID: ", docRef.id)

      // Remove the product from the cart
      if (user) {
        await removeFromCart(user.uid, product.id)
      }

      // Construct WhatsApp message with order details
      const whatsappNumber = "9894924809"
      const message = `
New Order Details:

Order ID: ${docRef.id}
Product: ${product.name}
Price: ₹${product.price.toFixed(2)}
Quantity: ${quantity}
Total Price: ₹${(product.price * quantity).toFixed(2)}
Original Price: ₹${product.originalPrice.toFixed(2)}

Customer Information:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
City: ${formData.city}
State: ${formData.state}
Zip Code: ${formData.zipCode}
Country: ${formData.country}

Payment Method: ${paymentMethod === "cod" ? "Send via WhatsApp" : "Online Payment"}

Additional Notes:
${formData.notes || "None"}
      `

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank")

      // Navigate to order confirmation page
      navigate("/order-confirmation", {
        state: { orderDetails: { formData, product, quantity, orderId: docRef.id } },
      })
    } catch (error) {
      console.error("Error:", error)
      setError("There was an error placing your order. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <StyledPlaceOrder>
        <div className="page-title">
          <div className="breadcrumb">
            <a href="/">Home</a> » Checkout
          </div>
          <h1 className="mt-5">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="order-container">
            <div className="form-section">
              <div className="section-title">Contact Information</div>
              <Row>
                <Col md={12}>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>

              <div className="section-title mt-4">Shipping Address</div>
              <Row>
                <Col md={12}>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>

              <div className="section-title mt-4">Additional Notes</div>
              <Form.Control
                as="textarea"
                name="notes"
                placeholder="Any special instructions or notes for your order"
                value={formData.notes}
                onChange={handleInputChange}
              />

              <div className="section-title mt-4">Form Submission</div>
              <div className="payment-options">
                <div className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label htmlFor="cod">Send via WhatsApp</label>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <div className="section-title">Order Summary</div>
              <div className="product-item">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                  alt={product.name}
                />
                <div className="product-details">
                  <h4>{product.name}</h4>
                  <div>
                    <span className="price">₹{product.price.toFixed(2)}</span>
                    <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                  </div>
                  <div>Quantity: {quantity}</div>
                </div>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(product.price * quantity).toFixed(2)}</span>
              </div>

              {error && <div className="error-message">{error}</div>}

              <Button type="submit" className="place-order-button text-light " disabled={isLoading}>
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </StyledPlaceOrder>

      <div style={{ display: "none" }}>
        <div ref={orderTemplateRef}>
          <OrderTemplate formData={formData} product={product} quantity={quantity} />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AddToCart

