import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    // Simulated product data - replace this with actual data fetching logic
    const products = [
      {
        id: 1,
        title: "Custom Business Logo",
        category: "business",
        price: "₹299",
        originalPrice: "₹349",
        discount: "14% OFF",
        description: "Illuminate your business with our custom neon sign. This high-quality LED neon sign is perfect for creating a unique and eye-catching display of your business logo. Energy-efficient, durable, and designed to make a lasting impression.",
        features: [
          "Customizable design",
          "Energy-efficient LED technology",
          "Durable acrylic backing",
          "Easy to install",
          "1-year warranty"
        ],
        images: [
          '../Images/Neon-lights/alisha 1.jpeg',
          '../Images/Neon-lights/alisha 2.jpeg',
          '../Images/Neon-lights/alisha 4.jpeg',
          '../Images/Neon-lights/alisha 5.jpeg',
        ],
        rating: 4,
        reviews: 24
      },
      {
        id: 2,
        title: "Wedding Name Sign",
        category: "wedding",
        price: "₹249",
        originalPrice: "₹299",
        discount: "17% OFF",
        description: "Make your special day even more memorable with our custom wedding name sign. This elegant neon sign adds a touch of romance and personalization to your wedding venue.",
        features: [
          "Personalized design",
          "Soft, warm glow",
          "Lightweight and portable",
          "Battery-powered option available",
          "Perfect photo backdrop"
        ],
        images: [
          '../Images/Neon-lights/ice 4.jpeg',
          '../Images/Neon-lights/ice 2.jpeg',
          '../Images/Neon-lights/ice 3.jpeg',

          '../Images/Neon-lights/ice 2.jpeg',
        ],
        rating: 5,
        reviews: 36
      },
      {
        id: 3,
        title: "Bar Neon Sign",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/mani 2.jpeg',
          '../Images/Neon-lights/mani 1.jpeg',
          '../Images/Neon-lights/mani 3.jpeg',
          '../Images/Neon-lights/mani 4.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
      {
        id: 4,
        title: "Bar Neon Sign",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/vsv 1.jpeg',
          '../Images/Neon-lights/vsv 2.jpeg',
          '../Images/Neon-lights/vsv 3.jpeg',
          '../Images/Neon-lights/vsv 4.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
      {
        id: 5,
        title: "Bar Neon Sign",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/sheela 1.jpeg',
          '../Images/Neon-lights/Sheela 2.jpeg',
          '../Images/Neon-lights/Sheela 3.jpeg',
          '../Images/Neon-lights/Sheela 5.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
      {
        id: 6,
        title: "Neon Light",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/maasani 1.jpeg',
          '../Images/Neon-lights/maasani 2.jpeg',
          '../Images/Neon-lights/maasani 3.jpeg',
          '../Images/Neon-lights/maasani 4.jpeg',
          '../Images/Neon-lights/maasani 5.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
      {
        id: 7,
        title: "Neon Light",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/sara 1.jpeg',
          '../Images/Neon-lights/sara 2.jpeg',
          '../Images/Neon-lights/sara 3.jpeg',
          '../Images/Neon-lights/sara 4.jpeg',
          '../Images/Neon-lights/sara 5.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
      {
        id: 50,
        title: "Neon Light",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/alisha 1.jpeg',
          '../Images/Neon-lights/alisha 2.jpeg',
          '../Images/Neon-lights/alisha 4.jpeg',
          '../Images/Neon-lights/alisha 5.jpeg',
        ],
        rating: 4,
        reviews: 18
      },   
       {
        id: 51,
        title: "Neon Light",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/ice 4.jpeg',
          '../Images/Neon-lights/ice 2.jpeg',
          '../Images/Neon-lights/ice 3.jpeg',

          '../Images/Neon-lights/ice 2.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
       {
        id: 52,
        title: "Neon Light",
        category: "business",
        price: "₹399",
        originalPrice: "₹449",
        discount: "11% OFF",
        description: "Create the perfect ambiance for your bar or pub with our eye-catching neon sign. This vibrant sign will attract customers and set the mood for a great night out.",
        features: [
          "Multiple design options",
          "Bright, attention-grabbing display",
          "Durable construction for long-lasting use",
          "Easy wall mounting",
          "Low power consumption"
        ],
        images: [
          '../Images/Neon-lights/sheela 1.jpeg',
          '../Images/Neon-lights/Sheela 2.jpeg',
          '../Images/Neon-lights/Sheela 3.jpeg',
          '../Images/Neon-lights/Sheela 5.jpeg',
        ],
        rating: 4,
        reviews: 18
      },
  
    ];

    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedImage(foundProduct.images[0]);
    }
  }, [id]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      
      <PageContainer>
        <div className="container">
          <Breadcrumb>
            <BreadcrumbLink to="/gallery">Gallery</BreadcrumbLink>
            <ChevronRight size={16} />
            <span>{product.title}</span>
          </Breadcrumb>
        </div>
        <ProductContainer>
          <ImageGallery>
            <MainImage src={selectedImage || "/placeholder.svg"} alt={product.title} className="img-fluid" />
            <ThumbnailContainer>
              {product.images.map((img, index) => (
                <Thumbnail 
                  key={index} 
                  src={img} 
                  alt={`${product.title} ${index + 1}`} 
                  onClick={() => handleThumbnailClick(img)}
                  selected={selectedImage === img}
                  className="img-thumbnail"
                />
              ))}
            </ThumbnailContainer>
          </ImageGallery>
          <ProductInfo>
            <Title>{product.title}</Title>
            <RatingContainer>
              <StarContainer>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < product.rating ? "#ffc107" : "none"} stroke={i < product.rating ? "#ffc107" : "#ffc107"} size={20} />
                ))}
              </StarContainer>
              <RatingText>{product.rating}.0 ({product.reviews} reviews)</RatingText>
            </RatingContainer>
            <PriceContainer>
              <Price>{product.price}</Price>
              <OriginalPrice>{product.originalPrice}</OriginalPrice>
              <Discount>{product.discount}</Discount>
            </PriceContainer>
            <Category>Category: {product.category}</Category>
            <Description>{product.description}</Description>
            <FeatureList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeatureList>
            <ButtonContainer>
       
             <AddToCartButton   >
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

