import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

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
                <h1>Clippi</h1>
                {currentUser && <button onClick={handleLogout} className="nav-link nav-log-out" to="/login">Log Out</button>}
            </nav>
        </div>
    )
}

export default Nav
