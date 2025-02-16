// components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Home, Package, ShoppingCart, Settings, LogOut } from 'lucide-react';

const SidebarContainer = styled.div`
  width: 250px;
  background: black;
  color: white;
  position: fixed;
  height: 100vh;
  padding: 20px 0;
  transition: left 0.3s;
  z-index: 1000;
  left: ${props => props.isOpen ? '0' : '-250px'};

  @media (max-width: 768px) {
    left: ${props => props.isOpen ? '0' : '-250px'};
  }
`;

const Logo = styled.div`
  padding: 20px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

const MenuItems = styled.div`
  padding: 0 20px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: white;
  text-decoration: none;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover, &.active {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>
        <Layout className="mr-2" /> Tn Light Art
      </Logo>
      <MenuItems>
        <MenuItem to="/admin/dashboard" onClick={closeSidebar}>
          <Home size={20} /> Dashboard
        </MenuItem>
        <MenuItem to="/admin/categories" onClick={closeSidebar}>
          <Package size={20} /> Categories
        </MenuItem>
        <MenuItem to="/admin/products" onClick={closeSidebar}>
          <ShoppingCart size={20} /> Products
        </MenuItem>
        <MenuItem to="/admin/orders" onClick={closeSidebar}>
          <ShoppingCart size={20} /> Orders
        </MenuItem>
        <MenuItem to="/admin/settings" onClick={closeSidebar}>
          <Settings size={20} /> Settings
        </MenuItem>
        <MenuItem to="/logout" onClick={closeSidebar}>
          <LogOut size={20} /> Logout
        </MenuItem>
      </MenuItems>
    </SidebarContainer>
  );
};

export default Sidebar;