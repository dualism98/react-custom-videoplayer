import React from 'react';



const Player = (props) => {
    
    const playClick = () => {
        let controls = {
            video: document.getElementById('video-player'),
            playpause: document.getElementById('playpause')
        }

        if (controls.video.paused) {
            controls.video.play()
            controls.playpause.innerText = 'Pause'
        } else {
            controls.video.pause()
            controls.playpause.innerText = 'Play'
        }
    }

    return(
        <div>
            <div>
                <video 
                id="video-player"
                width={props.width}
                height={props.height}>
                    <source 
                        src={props.url} />
                </video>
            </div>
            <div id="controls">
                <span id="playpause" className="paused" onClick={() => playClick()}>Play</span>
            </div>
        </div>
    )
}

export default Player