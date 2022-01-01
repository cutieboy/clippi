import React, { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

import Clip from './Clip'
import Loader from './Loader'

function Videos() {
    const [clips, setClips] = useState([])
    const [loading, setLoading] = useState(true)

    const { currentUser } = useAuth()

    //Grab videos collection data
    const videoDatabase = firestore.collection('videos')
    const videoQuery = videoDatabase.where("user", "==", currentUser.uid)
    const [videos] = useCollectionData(videoQuery)

    useEffect(() => {
        if(videos) {
            setClips(videos)
            setLoading(false)
        }
    }, [videos])


    if(loading) {
        return <Loader />
    }

    return (
        <div className="videos-container">
            {clips.map(clip => {
                return <Clip />
            })}
        </div>
    )
}

export default Videos
