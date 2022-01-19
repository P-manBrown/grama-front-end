import {createContext, useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [loading, setLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState()

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}
