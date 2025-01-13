import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../Images/Logo/1.png';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const LogoContainer = styled(Link)`
  flex: 0 0 auto;
  
  img {
    height: 40px;
    width: auto;

    @media (min-width: 768px) {
      height: 50px;
    }
  }
`;

const DesktopNav = styled.ul`
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 1024px) {
    display: flex;
    margin-left: auto;
    padding-right: 2rem;
  }
`;

const DesktopNavItem = styled.li`
  a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: color 0.2s ease;
    white-space: nowrap;
    
    &:hover {
      color: #40E0D0;
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    gap: 1.5rem;
  }
`;

const Icon = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  
  &:hover {
    color: #40E0D0;
  }
`;

const MenuButton = styled(Icon)`
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1.5rem;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  overflow-y: auto;
`;

const MobileHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  img {
    max-height: 40px;
    width: auto;
    justify-self: center;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-right: auto;
  
  &:hover {
    color: #40E0D0;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const LoginButton = styled.button`
  background: #000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: #40E0D0;
  }
`;

const MobileNavItem = styled.div`
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: rgba(64, 224, 208, 0.1);
  }
`;

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
`;

const NavTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const ExpandIcon = styled.span`
  font-size: 1.2rem;
  color: #666;
  margin-left: auto;
  padding-left: 1rem;
`;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #eee;
`;

const BottomNavItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    color: #40E0D0;
  }
`;

const BrandBar = styled(BottomNavItem)`
  background: #000;
  color: white;
  justify-content: center;
  font-weight: 500;
  &:hover {
    background: #40E0D0;
  }
`;

const MobileIconsContainer = styled(IconsContainer)`
  justify-self: end;
`;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'Upload Your Logo', link: '/upload-logo' },
    { title: 'Gallery', link: '/custom-signs' },
    { title: 'Custom Neon', link: '/custom-neon' },
    { title: 'Contact', link: '/contact' }
  ];

  return (
    <HeaderContainer>
      <Nav>
        <div to="/">
          <img className='img-fluid col-12 col-lg-2'  src={logo} alt="TN Light Arts Logo" />
        </div>
        
        <DesktopNav>
          {navItems.map((item, index) => (
            <DesktopNavItem key={index}>
              <Link to={item.link}>{item.title}</Link>
            </DesktopNavItem>
          ))}
        </DesktopNav>

        <IconsContainer>
          <Icon>🔍</Icon>
          <Icon>♡</Icon>
          <Icon>🛒</Icon>
          <MenuButton onClick={toggleMenu}>
            <span>☰</span>
          </MenuButton>
        </IconsContainer>
      </Nav>

      <MobileMenu isOpen={isOpen}>
        <MobileHeader>
          <BackButton onClick={toggleMenu}>←</BackButton>
          <img src={logo} alt="TN Light Arts Logo" />
          <MobileIconsContainer>
            <Icon>🔍</Icon>
            <Icon>♡</Icon>
            <Icon>🛒</Icon>
          </MobileIconsContainer>
        </MobileHeader>

        <WelcomeSection>
          <span>Welcome</span>
          <LoginButton>Login / Register</LoginButton>
        </WelcomeSection>

        {navItems.map((item, index) => (
          <MobileNavItem key={index}>
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MobileNavHeader>
                <NavTitle>{item.title}</NavTitle>
                <ExpandIcon>+</ExpandIcon>
              </MobileNavHeader>
            </Link>
          </MobileNavItem>
        ))}

        <BottomNav>
          <BottomNavItem>
            <span>👤</span>
            <span>MY ACCOUNT</span>
          </BottomNavItem>
          <BottomNavItem>
            <span>📦</span>
            <span>TRACK ORDER</span>
          </BottomNavItem>
          <BrandBar>
            TN LIGHT ARTS | CUSTOM SIGNS
          </BrandBar>
        </BottomNav>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;

