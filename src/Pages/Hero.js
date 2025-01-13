import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://via.placeholder.com/1920x1080?text=Neon+Signs+Background') no-repeat center center;
  background-size: cover;
  color: white;
  text-align: center;
  padding: 100px 20px;
  margin-top: 60px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Button = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s;
`;

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroTitle>Turn Your Ideas Into Stunning Neon Signs</HeroTitle>
      <HeroSubtitle>Custom LED neon signs for your home, business, or special events. Bring your vision to life with our high-quality craftsmanship.</HeroSubtitle>
      <PrimaryButton href="#design">Design Your Sign</PrimaryButton>
      <SecondaryButton href="#gallery">View Gallery</SecondaryButton>
    </HeroSection>
  );
};

export default Hero;