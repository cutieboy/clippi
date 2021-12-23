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
            <div>
                <div>
                    <h2>Reset Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <form onSubmit={handleForgotPassword}>
                        <div id="email">
                            <label>Email</label>
                            <input ref={emailRef} type="email" required />
                        </div>
                        <button disable={loading} type="submit">Reset Password</button>
                        <div>
                            <Link to="/login">Back to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
