import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import SingleFooter from "../Components/Footer";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from "react-icons/fa";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NeonGlow';
    src: url('/fonts/NeonGlow.otf') format('opentype');
    font-display: swap;
  }
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #000000;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  padding-top: 60px;
  min-height: 100vh;
`;

const ContactSection = styled.section`
  padding: 100px 0;
  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #40e0d0;
  margin-bottom: 1rem;
  font-family: "NeonGlow", "Arial", sans-serif;
  text-shadow: 0 0 10px #40e0d0, 0 0 20px #40e0d0, 0 0 30px #40e0d0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #333333;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContactContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ContactForm = styled(motion.form)`
  flex: 1;
  background: rgba(64, 224, 208, 0.1);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333333;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #40e0d0;
  border-radius: 5px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #40e0d0;
    box-shadow: 0 0 0 2px rgba(64, 224, 208, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #40e0d0;
  border-radius: 5px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #40e0d0;
    box-shadow: 0 0 0 2px rgba(64, 224, 208, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: #40e0d0;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #2cc1b1;
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled(motion.div)`
  flex: 1;
`;

const InfoItem = styled.div`
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #40e0d0;
  margin-bottom: 1rem;
`;

const InfoContent = styled.p`
  font-size: 1.1rem;
  color: #333333;
  line-height: 1.6;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #40e0d0;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #2cc1b1;
  }
`;

const MapContainer = styled(motion.div)`
  margin-top: 4rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/918807488021?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <PageContainer>
        <ContactSection>
          <Container>
            <ContactHeader>
              <Title
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ color: "white" }}> Get in Touch</span>
              </Title>
              <Subtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Have a question or want to create a custom neon sign? We're here
                to help!
              </Subtitle>
            </ContactHeader>
            <ContactContent>
              <ContactForm
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onSubmit={handleSubmit}
              >
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <SubmitButton
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message via WhatsApp
                </SubmitButton>
              </ContactForm>
              <ContactInfo
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <InfoItem>
                  <InfoTitle>Our Office</InfoTitle>
                  <InfoContent>
                    Coimbatore
                    <br />
                    Tamil Nadu
                    <br />
                    India
                  </InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Contact Information</InfoTitle>
                  <InfoContent>
                    Ragavendra complex , subramanian Nagar , Cinnavedanpatti
                    Coimbatore 641049
                  </InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Business Hours</InfoTitle>
                  <InfoContent>
                    <span
                      style={{
                        backgroundColor: "#40E0D0",
                        color: "#ffffff",
                        padding: "2px 5px",
                        borderRadius: "3px",
                      }}
                    >
                      Open 24/7
                    </span>
                  </InfoContent>
                </InfoItem>
                <InfoItem>
                  <InfoTitle>Follow Us</InfoTitle>
                  <SocialLinks>
                    <SocialLink
                      href="mailto:tnlightart@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope />
                    </SocialLink>
                    <SocialLink
                      href="https://www.instagram.com/tn_light_art"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink
                      href="https://wa.me/918807488021"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                    </SocialLink>
                    <SocialLink
                      href="https://www.youtube.com/@tn_light_art"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaYoutube />
                    </SocialLink>
                  </SocialLinks>
                </InfoItem>
              </ContactInfo>
            </ContactContent>
            <MapContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.51346879014!2d76.8848334354658!3d11.013957788123168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1737169490744!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </MapContainer>
          </Container>
        </ContactSection>
      </PageContainer>
      <SingleFooter />
    </>
  );
};

export default Contact;
