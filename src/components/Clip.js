import React from 'react'
import ReactPlayer from 'react-player'

function Clip(props) {
    const { name, slug, url, user } = props

    return (
        <div className="clip-container">
            <ReactPlayer 
                className="clip-video" 
                controls 
                url={url}
                width="100%"
                height="56.25%"
                />
            <p>{name}</p>
            <p>https://clippi.io/{slug} Copy Link</p>
        </div>
    )
}

export default Clip
