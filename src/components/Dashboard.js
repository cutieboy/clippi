import React from 'react'
// import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Dashboard() {
    const { currentUser } = useAuth()

    return (
        <>
            <div>
                <div>
                    <h2>Profile</h2>
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/update-profile">
                        Update Profile
                    </Link>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}

export default Dashboard
