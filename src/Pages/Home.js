"use client"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { motion, useInView } from "framer-motion"
import { Container, Row, Col } from "react-bootstrap"
import { PenTool, Truck, Zap, Star } from "lucide-react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

// Import images
import one from "../Images/Neon-lights/alisha 4.jpeg"
import two from "../Images/Neon-lights/ice 2.jpeg"
import three from "../Images/Neon-lights/sheela 1.jpeg"

const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SL_111219_25000_17.jpg-6AEQJTFQmq5d0jUPSPgI7vr9A3x1bL.jpeg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  color: white;
  text-align: center;
  margin-top: 60px;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const GalleryItem = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`

const ItemImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`

const ItemContent = styled.div`
  padding: 1.5rem;
`

const ItemTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`

const ItemPrice = styled.span`
  font-size: 1.1rem;
  color: #40E0D0;
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`

const ItemCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-bottom: 1rem;
`

const TestimonialSection = styled(motion.section)`
  background-color: #f8f9fa;
  padding: 4rem 0;
`

const TestimonialCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 100%;
`

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
`

const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: #40E0D0;
`

const FAQSection = styled(motion.section)`
  padding: 4rem 0;
`

const FAQItem = styled(motion.div)`
  margin-bottom: 1.5rem;
`

const FAQQuestion = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const FAQAnswer = styled.p`
  color: #666;
`

const NewsletterSection = styled(motion.section)`
  background-color: #40E0D0;
  padding: 4rem 0;
  color: white;
`

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const NewsletterInput = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px 0 0 5px;
  width: 300px;
  max-width: 100%;

  @media (max-width: 576px) {
    width: 200px;
  }
`

const NewsletterButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`

const ProcessSection = styled.section`
  padding: 4rem 0;
  background-color: #f8f9fa;
`

const ProcessStep = styled.div`
  text-align: center;
  padding: 1rem;
`

const ProcessIcon = styled.div`
  font-size: 2rem;
  color: #40E0D0;
  margin-bottom: 1rem;
`

const AnimatedSection = ({ children, ...props }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const HomePage = () => {
  const [email, setEmail] = useState("")

  const popularItems = [
    { id: 50, title: "Custom Text Neon Sign", category: "personal", price: "From ₹299", image: one },
    { id: 51, title: "Heart Neon Sign", category: "wedding", price: "From ₹249", image: two },
    { id: 52, title: "Business Logo Neon Sign", category: "business", price: "From ₹399", image: three },
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <div className="home-container">
      <Header />

      <HeroSection>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-3">Illuminate Your Space with Custom Neon</h1>
              <p className="lead mb-4">Turn your ideas into eye-catching LED neon signs</p>
              <div className="row justify-content-center ">
                <Link
                  to="/custom-neon"
                  style={{ backgroundColor: "#40E0D0", textDecoration: "none", color: "#000310" }}
                  href="#custom"
                  className="col-8 col-lg-4 fw-bolder me-2 px-3 py-3 rounded"
                >
                  Create Your Design
                </Link>
                <Link
                  to="/gallery"
                  href="#gallery"
                  style={{ border: "1px solid white", textDecoration: "none", color: "#40E0D0" }}
                  className="fw-bolder col-8 mt-3 mt-lg-0 col-lg-4 me-2 px-4 py-3 rounded"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HeroSection>

      <AnimatedSection>
        <section className="features-section py-5">
          <Container>
            <SectionTitle>Why Choose Our Neon Signs?</SectionTitle>
            <Row>
              <Col md={4} className="mb-4">
                <FeatureCard>
                  <Zap size={48} className="text-primary mb-3" />
                  <h3>Energy Efficient</h3>
                  <p>Our LED neon signs use less energy and last longer</p>
                </FeatureCard>
              </Col>
              <Col md={4} className="mb-4">
                <FeatureCard>
                  <PenTool size={48} className="text-primary mb-3" />
                  <h3>Custom Designs</h3>
                  <p>Create your perfect neon sign with our design tool</p>
                </FeatureCard>
              </Col>
              <Col md={4} className="mb-4">
                <FeatureCard>
                  <Truck size={48} className="text-primary mb-3" />
                  <h3>Fast Shipping</h3>
                  <p>Quick production and worldwide delivery options</p>
                </FeatureCard>
              </Col>
            </Row>
          </Container>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="products-section py-5">
          <Container>
            <SectionTitle>Popular Neon Signs</SectionTitle>
            <Row>
              {popularItems.map((item) => (
                <Col md={4} className="mb-4" key={item.id}>
                  <Link to={`/product-details/${item.id}`} style={{ textDecoration: "none" }}>
                    <GalleryItem
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ItemImage src={item.image} alt={item.title} />
                      <ItemContent>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemPrice>{item.price}</ItemPrice>
                        <ItemCategory>Category: {item.category}</ItemCategory>
                      </ItemContent>
                    </GalleryItem>
                  </Link>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Link to="/gallery" className="btn btn-primary btn-lg">
                View All Designs
              </Link>
            </div>
          </Container>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <ProcessSection>
          <Container>
            <SectionTitle>How It Works</SectionTitle>
            <Row>
              <Col md={3} className="mb-4">
                <ProcessStep>
                  <ProcessIcon>
                    <PenTool />
                  </ProcessIcon>
                  <h4>Design</h4>
                  <p>Create your custom neon sign using our online tool</p>
                </ProcessStep>
              </Col>
              <Col md={3} className="mb-4">
                <ProcessStep>
                  <ProcessIcon>
                    <Star />
                  </ProcessIcon>
                  <h4>Review</h4>
                  <p>We'll review your design and suggest any improvements</p>
                </ProcessStep>
              </Col>
              <Col md={3} className="mb-4">
                <ProcessStep>
                  <ProcessIcon>
                    <Zap />
                  </ProcessIcon>
                  <h4>Produce</h4>
                  <p>Your sign is carefully crafted by our expert team</p>
                </ProcessStep>
              </Col>
              <Col md={3} className="mb-4">
                <ProcessStep>
                  <ProcessIcon>
                    <Truck />
                  </ProcessIcon>
                  <h4>Deliver</h4>
                  <p>We ship your neon sign safely to your doorstep</p>
                </ProcessStep>
              </Col>
            </Row>
          </Container>
        </ProcessSection>
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialSection>
          <Container>
            <SectionTitle>What Our Customers Say</SectionTitle>
            <Row>
              <Col md={4} className="mb-4">
                <TestimonialCard>
                  <TestimonialText>
                    "The custom neon sign I ordered exceeded my expectations. It's the perfect addition to my home"
                  </TestimonialText>
                  <TestimonialAuthor>- Sarah J.</TestimonialAuthor>
                </TestimonialCard>
              </Col>
              <Col md={4} className="mb-4">
                <TestimonialCard>
                  <TestimonialText>
                    "Fantastic quality and customer service. Our business logo looks amazing in neon!"
                  </TestimonialText>
                  <TestimonialAuthor>- Mike T., Small Business Owner</TestimonialAuthor>
                </TestimonialCard>
              </Col>
              <Col md={4} className="mb-4">
                <TestimonialCard>
                  <TestimonialText>
                    "The design process was so easy, and the final product is stunning. Highly recommend!"
                  </TestimonialText>
                  <TestimonialAuthor>- Emily R.</TestimonialAuthor>
                </TestimonialCard>
              </Col>
            </Row>
          </Container>
        </TestimonialSection>
      </AnimatedSection>

      <AnimatedSection>
        <FAQSection>
          <Container>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <Row>
              <Col md={6}>
                <FAQItem>
                  <FAQQuestion>How long do LED neon signs last?</FAQQuestion>
                  <FAQAnswer>
                    Our LED neon signs have a lifespan of up to 50,000 hours, which is equivalent to about 5.7 years of
                    continuous use.
                  </FAQAnswer>
                </FAQItem>
                <FAQItem>
                  <FAQQuestion>Are custom designs more expensive?</FAQQuestion>
                  <FAQAnswer>
                    Custom designs are priced based on size and complexity. We offer competitive rates for all custom
                    work.
                  </FAQAnswer>
                </FAQItem>
              </Col>
              <Col md={6}>
                <FAQItem>
                  <FAQQuestion>What's your shipping policy?</FAQQuestion>
                  <FAQAnswer>
                    We offer worldwide shipping. Delivery times vary depending on your location, typically ranging from
                    7-14 business days.
                  </FAQAnswer>
                </FAQItem>
                <FAQItem>
                  <FAQQuestion>Do you offer a warranty?</FAQQuestion>
                  <FAQAnswer>
                    Yes, all our neon signs come with a 12-month warranty covering any manufacturing defects.
                  </FAQAnswer>
                </FAQItem>
              </Col>
            </Row>
          </Container>
        </FAQSection>
      </AnimatedSection>

      <AnimatedSection>
        <NewsletterSection>
          <Container className="text-center">
            <h2>Stay Illuminated</h2>
            <p>Subscribe to our newsletter for exclusive offers and neon inspiration!</p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <NewsletterButton type="submit">Subscribe</NewsletterButton>
            </NewsletterForm>
          </Container>
        </NewsletterSection>
      </AnimatedSection>

      <AnimatedSection>
        <section className="cta-section py-5 bg-primary text-white text-center">
          <Container>
            <h2 className="mb-4">Ready to Light Up Your Space?</h2>
            <p className="mb-4">
              Create your custom neon sign today and transform any room into a vibrant, personalized space.
            </p>
            <Link to="/custom-neon" className="btn btn-light btn-lg">
              Start Designing Now
            </Link>
          </Container>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}

export default HomePage

