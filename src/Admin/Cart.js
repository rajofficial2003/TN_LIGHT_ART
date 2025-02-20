"use client"

import { useState, useEffect } from "react"
import { collection, query, getDocs, where } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../Firebase/firebase"
import styled from "styled-components"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`

const UserSection = styled.div`
  margin-bottom: 30px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`

const UserInfo = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`

const Cart = () => {
  const [cartData, setCartData] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const auth = getAuth()

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRef = collection(db, "cart")
        const cartSnapshot = await getDocs(query(cartRef))
        const cartItems = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        // Group cart items by user
        const groupedCartData = cartItems.reduce((acc, item) => {
          if (!acc[item.userId]) {
            acc[item.userId] = []
          }
          acc[item.userId].push(item)
          return acc
        }, {})

        setCartData(groupedCartData)

        // Fetch user details
        const users = await Promise.all(
          Object.keys(groupedCartData).map(async (userId) => {
            const userDoc = await getDocs(query(collection(db, "users"), where("uid", "==", userId)))
            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data()
              return { [userId]: { name: userData.displayName, email: userData.email } }
            }
            return { [userId]: { name: "Unknown", email: "Unknown" } }
          }),
        )

        const userDetailsObj = Object.assign({}, ...users)
        setUserDetails(userDetailsObj)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching cart data:", error)
        setLoading(false)
      }
    }

    fetchCartData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Title>All Users' Cart Details</Title>
      {Object.entries(cartData).map(([userId, userCart]) => (
        <UserSection key={userId}>
          <UserInfo>
            User: {userDetails[userId]?.name || "Unknown"} ({userDetails[userId]?.email || "Unknown"})
          </UserInfo>
          <Table>
            <thead>
              <tr>
                <Th>Product Name</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
              </tr>
            </thead>
            <tbody>
              {userCart.map((item) => (
                <tr key={item.id}>
                  <Td>{item.productName}</Td>
                  <Td>₹{item.productPrice}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>₹{item.productPrice * item.quantity}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </UserSection>
      ))}
    </Container>
  )
}

export default Cart

