import {Route, Redirect} from 'react-router-dom'
import {useAuthValue} from './AuthContext'

export default function PrivateRoute({component:Component, ...rest}) {
  const {currentUser} = useAuthValue()

  return (
    //Unverified users should be redirected to the login page when they try to access the profile.
    <Route
      {...rest}
      render={props => {
        return currentUser?.emailVerified ? <Component {...props} /> : <Redirect to='/login' />
    }}>
    </Route>
  )
}