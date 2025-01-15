import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import one from '../Images/Neon-lights/alisha 5.jpeg'
import two from '../Images/Neon-lights/ice 2.jpeg'
import three from '../Images/Neon-lights/sheela 1.jpeg'

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
`;

const ItemImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`;

const ItemContent = styled.div`
  padding: 1.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const ItemPrice = styled.span`
  font-size: 1.1rem;
  color: #40E0D0;
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`;

const ItemCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-bottom: 1rem;
`;

const TestimonialSection = styled(motion.section)`
  background-color: #f8f9fa;
  padding: 4rem 0;
`;

const TestimonialCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: #40E0D0;
`;

const FAQSection = styled(motion.section)`
  padding: 4rem 0;
`;

const FAQItem = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const FAQQuestion = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const FAQAnswer = styled.p`
  color: #666;
`;

const NewsletterSection = styled(motion.section)`
  background-color: #40E0D0;
  padding: 4rem 0;
  color: white;
`;

const NewsletterForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

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
`;

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
`;

const AnimatedSection = ({ children, ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
  );
};

const HomePage = () => {
  const [email, setEmail] = useState('');

  const popularItems = [
    { id: 1, title: "Custom Text Neon Sign", category: "personal", price: "From ₹299", image: one },
    { id: 2, title: "Heart Neon Sign", category: "wedding", price: "From ₹249", image: two },
    { id: 3, title: "Business Logo Neon Sign", category: "business", price: "From ₹399", image: three },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="home-container">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SL_111219_25000_17.jpg-6AEQJTFQmq5d0jUPSPgI7vr9A3x1bL.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        marginTop: '60px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-3">Illuminate Your Space with Custom Neon</h1>
              <p className="lead mb-4">Turn your ideas into eye-catching LED neon signs</p>
             <div className="row justify-content-center ">
             <Link to="/custom-neon" style={{backgroundColor:"#40E0D0",textDecoration:"none",color:"#000310"}} href="#custom" className="col-8 col-lg-4 fw-bolder me-2 px-3 py-3 rounded">Create Your Design</Link>
             <Link to="/gallery" href="#gallery" style={{border:"1px solid white",textDecoration:"none",color:"#40E0D0"}} className="fw-bolder col-8 mt-3 mt-lg-0 col-lg-4 me-2 px-4 py-3 rounded">View Gallery</Link>
             </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection>
        <section className="features-section py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-bolt fa-3x text-primary mb-3"></i>
                <h3>Energy Efficient</h3>
                <p>Our LED neon signs use less energy and last longer</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-paint-brush fa-3x text-primary mb-3"></i>
                <h3>Custom Designs</h3>
                <p>Create your perfect neon sign with our design tool</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-truck fa-3x text-primary mb-3"></i>
                <h3>Fast Shipping</h3>
                <p>Quick production and worldwide delivery options</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Products Section */}
      <AnimatedSection>
        <section className="products-section py-5">
          <div className="container">
            <h2 className="text-center mb-5">Popular Neon Signs</h2>
            <div className="row">
              {popularItems.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <Link to="/product-details" style={{ textDecoration: 'none' }}>
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
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonial Section */}
      <AnimatedSection>
        <TestimonialSection>
          <div className="container">
            <h2 className="text-center mb-5">What Our Customers Say</h2>
            <div className="row">
              <div className="col-md-4">
                <TestimonialCard>
                  <TestimonialText>"The custom neon sign I ordered exceeded my expectations. It's the perfect addition to my home"</TestimonialText>
                  <TestimonialAuthor>- Sarah J.</TestimonialAuthor>
                </TestimonialCard>
              </div>
              <div className="col-md-4">
                <TestimonialCard>
                  <TestimonialText>"Fantastic quality and customer service. Our business logo looks amazing in neon!"</TestimonialText>
                  <TestimonialAuthor>- Mike T., Small Business Owner</TestimonialAuthor>
                </TestimonialCard>
              </div>
              <div className="col-md-4">
                <TestimonialCard>
                  <TestimonialText>"The design process was so easy, and the final product is stunning. Highly recommend!"</TestimonialText>
                  <TestimonialAuthor>- Emily R.</TestimonialAuthor>
                </TestimonialCard>
              </div>
            </div>
          </div>
        </TestimonialSection>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection>
        <FAQSection>
          <div className="container">
            <h2 className="text-center mb-5">Frequently Asked Questions</h2>
            <div className="row">
              <div className="col-md-6">
                <FAQItem>
                  <FAQQuestion>How long do LED neon signs last?</FAQQuestion>
                  <FAQAnswer>Our LED neon signs have a lifespan of up to 50,000 hours, which is equivalent to about 5.7 years of continuous use.</FAQAnswer>
                </FAQItem>
                <FAQItem>
                  <FAQQuestion>Are custom designs more expensive?</FAQQuestion>
                  <FAQAnswer>Custom designs are priced based on size and complexity. We offer competitive rates for all custom work.</FAQAnswer>
                </FAQItem>
              </div>
              <div className="col-md-6">
                <FAQItem>
                  <FAQQuestion>What's your shipping policy?</FAQQuestion>
                  <FAQAnswer>We offer worldwide shipping. Delivery times vary depending on your location, typically ranging from 7-14 business days.</FAQAnswer>
                </FAQItem>
                <FAQItem>
                  <FAQQuestion>Do you offer a warranty?</FAQQuestion>
                  <FAQAnswer>Yes, all our neon signs come with a 12-month warranty covering any manufacturing defects.</FAQAnswer>
                </FAQItem>
              </div>
            </div>
          </div>
        </FAQSection>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection>
        <NewsletterSection>
          <div className="container text-center">
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
          </div>
        </NewsletterSection>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default HomePage;

