import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }
    
    return (
        <>
            <div>
                <div>
                    <h2>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <div id="email">
                            <label>Email</label>
                            <input ref={emailRef} type="email" required />
                        </div>
                        <div id="password">
                            <label>Password</label>
                            <input ref={passwordRef} type="password" required />
                        </div>
                        <div id="password-confirmation">
                            <label>Password Confirmation</label>
                            <input ref={passwordConfirmRef} type="password" required />
                        </div>
                        <button disable={loading} type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            <div>
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Signup
