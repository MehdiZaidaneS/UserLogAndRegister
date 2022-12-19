import './forms.css'
import {useState} from 'react'

//Lets have navigate to another page
import { Link } from 'react-router-dom'

//We can use it to switch between pages in our app.
import {useHistory} from 'react-router-dom'

//Allows us to access the value passed to AuthContext.Provider
import { useAuthValue } from "./AuthContext"


import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'



function Login(){

  
  //We can use it to switch between pages in our app.  
  const history = useHistory()

  const {currentUser} = useAuthValue()
  const {setTimeActive} = useAuthValue()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
 
  console.log(currentUser)


          
  // When we press Log In button, it checks if email is verified or not. In case it is, you go to main page if not, we send an email verification & you go to Verify page.
  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if(!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
           .then(() => {
             setTimeActive(true)
             history.push('/verify-email')
           })
         .catch(err => alert(err.message))
        }else{
          history.push('/')
        }
      })
      .catch(err => setError(err.message))
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <input 
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <button type='submit'>Login</button>
        </form>
        <p>
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login