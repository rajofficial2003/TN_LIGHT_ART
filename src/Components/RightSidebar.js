"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { X, Trash2, ShoppingCart } from "lucide-react"

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-300px")};
  width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`

const UserEmail = styled.span`
  font-size: 0.8rem;
  color: #666;
`

const CartInfo = styled.div`
  margin-bottom: 20px;
  flex-grow: 1;
  overflow-y: auto;
`

const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
`

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
`

const CartItemInfo = styled.div`
  flex: 1;
`

const CartItemName = styled.p`
  font-size: 0.9rem;
  margin: 0;
`

const CartItemPrice = styled.p`
  font-size: 0.8rem;
  color: #40E0D0;
  margin: 0;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff6b6b;
`

const OrderInfo = styled.div`
  margin-bottom: 20px;
`

const SignInButton = styled.button`
  background-color: #4285F4;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

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
  background: #40E0D0;
  color: white;
  width: 100%;
  margin-bottom: 10px;

  &:hover {
    background: #2CC1B1;
  }
`

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`

const ModalButton = styled.button`
  margin: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const RecentlyAddedProduct = styled.div`
  background-color: ${(props) => (props.alreadyInCart ? "#fff3cd" : "#f0f0f0")};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  position: relative;
`

const RecentlyAddedTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 1rem;
  color: ${(props) => (props.alreadyInCart ? "#856404" : "inherit")};
`

const AlertCloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: ${(props) => (props.alreadyInCart ? "#856404" : "inherit")};
`

const RightSidebar = ({
  isOpen,
  onClose,
  user,
  cartItems,
  orders,
  onSignOut,
  onRemoveFromCart,
  onSignIn,
  onProceedToCheckout,
  recentlyAddedProduct,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [showRecentlyAdded, setShowRecentlyAdded] = useState(false)
  const [showProceedToCheckout, setShowProceedToCheckout] = useState(false)

  useEffect(() => {
    if (recentlyAddedProduct) {
      setShowRecentlyAdded(true)
      setShowProceedToCheckout(true)
    }
  }, [recentlyAddedProduct])

  const handleDeleteClick = (item) => {
    setItemToDelete(item)
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onRemoveFromCart(itemToDelete.id)
    }
    setShowConfirmation(false)
    setItemToDelete(null)
  }

  const handleCancelDelete = () => {
    setShowConfirmation(false)
    setItemToDelete(null)
  }

  const handleCloseRecentlyAdded = () => {
    setShowRecentlyAdded(false)
    setShowProceedToCheckout(false)
  }

  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>
      {user ? (
        <>
          <UserInfo>
            <UserAvatar src={user.photoURL} alt={user.displayName} />
            <UserDetails>
              <UserName>{user.displayName}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserDetails>
          </UserInfo>
          <CartInfo>
            <h3>Cart ({cartItems.length})</h3>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <CartItemImage src={item.image} alt={item.productName} />
                <CartItemInfo>
                  <CartItemName>{item.productName}</CartItemName>
                  <CartItemPrice>₹{item.productPrice}</CartItemPrice>
                </CartItemInfo>
                <DeleteButton onClick={() => handleDeleteClick(item)}>
                  <Trash2 size={16} />
                </DeleteButton>
              </CartItem>
            ))}
          </CartInfo>
          {recentlyAddedProduct && showRecentlyAdded && (
            <RecentlyAddedProduct alreadyInCart={recentlyAddedProduct.alreadyInCart}>
              <AlertCloseButton onClick={handleCloseRecentlyAdded} alreadyInCart={recentlyAddedProduct.alreadyInCart}>
                <X size={16} />
              </AlertCloseButton>
              <RecentlyAddedTitle alreadyInCart={recentlyAddedProduct.alreadyInCart}>
                {recentlyAddedProduct.alreadyInCart ? "Product Already in Cart" : "Recently Added to Cart"}
              </RecentlyAddedTitle>
              <CartItem>
                <CartItemImage src={recentlyAddedProduct.images[0]} alt={recentlyAddedProduct.name} />
                <CartItemInfo>
                  <CartItemName>{recentlyAddedProduct.name}</CartItemName>
                  <CartItemPrice>₹{recentlyAddedProduct.price}</CartItemPrice>
                </CartItemInfo>
              </CartItem>
              {recentlyAddedProduct.alreadyInCart && (
                <p style={{ color: "#856404", marginTop: "10px" }}>
                  This product is already in your cart. You can adjust the quantity during checkout.
                </p>
              )}
            </RecentlyAddedProduct>
          )}
          {showProceedToCheckout && (
            <Button onClick={() => onProceedToCheckout(recentlyAddedProduct)}>
              <ShoppingCart size={16} />
              Proceed to Checkout
            </Button>
          )}
          <OrderInfo>
            <h3>My Orders</h3>
            {orders.map((order) => (
              <div key={order.id}>
                <p>
                  {order.productName} - Ordered on:{" "}
                  {order.timestamp && order.timestamp.toDate
                    ? order.timestamp.toDate().toLocaleDateString()
                    : "Date not available"}
                </p>
              </div>
            ))}
          </OrderInfo>
          <Button onClick={onSignOut}>Sign Out</Button>
        </>
      ) : (
        <SignInButton onClick={onSignIn}>
          <GoogleIcon src="/google-icon.png" alt="Google" />
          Sign in with Google
        </SignInButton>
      )}
      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <p>Are you sure you want to remove this item from your cart?</p>
            <ModalButton onClick={handleConfirmDelete}>Yes</ModalButton>
            <ModalButton onClick={handleCancelDelete}>No</ModalButton>
          </ModalContent>
        </ConfirmationModal>
      )}
    </SidebarContainer>
  )
}

export default RightSidebar

