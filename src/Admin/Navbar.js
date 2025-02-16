// components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { Bell, User, Menu } from 'lucide-react';

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.sidebarOpen ? '250px' : '0'};
  height: 70px;
  background: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: left 0.3s;

  @media (max-width: 768px) {
    left: 0;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: #00308F;
  margin: 0;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <MenuButton onClick={toggleSidebar}>
        <Menu size={20} />
      </MenuButton>
      <PageTitle>Dashboard</PageTitle>
      <NavActions>
        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton>
          <User size={20} />
        </IconButton>
      </NavActions>
    </NavbarContainer>
  );
};

export default Navbar;