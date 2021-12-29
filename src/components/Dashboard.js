import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { CloudinaryContext } from 'cloudinary-react'

//Components
import Videos from './Videos.js'

function Dashboard() {
    const { currentUser } = useAuth()

    const [imageSelected, setImageSelected] = useState({})

    const uploadImage = async() => {
        if(!imageSelected.name) return
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "zzbgejjn")

        try {
            const response = Axios.post("https://api.cloudinary.com/v1_1/clippi/video/upload", formData)
            setImageSelected({})
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <CloudinaryContext cloudName="clippi">
            <div className="dashboard-container">
                <div className="dashboard">
                    <div>
                        <input type="file" onChange={(e) => setImageSelected(e.target.files[0])} />
                        <button onClick={uploadImage}>Upload Image</button>
                    </div>
                    <Videos />
                </div>
                <footer>
                    <strong>Email: </strong><p style={{marginLeft: '5px'}}>{currentUser.email}</p>
                    <Link style={{marginLeft: '10px'}} className="auth-link" to="/update-profile">
                        Update Profile
                    </Link>
                </footer>
            </div>
        </CloudinaryContext>
    )
}

export default Dashboard
