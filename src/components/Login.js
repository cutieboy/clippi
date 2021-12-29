import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, loginWithGoogle } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }

    async function handleGoogleLogin(e) {
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await loginWithGoogle()
            history.push("/")
        } catch(err) {
            setError(err.message)
        }

        setLoading(false)
    }
    
    return (
        <>
            <div className="auth-container">
                <div className="auth">
                {error && <Alert variant="danger">{error}</Alert>}
                    <h3 className="auth-logo">Clippi</h3>
                    <h2 className="auth-title">Log In</h2>
                    <div onClick={handleGoogleLogin} className="auth-google">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                            <path d="M3.153 7.3455L6.4385 9.755C7.3275 7.554 9.4805 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.159 2 4.828 4.1685 3.153 7.3455Z" fill="#FF3D00"/>
                            <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3037 18.001 12 18C9.399 18 7.1905 16.3415 6.3585 14.027L3.0975 16.5395C4.7525 19.778 8.1135 22 12 22Z" fill="#4CAF50"/>
                            <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
                            </svg>
                        </div>
                        <p>Sign in with Google</p>
                    </div>
                    <div className="email-login-container">
                        <span className="login-line"></span>
                        <p>Log in with email</p>
                        <span className="login-line"></span>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group" id="email">
                            <input placeholder="Email" className="auth-input" ref={emailRef} type="email" required />
                        </div>
                        <div className="form-group" id="password">
                            <input placeholder="Password" className="auth-input" ref={passwordRef} type="password" required />
                        </div>
                        <button disable={loading} className="auth-button" type="submit">Log In</button>
                        <div className="login-signup">
                            Don't have an account?<Link className="auth-link" to="/signup"> Sign Up</Link>
                        </div>
                        <div className="login-signup">
                            <Link className="auth-link" to="/forgot-password">Forgot Password</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
