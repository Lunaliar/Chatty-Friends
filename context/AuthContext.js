import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
export const AuthContext = createContext()
import { auth } from "../firebase"

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      // console.log("AuthContext:", user);
    })
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
