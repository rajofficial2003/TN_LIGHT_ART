"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "../Firebase/firebase"
import styled from "styled-components"

const OrdersContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`

const Header = styled.header`
  background-color: #00308F;
  color: white;
  padding: 20px;
  margin-bottom: 20px;
`

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const TableHeader = styled.th`
  background-color: #00308F;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: bold;
`

const TableCell = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`

const StatusSelect = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ced4da;
`

const Input = styled.input`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  margin-right: 10px;
`

const Button = styled.button`
  background-color: #00308F;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #002266;
  }
`

const CustomNeonOrders = () => {
  const [orders, setOrders] = useState([])
  const [letterPrice, setLetterPrice] = useState(100)

  useEffect(() => {
    fetchOrders()
    fetchLetterPrice()
  }, [])

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, "custom-neon-orders")
      const orderSnapshot = await getDocs(ordersCollection)
      const orderList = orderSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setOrders(orderList)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const fetchLetterPrice = async () => {
    try {
      const settingsCollection = collection(db, "settings")
      const settingsSnapshot = await getDocs(settingsCollection)
      const settingsDoc = settingsSnapshot.docs.find((doc) => doc.id === "global")
      if (settingsDoc) {
        const settingsData = settingsDoc.data()
        if (settingsData && settingsData.letterPrice) {
          setLetterPrice(settingsData.letterPrice)
        }
      }
    } catch (error) {
      console.error("Error fetching letter price:", error)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "custom-neon-orders", orderId)
      await updateDoc(orderRef, { status: newStatus })
      fetchOrders() // Refresh the orders list
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const handleLetterPriceChange = async () => {
    try {
      const settingsRef = doc(db, "settings", "global")
      await setDoc(settingsRef, { letterPrice: Number(letterPrice) }, { merge: true })
      alert("Letter price updated successfully!")
    } catch (error) {
      console.error("Error updating letter price:", error)
      alert("Failed to update letter price. Please try again.")
    }
  }

  return (
    <OrdersContainer>
      <Header>
        <Title>Custom Neon Orders</Title>
      </Header>
      <div className="mb-3">
        <Input type="number" value={letterPrice} onChange={(e) => setLetterPrice(e.target.value)} min="1" />
        <Button onClick={handleLetterPriceChange}>Update Letter Price</Button>
      </div>
      <OrdersTable>
        <thead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Text</TableHeader>
            <TableHeader>Font</TableHeader>
            <TableHeader>Color</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Dimmer</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Total Price</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.text}</TableCell>
              <TableCell>{order.font}</TableCell>
              <TableCell>{order.color}</TableCell>
              <TableCell>{order.size}</TableCell>
              <TableCell>{order.dimmer}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>₹{order.totalPrice.toLocaleString()}</TableCell>
              <TableCell>{order.timestamp?.toDate().toLocaleString()}</TableCell>
              <TableCell>
                <StatusSelect
                  value={order.status || "Pending"}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </StatusSelect>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </OrdersTable>
    </OrdersContainer>
  )
}

export default CustomNeonOrders

