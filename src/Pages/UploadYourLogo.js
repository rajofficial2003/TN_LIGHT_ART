import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Components/Header';
import SingleFooter from '../Components/Footer';

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  33% {
    background-position: 100% 50%;
  }
  67% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    -45deg,
    #0a0f2c,
    #1a237e,
    #311b92,
    #4a148c
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 20s ease infinite;
  padding: 10rem 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const InfoSection = styled(motion.div)`
  color: white;
  text-align: center;
  margin-bottom: 3rem;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #f0f0f0 50%,
    #ffffff 100%
  );
  background-size: 1000px 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmerAnimation} 8s linear infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 25px;
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #1a237e;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    border-color: #1a237e;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.2);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:focus {
    border-color: #1a237e;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.2);
    outline: none;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px dashed #1a237e;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);

  &:hover {
    background: rgba(26, 35, 126, 0.05);
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  gap:500px;
  margin-top: 20px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #1a237e, #311b92);
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(135deg, #311b92, #1a237e);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.3);
  }
`;

const WhatsAppButton = styled(Button)`
  background: linear-gradient(135deg, #25D366, #128C7E);

  &:hover {
    background: linear-gradient(135deg, #128C7E, #25D366);
  }
`;

const PremiumNeonSignRequest = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    state: '',
    city: '',
    size: '',
    message: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const generateWhatsAppMessage = () => {
    const message = `
Hello! I'm interested in ordering a premium custom neon sign.

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Business: ${formData.businessName}
Location: ${formData.city}, ${formData.state}
Size: ${formData.size}
Additional Info: ${formData.message}

Looking forward to bringing my vision to life!
    `.trim();

    return encodeURIComponent(message);
  };

  return (

<div className="">
    <Header/>
<PageWrapper>
      <Container>
        <InfoSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MainTitle>Transform Your Vision Into Stunning Neon Art</MainTitle>
          <Subtitle>
            Experience the perfect blend of artistry and innovation with our premium custom neon signs. 
            Our master craftsmen combine cutting-edge technology with meticulous attention to detail, 
            creating stunning illuminated masterpieces that elevate any space. Whether you're 
            envisioning a bold business logo, an elegant home decoration, or a statement piece for 
            your event, we're here to bring your ideas to life with unparalleled quality and precision.
          </Subtitle>
        </InfoSection>

        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form onSubmit={handleSubmit}>
            <AnimatePresence>
              {Object.entries(formData).map(([key, value], index) => (
                <FormGroup
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}{key !== 'businessName' && '*'}</Label>
                  {key === 'message' ? (
                    <TextArea
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder="Share your vision with us. Include any specific details about design, colors, or special requirements."
                    />
                  ) : key === 'file' ? (
                    <FileInput
                      type="file"
                      name={key}
                      onChange={handleChange}
                      accept="image/*"
                    />
                  ) : (
                    <Input
                      type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                      required={key !== 'businessName'}
                    />
                  )}
                </FormGroup>
              ))}
            </AnimatePresence>

            <ButtonContainer>
            

              <WhatsAppButton
                as="a"
                href={`https://wa.me/9894924809?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Discuss via WhatsApp
              </WhatsAppButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </Container>
    </PageWrapper>
    <SingleFooter/>
</div>
  );
};

export default PremiumNeonSignRequest;

