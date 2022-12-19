import './verifyEmail.css'
import {useAuthValue} from './AuthContext'
import {useState, useEffect} from 'react'
import {auth} from './firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useHistory} from 'react-router-dom'

function VerifyEmail() {
 
  const {currentUser} = useAuthValue()
  const {timeActive, setTimeActive} = useAuthValue()

  const [time, setTime] = useState(60)
  const history = useHistory()


  //We are running the reload function every one second until the user’s email has been verified, and, if it has, we are navigating the user to their profile page.
  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          history.push('/')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [history, currentUser])

  // We resend email verification, and we activate timer
  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    })
  }

  //Timer, if time is Active && time is not 0 start decreasing. When it gets to 0, we set time active to false and time back to 60
  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  return (
    <div className='center'>
      <div className='verifyEmail'>
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong><br/>
        </p>
        <span>{currentUser?.email}</span>
        <span>Follow the instruction in the email to verify your account</span>
        <button 
  onClick={resendEmailVerification}
  disabled={timeActive}
>Resend Email {timeActive && time}</button>
      </div>
    </div>
  )
}

export default VerifyEmail
