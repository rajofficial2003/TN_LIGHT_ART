"use client"

import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Table } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import styled from 'styled-components'

const StyledDashboard = styled.div`
  .dashboard-title {
    color: #00308F;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .card {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .card-title {
    color: #00308F;
    font-weight: bold;
  }

  .card-text {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .table {
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .table th {
    background-color: #00308F;
    color: white;
  }

  @media (max-width: 768px) {
    .dashboard-title {
      font-size: 1.5rem;
    }

    .card-text {
      font-size: 1.2rem;
    }
  }
`

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalCategories, setTotalCategories] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [recentOrders, setRecentOrders] = useState([])
  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch total products
      const productsSnapshot = await getDocs(collection(db, 'products'))
      setTotalProducts(productsSnapshot.size)

      // Fetch total categories
      const categoriesSnapshot = await getDocs(collection(db, 'categories'))
      setTotalCategories(categoriesSnapshot.size)

      // Fetch total orders and recent orders
      const ordersSnapshot = await getDocs(query(collection(db, 'orders'), orderBy('date', 'desc')))
      setTotalOrders(ordersSnapshot.size)
      setRecentOrders(ordersSnapshot.docs.slice(0, 5).map(doc => ({ id: doc.id, ...doc.data() })))

      // Fetch sales data for the chart (last 6 months)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const salesSnapshot = await getDocs(query(
        collection(db, 'orders'),
        where('date', '>=', sixMonthsAgo),
        orderBy('date', 'asc')
      ))
      const salesByMonth = salesSnapshot.docs.reduce((acc, doc) => {
        const date = doc.data().date.toDate()
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
        if (!acc[monthYear]) {
          acc[monthYear] = 0
        }
        acc[monthYear] += doc.data().price
        return acc
      }, {})
      setSalesData(Object.entries(salesByMonth).map(([name, sales]) => ({ name, sales })))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <StyledDashboard>
      <h1 className="dashboard-title">Dashboard</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>{totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text>{totalCategories}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Sales Overview (Last 6 Months)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#00308F" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Orders</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id.slice(0, 8)}</td>
                      <td>{order.customerName}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </StyledDashboard>
  )
}

export default Dashboard
