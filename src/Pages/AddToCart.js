import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import SingleFooter from "../Components/Footer";

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #f8f9fa;
`;

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #40E0D0;
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2CC1B1;
  }
`;

const ProductInfo = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const CartPage = () => {
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedProduct = localStorage.getItem("cartProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      const whatsappMessage = `
        Order Details:
        Product: ${product.title}
        Price: ${product.price}
        Name: ${formData.name}
        Address: ${formData.address}
        Phone: ${formData.phoneNumber}
      `;
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div>
      <Header />
      <PageContainer>
        <CartContainer>
          <Title>Your Cart</Title>
          {product && (
            <ProductInfo>
              <ProductImage src={product.images[0]} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
            </ProductInfo>
          )}
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Your Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Checkout</Button>
          </Form>
        </CartContainer>
      </PageContainer>
      <SingleFooter />
    </div>
  );
};

export default CartPage;