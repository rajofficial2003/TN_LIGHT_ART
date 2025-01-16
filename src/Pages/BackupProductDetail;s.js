import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SingleFooter from '../Components/Footer';
import Header from '../Components/Header';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #f8f9fa;
`;

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const BreadcrumbLink = styled(Link)`
  color: #40E0D0;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ImageGallery = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.selected ? '#40E0D0' : 'transparent'};

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #40E0D0;
  font-weight: 500;
`;

const OriginalPrice = styled.p`
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 1rem;
  color: #ff6b6b;
  font-weight: 500;
`;

const Category = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AddToCartButton = styled(Button)`
  background: #40E0D0;
  color: white;
  flex: 1;

  &:hover {
    background: #2CC1B1;
  }
`;

const WishlistButton = styled(Button)`
  background: white;
  color: #333;
  border: 2px solid #ddd;
  flex: 1;

  &:hover {
    background: #f8f9fa;
  }
`;

const ShareButton = styled(Button)`
  background: white;
  color: #333;
  border: 2px solid #ddd;
  flex: 1;

  &:hover {
    background: #f8f9fa;
  }
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '✓';
    color: #40E0D0;
    font-weight: bold;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarContainer = styled.div`
  display: flex;
  color: #ffc107;
`;

const RatingText = styled.span`
  font-size: 1rem;
  color: #666;
`;

const ProductDetails = () => {
  const [images, setImages] = useState([
    '../Images/Neon-lights/alisha 1.jpeg',
    '../Images/Neon-lights/alisha 2.jpeg',
    '../Images/Neon-lights/alisha 4.jpeg',
    '../Images/Neon-lights/alisha 5.jpeg',
   
  ]);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <Header />
      
      <PageContainer>
        <div className="container">
          <Breadcrumb>
            <BreadcrumbLink to="/gallery">Gallery</BreadcrumbLink>
            <ChevronRight size={16} />
            <span>Product Details</span>
          </Breadcrumb>
        </div>
        <ProductContainer>
          <ImageGallery>
            <MainImage src={selectedImage || "/placeholder.svg"} alt="Custom Neon Sign" className="img-fluid" />
            <ThumbnailContainer>
              {images.map((img, index) => (
                <Thumbnail 
                  key={index} 
                  src={img} 
                  alt={`Product ${index + 1}`} 
                  onClick={() => handleThumbnailClick(img)}
                  selected={selectedImage === img}
                  className="img-thumbnail"
                />
              ))}
            </ThumbnailContainer>
          </ImageGallery>
          <ProductInfo>
            <Title>Custom Neon Sign - Business Logo</Title>
            <RatingContainer>
              <StarContainer>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < 4 ? "#ffc107" : "none"} stroke={i < 4 ? "#ffc107" : "#ffc107"} size={20} />
                ))}
              </StarContainer>
              <RatingText>4.0 (24 reviews)</RatingText>
            </RatingContainer>
            <PriceContainer>
              <Price>₹249</Price>
              <OriginalPrice>₹299</OriginalPrice>
              <Discount>17% OFF</Discount>
            </PriceContainer>
            <Category>Category: Business</Category>
            <Description>
              Illuminate your business with our custom neon sign. This high-quality LED neon sign 
              is perfect for creating a unique and eye-catching display of your business logo. 
              Energy-efficient, durable, and designed to make a lasting impression.
            </Description>
            <FeatureList>
              <FeatureItem>Customizable design</FeatureItem>
              <FeatureItem>Energy-efficient LED technology</FeatureItem>
              <FeatureItem>Durable acrylic backing</FeatureItem>
              <FeatureItem>Easy to install</FeatureItem>
              <FeatureItem>1-year warranty</FeatureItem>
            </FeatureList>
            <ButtonContainer>
              <AddToCartButton>
                <ShoppingCart size={16} />
                Add to Cart
              </AddToCartButton>
              <WishlistButton>
                <Heart size={16} />
                Wishlist
              </WishlistButton>
              <ShareButton>
                <Share2 size={16} />
                Share
              </ShareButton>
            </ButtonContainer>
          </ProductInfo>
        </ProductContainer>
      </PageContainer>
      <SingleFooter />
    </div>
  );
};

export default ProductDetails;

