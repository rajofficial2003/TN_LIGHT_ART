// AdminPanel.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  background: #f5f6fa;
  padding: 20px;
  margin-left: ${props => props.sidebarOpen ? '250px' : '0'};
  transition: margin-left 0.3s;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 70px; // Height of navbar
`;

const AdminPanel = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AdminContainer>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen}>
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </AdminContainer>
  );
};

export default AdminPanel;