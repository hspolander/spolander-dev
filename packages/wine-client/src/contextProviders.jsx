import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext()
const ScreenContext = createContext()

const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const value = [isLoggedIn, setIsLoggedIn]
  return <LoginContext.Provider value={value} {...props} />
}

const ScreenProvider = (props) => {
  const [isSmallScreen, setIsSmallscreen] = useState(false)
  const value = [isSmallScreen, setIsSmallscreen]
  return <ScreenContext.Provider value={value} {...props} />
}

const useLogin = () => {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider')
  }
  return context
}

const useScreenSize = () => {
  const context = useContext(ScreenContext)
  if (!context) {
    throw new Error('useScreenSize must be used within a ScreenProvider')
  }
  return context
}

export { LoginProvider, ScreenProvider, useLogin, useScreenSize }