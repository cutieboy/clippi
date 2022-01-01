import React, { useState } from 'react'
import Axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { CloudinaryContext } from 'cloudinary-react'
import { firestore } from '../firebase'
import firebase from 'firebase/compat/app'

//Components
import Videos from './Videos.js'

function Dashboard() {
    const { currentUser } = useAuth()
    function generateUID() {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    const videoDatabase = firestore.collection('videos')

    const [loading, setLoading] = useState(false)

    const uploadVideo = async(videoData) => {
        setLoading(true)
        if(!videoData.name) return
        console.log(videoData)
        const formData = new FormData()
        formData.append("file", videoData)
        formData.append("upload_preset", "zzbgejjn")

        try {
            const response = await Axios.post("https://api.cloudinary.com/v1_1/clippi/video/upload", formData)
            await videoDatabase.add({
                name: videoData.name,
                url: response.data.url,
                user: currentUser.uid,
                slug: generateUID(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch(err) {
            console.log(err.message)
        }

        setLoading(false)
    }

    return (
        <CloudinaryContext cloudName="clippi">
            <div className="dashboard-container">
                <div className="dashboard">
                    <div className="upload-button-container">
                        <label className="upload-button">
                            <input style={{display: 'none'}} type="file" onChange={(e) => {
                                if(!loading) uploadVideo(e.target.files[0])
                            }} />
                            Upload Video
                        </label>
                    </div>
                    <div className="video-container">
                        <h2 style={{textAlign: 'left'}}>Clips</h2>
                        <Videos />
                    </div>
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
