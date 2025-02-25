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

const PriceSettingsSection = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const PriceSettingGroup = styled.div`
  margin-bottom: 15px;
`

const CustomNeonOrders = () => {
  const [orders, setOrders] = useState([])
  const [letterPrice, setLetterPrice] = useState(100)
  const [backboardColorPrices, setBackboardColorPrices] = useState({
    clear: 0,
    white: 0,
    black: 0,
    silver: 0,
    gold: 0,
  })
  const [backboardStylePrices, setBackboardStylePrices] = useState({
    "cut-around": 0,
    rectangle: 0,
    "cut-to-letter": 0,
    "naked-neon": 0,
    "acrylic-stand": 0,
    "open-box": 0,
  })
  const [powerAdapterPrice, setPowerAdapterPrice] = useState(0)
  const [sizePrices, setSizePrices] = useState({
    regular: 0,
    medium: 0,
    large: 0,
  })

  useEffect(() => {
    fetchOrders()
    fetchPrices()
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

  const fetchPrices = async () => {
    try {
      const settingsCollection = collection(db, "settings")
      const settingsSnapshot = await getDocs(settingsCollection)
      const settingsDoc = settingsSnapshot.docs.find((doc) => doc.id === "global")
      if (settingsDoc) {
        const settingsData = settingsDoc.data()
        if (settingsData) {
          setLetterPrice(settingsData.letterPrice || 100)
          setBackboardColorPrices(
            settingsData.backboardColorPrices || {
              clear: 0,
              white: 0,
              black: 0,
              silver: 0,
              gold: 0,
            },
          )
          setBackboardStylePrices(
            settingsData.backboardStylePrices || {
              "cut-around": 0,
              rectangle: 0,
              "cut-to-letter": 0,
              "naked-neon": 0,
              "acrylic-stand": 0,
              "open-box": 0,
            },
          )
          setPowerAdapterPrice(settingsData.powerAdapterPrice || 0)
          setSizePrices(
            settingsData.sizePrices || {
              regular: 0,
              medium: 0,
              large: 0,
            },
          )
        }
      }
    } catch (error) {
      console.error("Error fetching prices:", error)
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

  const handlePriceChange = async (priceType, value, key = null) => {
    try {
      const settingsRef = doc(db, "settings", "global")
      let updateData = {}

      if (priceType === "letterPrice") {
        updateData = { letterPrice: Number(value) }
      } else if (priceType === "backboardColorPrices") {
        updateData = {
          backboardColorPrices: {
            ...backboardColorPrices,
            [key]: Number(value),
          },
        }
      } else if (priceType === "backboardStylePrices") {
        updateData = {
          backboardStylePrices: {
            ...backboardStylePrices,
            [key]: Number(value),
          },
        }
      } else if (priceType === "powerAdapterPrice") {
        updateData = { powerAdapterPrice: Number(value) }
      } else if (priceType === "sizePrices") {
        updateData = {
          sizePrices: {
            ...sizePrices,
            [key]: Number(value),
          },
        }
      }

      await setDoc(settingsRef, updateData, { merge: true })
      alert("Price updated successfully!")
      fetchPrices() // Refresh the prices
    } catch (error) {
      console.error("Error updating price:", error)
      alert("Failed to update price. Please try again.")
    }
  }

  return (
    <OrdersContainer>
      <Header>
        <Title>Custom Neon Orders</Title>
      </Header>
      <PriceSettingsSection>
        <h2>Price Settings</h2>
        <PriceSettingGroup>
          <label>Letter Price: </label>
          <Input type="number" value={letterPrice} onChange={(e) => setLetterPrice(e.target.value)} min="1" />
          <Button onClick={() => handlePriceChange("letterPrice", letterPrice)}>Update Letter Price</Button>
        </PriceSettingGroup>
        <PriceSettingGroup>
          <h3>Backboard Color Prices:</h3>
          {Object.entries(backboardColorPrices).map(([color, price]) => (
            <div key={color}>
              <label>{color}: </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setBackboardColorPrices({ ...backboardColorPrices, [color]: e.target.value })}
                min="0"
              />
              <Button onClick={() => handlePriceChange("backboardColorPrices", price, color)}>Update</Button>
            </div>
          ))}
        </PriceSettingGroup>
        <PriceSettingGroup>
          <h3>Backboard Style Prices:</h3>
          {Object.entries(backboardStylePrices).map(([style, price]) => (
            <div key={style}>
              <label>{style}: </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setBackboardStylePrices({ ...backboardStylePrices, [style]: e.target.value })}
                min="0"
              />
              <Button onClick={() => handlePriceChange("backboardStylePrices", price, style)}>Update</Button>
            </div>
          ))}
        </PriceSettingGroup>
        <PriceSettingGroup>
          <label>Power Adapter Price: </label>
          <Input
            type="number"
            value={powerAdapterPrice}
            onChange={(e) => setPowerAdapterPrice(e.target.value)}
            min="0"
          />
          <Button onClick={() => handlePriceChange("powerAdapterPrice", powerAdapterPrice)}>
            Update Power Adapter Price
          </Button>
        </PriceSettingGroup>
        <PriceSettingGroup>
          <h3>Size Prices:</h3>
          {Object.entries(sizePrices).map(([size, price]) => (
            <div key={size}>
              <label>{size}: </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setSizePrices({ ...sizePrices, [size]: e.target.value })}
                min="0"
              />
              <Button onClick={() => handlePriceChange("sizePrices", price, size)}>Update</Button>
            </div>
          ))}
        </PriceSettingGroup>
      </PriceSettingsSection>
      <OrdersTable>
        <thead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Text</TableHeader>
            <TableHeader>Font</TableHeader>
            <TableHeader>Color</TableHeader>
            <TableHeader>Size</TableHeader>
            <TableHeader>Dimmer</TableHeader>
            <TableHeader>Backboard Color</TableHeader>
            <TableHeader>Backboard Style</TableHeader>
            <TableHeader>Power Adapter</TableHeader>
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
              <TableCell>{order.backboardColor}</TableCell>
              <TableCell>{order.backboardStyle}</TableCell>
              <TableCell>{order.powerAdapter}</TableCell>
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

