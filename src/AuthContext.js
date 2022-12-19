import React, {useContext} from 'react'

//Creating context
const AuthContext = React.createContext()


//Function allows us to share the value of the user’s state to all the children.
export function AuthProvider({children, value}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Allows us to access the value passed to AuthContext.Provider
export function useAuthValue(){
  return useContext(AuthContext)
}