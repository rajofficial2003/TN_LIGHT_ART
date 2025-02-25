"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../Firebase/firebase"

const ProfileContext = createContext()

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState("/placeholder.svg")

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const docRef = doc(db, "Admin", "shopProfile")
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setProfilePicture(data.profilePicture || "/placeholder.svg")
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error)
      }
    }

    fetchProfilePicture()
  }, [])

  return <ProfileContext.Provider value={{ profilePicture, setProfilePicture }}>{children}</ProfileContext.Provider>
}

