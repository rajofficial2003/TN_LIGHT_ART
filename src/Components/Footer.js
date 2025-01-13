import React, { useState } from 'react';
import styled from 'styled-components';
import logo from "../Images/Logo/2.png"

const FooterContainer = styled.footer`
  background-color: black;
  color: #ffffff;
  width: 100%;
  font-family: 'Arial', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 3rem 1rem;

  @media (max-width: 1023px) {
    flex-direction: column;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #f0f0f0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: #ffffff;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  background-color: black;
  color: #888888;
`;

const Logo = styled.img`
  height: 50px;
  margin-bottom: 1.5rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #cccccc;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  &:hover {
    color: #ffffff;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

const ExpandIcon = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
`;

const MobileContent = styled.div`
  padding: ${({ isOpen }) => (isOpen ? '0 1rem 1rem' : '0 1rem')};
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;

  @media (min-width: 1024px) {
    max-height: none;
    padding: 0;
    overflow: visible;
  }
`;

const SingleFooter = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const footerSections = [
    {
      title: 'About Neon Signs',
      content: ['Custom Designs', 'Our Process', 'Installation Guide', 'Care Instructions'],
    },
    {
      title: 'Shop',
      content: ['All Products', 'New Arrivals', 'Best Sellers', 'Custom Orders'],
    },
    {
      title: 'Customer Service',
      content: ['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'FAQ'],
    },
    {
      title: 'Connect',
      content: ['Instagram', 'Facebook', 'Twitter', 'Pinterest'],
    },
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo className='text-center' src={logo} alt="Neon Signs Logo" />
          <p>We create custom neon signs to light up your life and spaces.</p>
          <SocialIcons>
            <SocialIcon href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Pinterest">
              <i className="fab fa-pinterest-p"></i>
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
        {footerSections.map((section, index) => (
          <FooterSection key={index}>
            <MobileHeader onClick={() => toggleSection(section.title)}>
              <MobileTitle>{section.title}</MobileTitle>
              <ExpandIcon isOpen={openSections[section.title]}>+</ExpandIcon>
            </MobileHeader>
            <MobileContent isOpen={openSections[section.title]}>
              <FooterTitle>{section.title}</FooterTitle>
              <FooterList>
                {section.content.map((item, i) => (
                  <FooterListItem key={i}>
                    <FooterLink href="#">{item}</FooterLink>
                  </FooterListItem>
                ))}
              </FooterList>
            </MobileContent>
          </FooterSection>
        ))}
      </FooterContent>
      <Copyright>
        <p>&copy; {new Date().getFullYear()} Neon Signs. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default SingleFooter;

