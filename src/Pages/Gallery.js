import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SingleFooter from '../Components/Footer';
import Header from '../Components/Header';

import two from '../Images/Neon-lights/ice 4.jpeg';
import one from '../Images/Neon-lights/alisha 1.jpeg';
import four from '../Images/Neon-lights/vsv 4.jpeg';
import three from '../Images/Neon-lights/mani 2.jpeg';
import five from '../Images/Neon-lights/sheela 1.jpeg';
import six from '../Images/Neon-lights/maasani 1.jpeg';
import seven from '../Images/Neon-lights/sara 1.jpeg';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);-=-=-=-=-=-=-=-3
  }
`;

const PageContainer = styled.div`
  padding-top: 100px;
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

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([]);

  const galleryItems = [
    {
      id: 1,
      title: "Kids Name light",
      category: "business",
      price: "₹9000",
      image: one
    },
    {
      id: 2,
      title: "ஐஸ்வரியம்",
      category: "wedding",
      price: "₹7500",
      image: two
    },
    {
      id: 3,
      title: "மணிவண்ணன் இல்லம்",
      category: "business",
      price: "₹12000",
      image: three
    },
    {
      id: 4,
      title: "VSV Sweet Home",
      category: "personal",
      price: "₹9600",
      image: four
    },
    {
      id: 5,
      title: "Sheela Dental Clinic",
      category: "business",
      price: "₹14400",
      image: five
    },
    {
      id: 6,
      title: "மாசாணி அம்மன் இல்லம்",
      category: "personal",
      price: "₹12000",
      image: six
    },
    {
      id: 7,
      title: "சரணாலயம்",
      category: "event",
      price: "₹9900",
      image: seven
    },
    // {
    //   id: 8,
    //   title: "Gaming Room Sign",
    //   category: "personal",
    //   price: "₹229",
    //   image: five
    // },
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
            <Link to={`/product-details/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
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
          ))}
        </GalleryGrid>
      </PageContainer>
      <SingleFooter/>
    </div>
  );
};

export default Gallery;
