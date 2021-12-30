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

    const videoDatabase = firestore.collection('videos')

    const [videoSelected, setVideoSelected] = useState({})

    const uploadVideo = async(videoData) => {
        if(!videoSelected.name) return
        const formData = new FormData()
        formData.append("file", videoData)
        formData.append("upload_preset", "zzbgejjn")

        try {
            const response = await Axios.post("https://api.cloudinary.com/v1_1/clippi/video/upload", formData)
            videoDatabase.add({
                name: videoSelected.name,
                url: response.data.url,
                user: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } catch(err) {
            console.log(err.message)
        }

        setVideoSelected({})
    }

    return (
        <CloudinaryContext cloudName="clippi">
            <div className="dashboard-container">
                <div className="dashboard">
                    <div>
                        <label className="upload-button">
                            <input style={{display: 'none'}} type="file" onChange={(e) => {
                                setVideoSelected(e.target.files[0])
                                uploadVideo(videoSelected)
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
