import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { updateEmail, updatePassword, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleUpdateProfile(e) {
        e.preventDefault()
        setError('')

        if(passwordRef.current.value !== confirmPasswordRef.current.value) return setError('Passwords do not match')

        const promises = []
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((err) => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }
    
    return (
        <>
            <div className="auth-container">
                <div className="auth">
                    <h3 className="auth-logo">Clippi</h3>
                    <h2 className="auth-title">Update Profile</h2>
                    {error && <Alert className="alert">{error}</Alert>}
                    <form className="auth-form" onSubmit={handleUpdateProfile}>
                        <div className="form-group" id="email">
                            <input className="auth-input" ref={emailRef} placeholder="Email" type="email" defaultValue={currentUser.email} required />
                        </div>
                        <div className="form-group" id="password">
                            <input className="auth-input" ref={passwordRef} type="password" placeholder="New Password" />
                        </div>
                        <div className="form-group" id="password">
                            <input className="auth-input" ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                        </div>
                        <button className="auth-button" disable={loading} type="submit">Update</button>
                    </form>
                    <div>
                        <Link className="auth-link" to="/">Cancel</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProfile
