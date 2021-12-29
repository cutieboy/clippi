import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function Nav() {
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        try {
            await logout()
            history.push('./login')
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="nav-container">
            <nav className="nav">
                <Link className="nav-logo" to="/">Clippi</Link>
                {currentUser && <button onClick={handleLogout} className="nav-link nav-log-out" to="/login">Log Out</button>}
            </nav>
        </div>
    )
}

export default Nav
