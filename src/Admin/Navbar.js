"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Bell, User, Menu, SettingsIcon, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { db } from "../Firebase/firebase"
import { doc, onSnapshot } from "firebase/firestore"

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: ${(props) => (props.sidebarOpen ? "250px" : "0")};
  height: 70px;
  background: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: left 0.3s;
  z-index: 1000;

  @media (max-width: 768px) {
    left: 0;
  }
`

const PageTitle = styled.h1`
  font-size: 1.5rem;
  color: #00308F;
  margin: 0;
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    background: #f5f5f5;
  }
`

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

const ProfileDropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`

const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [profilePictureURL, setProfilePictureURL] = useState("")
  const [shopName, setShopName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "Admin", "shopProfile"), (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        setProfilePictureURL(data.profilePicture || "")
        setShopName(data.name || "")
      }
    })

    return () => unsubscribe()
  }, [])

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen)
  }

  const handleSettingsClick = () => {
    navigate("/admin/settings")
    setProfileDropdownOpen(false)
  }

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...")
    setProfileDropdownOpen(false)
  }

  return (
    <NavbarContainer sidebarOpen={sidebarOpen}>
      <MenuButton onClick={toggleSidebar}>
        <Menu size={20} />
      </MenuButton>
      <PageTitle>{shopName || "Dashboard"}</PageTitle>
      <NavActions>
        <IconButton>
          <Bell size={20} />
        </IconButton>
        <IconButton onClick={handleProfileClick}>
          {profilePictureURL ? <ProfilePicture src={profilePictureURL} alt="Profile" /> : <User size={20} />}
        </IconButton>
        <ProfileDropdown isOpen={profileDropdownOpen}>
          <DropdownItem onClick={handleSettingsClick}>
            <SettingsIcon size={16} style={{ marginRight: "10px" }} />
            Settings
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            <LogOut size={16} style={{ marginRight: "10px" }} />
            Logout
          </DropdownItem>
        </ProfileDropdown>
      </NavActions>
    </NavbarContainer>
  )
}

export default Navbar

