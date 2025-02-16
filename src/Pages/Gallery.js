"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import SingleFooter from "../Components/Footer"
import Header from "../Components/Header"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../Firebase/firebase"
import { keyframes } from "styled-components"
import { ShoppingCart } from "lucide-react"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #ffffff;
`

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f6f6f6 0%, #ffffff 100%);
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #000;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${(props) => (props.active ? "#40E0D0" : "#ddd")};
  border-radius: 30px;
  background: ${(props) => (props.active ? "#40E0D0" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #40E0D0;
    color: ${(props) => (props.active ? "white" : "#40E0D0")};
  }
`

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
`

const GalleryItem = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out forwards;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  z-index: 2;
`

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;

  &.second-image {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  ${GalleryItem}:hover &.second-image {
    opacity: 1;
  }

  ${GalleryItem}:hover &.first-image {
    opacity: 0;
  }
`

const ItemContent = styled.div`
  padding: 1.5rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`

const BuyNowButton = styled.button`
  background: #40E0D0;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  &:hover {
    background: #2CC1B1;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ViewDetailsButton = styled(BuyNowButton)`
  background: transparent;
  border: 2px solid #40E0D0;
  color: #40E0D0;

  &:hover {
    background: #40E0D0;
    color:white;
  }
`

const ItemTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 0.5rem;
`

const ItemPrice = styled.span`
  font-size: 1.1rem;
  color: #40E0D0;
  font-weight: 500;
`

const ItemOriginalPrice = styled.span`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
`

const ItemCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-top: 0.5rem;
`

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
`

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #ff6b6b;
  margin-top: 2rem;
`

const Gallery = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products")
      const productsSnapshot = await getDocs(productsCollection)
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setItems(productsList)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
      setLoading(false)
    }
  }

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (!originalPrice || !currentPrice) return null
    const original = Number.parseFloat(originalPrice)
    const current = Number.parseFloat(currentPrice)
    if (isNaN(original) || isNaN(current)) return null
    const discount = ((original - current) / original) * 100
    return Math.round(discount)
  }

  const handleBuyNow = (e, productId) => {
    e.preventDefault() // Prevent card click navigation
    e.stopPropagation() // Prevent event bubbling
    navigate(`/checkout/${productId}`) // Navigate to checkout with product
  }

  const handleViewDetails = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/product-details/${productId}`)
  }

  const filteredItems = filter === "all" ? items : items.filter((item) => item.category === filter)

  const categories = ["all", ...new Set(items.map((item) => item.category))]

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>
  if (error) return <ErrorMessage>{error}</ErrorMessage>

  return (
    <div>
      <Header />
      <PageContainer className="mb-5">
        <GalleryHeader>
          <Title>Neon Sign Gallery</Title>
          <Subtitle>
            Explore our collection of custom-made neon signs. From business logos to personal messages, each piece is
            handcrafted with precision and care to create stunning illuminated art.
          </Subtitle>
        </GalleryHeader>

        <FilterContainer>
          {categories.map((category) => (
            <FilterButton key={category} active={filter === category} onClick={() => setFilter(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)} Signs
            </FilterButton>
          ))}
        </FilterContainer>

        <GalleryGrid>
          {filteredItems.map((item) => {
            const discountPercentage = calculateDiscount(item.originalPrice, item.price)

            return (
              <GalleryItem
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => handleViewDetails(e, item.id)}
              >
                {discountPercentage && <DiscountBadge>DIS. {discountPercentage}%</DiscountBadge>}
                <ItemImageContainer>
                  <ItemImage src={item.images[0]} alt={item.name} className="first-image" />
                  {item.images[1] && (
                    <ItemImage src={item.images[1]} alt={`${item.name} - second view`} className="second-image" />
                  )}
                </ItemImageContainer>
                <ItemContent>
                  <ItemTitle>{item.name}</ItemTitle>
                  <PriceContainer>
                    <ItemPrice>₹{typeof item.price === "number" ? item.price.toFixed(2) : item.price}</ItemPrice>
                    {item.originalPrice && (
                      <ItemOriginalPrice>
                        ₹{typeof item.originalPrice === "number" ? item.originalPrice.toFixed(2) : item.originalPrice}
                      </ItemOriginalPrice>
                    )}
                  </PriceContainer>
                  <ItemCategory>Category: {item.category}</ItemCategory>
                  <ButtonContainer>
                  
                    <ViewDetailsButton onClick={(e) => handleViewDetails(e, item.id)}>View Details</ViewDetailsButton>
                  </ButtonContainer>
                </ItemContent>
              </GalleryItem>
            )
          })}
        </GalleryGrid>
      </PageContainer>
      <SingleFooter />
    </div>
  )
}

export default Gallery

