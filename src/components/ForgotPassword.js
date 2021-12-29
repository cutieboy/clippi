import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    const emailRef = useRef()
    const { forgotPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleForgotPassword(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setMessage(`If the email exists, an email has been sent to ${emailRef.current.value}.`)
            setLoading(true)
            await forgotPassword(emailRef.current.value)
        } catch(err) {
            return null;
        }
        setLoading(false)
    }
    
    return (
        <>
            <div className="auth-container">
                <div className="auth">
                    {error && <Alert className="alert" variant="danger">{error}</Alert>}
                    {message && <Alert className="alert" variant="success">{message}</Alert>}
                    <h3 className="auth-logo">Clippi</h3>
                    <h2 className="auth-title">Reset Password</h2>
                    <form className="auth-form" onSubmit={handleForgotPassword}>
                        <div className="form-group" id="email">
                            <input placeholder="Email" className="auth-input" ref={emailRef} type="email" required />
                        </div>
                        <button className="auth-button" disable={loading} type="submit">Reset Password</button>
                        <div className="login-signup">
                            <Link className="auth-link" to="/login">Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
