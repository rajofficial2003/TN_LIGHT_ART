import { useLocation, Link } from "react-router-dom"
import styled from "styled-components"
import { Container, Row, Col, Button } from "react-bootstrap"
import { CheckCircle } from "lucide-react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

const StyledOrderConfirmation = styled.div`
  padding: 3rem 0;
  background-color: #f8f9fa;
  min-height: 100vh;

  .confirmation-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    padding: 2.5rem;
    margin-top: 1.5rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media (max-width: 768px) {
      padding: 1.5rem;
      margin-top: 3rem;
    }
  }

  .tick-symbol {
    position: absolute;
    top: -30px;
    right: 30px;
    background-color: #40E0D0;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(64, 224, 208, 0.3);

    @media (max-width: 768px) {
      top: -25px;
      right: 20px;
    }
  }

  .page-title {
    color: #40E0D0;
    text-align: center;
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  .section-title {
    color: #333;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #40E0D0;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  .order-details {
    margin-bottom: 2rem;
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
    color: #555;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 0.4rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  .total-row {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 2px solid #40E0D0;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }

  .thank-you-message {
    text-align: center;
    font-size: 1.1rem;
    color: #555;
    margin: 2rem 0;
    line-height: 1.6;
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  .action-button {
    background-color: #40E0D0;
    border: none;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    border-radius: 25px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(64, 224, 208, 0.3);

    &:hover {
      background-color: #33b3a6;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(64, 224, 208, 0.4);
    }

    @media (max-width: 768px) {
      width: 100%;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
  }

  .product-details {
    h3 {
      font-size: 1.2rem;
      color: #333;
      margin-bottom: 0.4rem;

      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }

    p {
      font-size: 0.95rem;
      color: #666;
      margin-bottom: 0.2rem;

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  .shipping-info {
    p {
      font-size: 0.95rem;
      color: #555;
      margin-bottom: 0.4rem;

      @media (max-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  .notes {
    font-style: italic;
    color: #777;
    font-size: 0.95rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    .product-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .product-image-col {
      margin-bottom: 1rem;
    }

    .product-details-col {
      padding-left: 15px;
    }
  }
`

const OrderConfirmation = () => {
  const location = useLocation()
  const { orderDetails } = location.state || {}

  if (!orderDetails) {
    return (
      <StyledOrderConfirmation>
        <Container>
          <div className="confirmation-container">
            <h1 className="page-title">Order Not Found</h1>
            <p className="thank-you-message">
              We're sorry, but we couldn't find any order details. Please try again or contact our support team.
            </p>
            <div className="action-buttons">
              <Button as={Link} to="/" className="action-button">
                Return to Home
              </Button>
            </div>
          </div>
        </Container>
      </StyledOrderConfirmation>
    )
  }

  const { formData, product, quantity, orderId } = orderDetails

  return (
    <>
      <Header />
      <StyledOrderConfirmation className="mt-5">
        <Container>
          <div className="confirmation-container">
            <div className="tick-symbol">
              <CheckCircle size={40} color="white" />
            </div>
            <h1 className="page-title">Order Confirmation</h1>
            <p className="thank-you-message">
              Thank you for your order, {formData.fullName}! Your custom neon sign is on its way to brighten up your
              space.
            </p>
            <Row>
              <Col lg={6}>
                <div className="order-details">
                  <h2 className="section-title">Order Details</h2>
                  <div className="detail-row">
                    <span>Order ID:</span>
                    <span>{orderId}</span>
                  </div>
                  <div className="detail-row">
                    <span>Date:</span>
                    <span>
                      {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Payment Method:</span>
                    <span>Send via WhatsApp</span>
                  </div>
                </div>
                <div className="order-details">
                  <h2 className="section-title">Product Information</h2>
                  <Row className="align-items-center product-row">
                    <Col xs={12} sm={4} className="product-image-col">
                      <img
                        src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                        alt={product.name}
                        className="product-image"
                      />
                    </Col>
                    <Col xs={12} sm={8} className="product-details-col">
                      <div className="product-details">
                        <h3>{product.name}</h3>
                        <p>Quantity: {quantity}</p>
                        <p>Price: ₹{product.price.toFixed(2)}</p>
                      </div>
                    </Col>
                  </Row>
                  <div className="detail-row total-row">
                    <span>Total:</span>
                    <span>₹{(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="order-details">
                  <h2 className="section-title">Shipping Information</h2>
                  <div className="shipping-info">
                    <p>{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p>{formData.country}</p>
                    <p>Email: {formData.email}</p>
                    <p>Phone: {formData.phone}</p>
                  </div>
                </div>
                {formData.notes && (
                  <div className="order-details">
                    <h2 className="section-title">Additional Notes</h2>
                    <p className="notes">{formData.notes}</p>
                  </div>
                )}
              </Col>
            </Row>
            <div className="action-buttons">
              <Button as={Link} to="/" className="action-button">
                Continue Shopping
              </Button>
              <Button as={Link} to="/gallery" className="action-button">
                View Products
              </Button>
            </div>
          </div>
        </Container>
      </StyledOrderConfirmation>
      <Footer />
    </>
  )
}

export default OrderConfirmation

