import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import SingleFooter from '../Components/Footer';
import Header from '../Components/Header';

import one from '../Images/Neon-lights/one.jpg'
import two from '../Images/Neon-lights/two.jpg'
import three from '../Images/Neon-lights/three.jpg'

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
  padding-top: 100px; // Account for fixed header
  min-height: 100vh;
  background: #ffffff;
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f6f6 0%, #ffffff 100%);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #000;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? '#40E0D0' : '#ddd'};
  border-radius: 30px;
  background: ${props => props.active ? '#40E0D0' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #40E0D0;
    color: ${props => props.active ? 'white' : '#40E0D0'};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 0 1rem;
    gap: 1rem;
  }
`;

const GalleryItem = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out forwards;
  transition: all 0.3s ease;

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

const ViewButton = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: #40E0D0;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2CC1B1;
  }
`;

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);

  const galleryItems = [
    {
      id: 1,
      title: "Custom Business Logo",
      category: "business",
      price: "$299",
      image: "../Images/Neon-lights/one.jpg"
    },
    {
      id: 2,
      title: "Wedding Name Sign",
      category: "wedding",
      price: "$249",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 3,
      title: "Bar Neon Sign",
      category: "business",
      price: "$399",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 4,
      title: "Birthday Message",
      category: "personal",
      price: "$199",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 5,
      title: "Restaurant Menu",
      category: "business",
      price: "$449",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 6,
      title: "Home Decor Quote",
      category: "personal",
      price: "$179",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 7,
      title: "Event Backdrop",
      category: "event",
      price: "$599",
      image: "/placeholder.svg?height=300&width=300"
    },
    {
      id: 8,
      title: "Gaming Room Sign",
      category: "personal",
      price: "$229",
      image: "/placeholder.svg?height=300&width=300"
    },
    // Add more items as needed
  ];

  useEffect(() => {
    setItems(
      filter === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === filter)
    );
  }, [filter]);

  return (
  <div className="">
    <Header/>
      <PageContainer className='p-lg-5 mt-lg-4 ' >
      <GalleryHeader>
        <Title>Neon Sign Gallery</Title>
        <Subtitle>
          Explore our collection of custom-made neon signs. From business logos to personal messages,
          each piece is handcrafted with precision and care to create stunning illuminated art.
        </Subtitle>
      </GalleryHeader>

      <FilterContainer>
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All Signs
        </FilterButton>
        <FilterButton 
          active={filter === 'business'} 
          onClick={() => setFilter('business')}
        >
          Business
        </FilterButton>
        <FilterButton 
          active={filter === 'personal'} 
          onClick={() => setFilter('personal')}
        >
          Personal
        </FilterButton>
        <FilterButton 
          active={filter === 'wedding'} 
          onClick={() => setFilter('wedding')}
        >
          Wedding
        </FilterButton>
        <FilterButton 
          active={filter === 'event'} 
          onClick={() => setFilter('event')}
        >
          Events
        </FilterButton>
      </FilterContainer>

      <GalleryGrid>
        {items.map((item) => (
          <GalleryItem
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ItemImage src={item.image} alt={item.title} />
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>{item.price}</ItemPrice>
              <ItemCategory>Category: {item.category}</ItemCategory>
              <ViewButton>View Details</ViewButton>
            </ItemContent>
          </GalleryItem>
        ))}
      </GalleryGrid>
    </PageContainer>
    <SingleFooter/>
  </div>
  );
};

export default Gallery;

