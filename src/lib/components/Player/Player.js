import React from 'react';
import { useSpring, animated, config} from 'react-spring'
import './Player.css'


const Player = (props) => {
    const video = React.useRef()
    const controls = React.useRef()
    const [loaded, setLoaded] = React.useState(false)
    const [paused, setPaused] = React.useState(true)
    const { x } = useSpring({ config: { duration: 300 }, x: paused ? 1 : 0 });

    React.useEffect(() => {
        video.current.addEventListener('loadeddata', function(){
            setLoaded(true)
            let div = document.getElementsByClassName('c-pp')[0]
            video.current.addEventListener('ended', function(){
                video.current.pause()
                setPaused(true)
            })

            video.current.addEventListener("play", function() {
                div.classList.add('is-play')
                setPaused(false)
            });
                            
            video.current.addEventListener("pause", function() {
                div.classList.remove('is-play')
                setPaused(true)
            });
        })
    }, [])

    const playClick = () => {
        let div = document.getElementsByClassName('c-pp')[0]
        console.log(div.classList)
        if (video.current.paused) {
            video.current.play()
            div.classList.add('is-play')
            setPaused(false)
        } else {
            video.current.pause()
            div.classList.remove('is-play')
            setPaused(true)
        }
    }

    return(
        <div style={{width: Number(props.width), height: Number(props.height)}}>
            <video 
                id="video-player"
                ref={video}
                style={{margin: 0}}
                onClick={() => playClick()}
                width={props.width}
                height={props.height}>
                    <source 
                        src={props.url} />
            </video>
            {loaded ? 
                <div id="controls" 
                    style={{
                        width: Number(props.width), 
                        height: 60, 
                        background: `linear-gradient(to top, ${props.panelColor}, rgba(0,0,0,0))`}}>
                    <div id='button-div'>
                        <div className={"c-pp"} onClick={() => playClick()}>   
                            <div className="c-pp__icon" />
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}

export default Player