import React from 'react';
import './Player.css'

// eslint-disable-next-line no-extend-native
Number.prototype.lead0 = function(n) {
    var nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};

function formatTime(time, hours) {
    var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;
        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
    } else {
        return m.lead0(2) + ":" + s.lead0(2);
    }
}

const Player = (props) => {
    const video = React.useRef()
    const controls = React.useRef()
    const duration = React.useRef()
    const progress = React.useRef()
    const total = React.useRef()
    const currentTime = React.useRef()
    const buffered = React.useRef()
    const [loaded, setLoaded] = React.useState(false)
    const [hasHours, setHasHours] = React.useState(false)
    const [width, setScreenWidth] = React.useState(0)

    React.useEffect(() => {
        setScreenWidth(Number(props.width))
        video.current.addEventListener('loadeddata', function(){
            setLoaded(true)
            let div = document.getElementsByClassName('c-pp')[0]
            video.current.addEventListener('ended', function(){
                video.current.pause()
            })

            video.current.addEventListener("play", function() {
                div.classList.add('is-play')
            });
                            
            video.current.addEventListener("pause", function() {
                div.classList.remove('is-play')
            });

            video.current.addEventListener("canplay", function() { 
                setHasHours(video.current.dutarion / 3600 >= 1.0)                 
                duration.current.innerText = formatTime(video.current.duration, hasHours);
            }, false);

            video.current.addEventListener("timeupdate", function() {
                console.log('update')
                const div = document.getElementById('video-container');
                currentTime.current.innerText = formatTime(video.current.currentTime, hasHours) 
                var prgrs = Math.floor(video.current.currentTime) / Math.floor(video.current.duration)
                progress.current.style.width = Math.floor(prgrs * (Number(div.style.width.slice(0, div.style.width.length - 2)) - 300)) + "px";
                console.log(prgrs, width, prgrs * (width - 300))
                console.log(progress.current.style.width)
            }, false);
        })
    }, [])

    const playClick = () => {
        let div = document.getElementsByClassName('c-pp')[0]
        if (video.current.paused) {
            video.current.play()
            div.classList.add('is-play')
        } else {
            video.current.pause()
            div.classList.remove('is-play')
        }
    }

    const updateProgress = (e) => {
        let x = (e.pageX - total.current.offsetLeft) / (width - 300);
        console.log(x)
        video.current.currentTime = x * video.current.duration;
        currentTime.current.innerText = formatTime(video.current.currentTime, hasHours)
    }

    document.addEventListener('keypress', e => {
        console.log(e.key)
    })

    const setFullScreen = () => {
        const div = document.getElementById('video-container');
        const screen_width = window.screen.width
        const screen_height = window.screen.height

        var prgrs = Math.floor(video.current.currentTime) / Math.floor(video.current.duration)
        if (!document.fullscreenElement){
            setScreenWidth(screen_width)
            progress.current.style.width = Math.floor(prgrs * (screen_width - 300)) + "px";
            video.current.width = screen_width
            video.current.height = screen_height 
            if (div.requestFullscreen) {
                div.requestFullscreen();
            } else if (div.webkitRequestFullscreen) {
                div.webkitRequestFullscreen();
            } else if (div.msRequestFullScreen) {
                div.msRequestFullScreen();
            }
        } else {
            document.exitFullscreen()
            setScreenWidth(Number(props.width))
            progress.current.style.width = Math.floor(prgrs * (Number(props.width) - 300)) + "px";
            video.current.width = Number(props.width)
            video.current.height = Number(props.height)
            
        }
    }

    return(
        <div id='video-container' tabIndex='0' onKeyDown={e => {
            if (e.key === ' ') playClick()
        }} onDoubleClick={() => {
            setFullScreen()
        }} style={{width: width, height: Number(props.height)}}>
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
                        background: `linear-gradient(to top, ${props.panelColor}, rgba(0,0,0,0))`, width: width}}>
                    <div id='button-div'>
                        <div className={"c-pp"} onClick={() => playClick()}>   
                            <div className="c-pp__icon" />
                        </div>
                    </div>
                    <div id="time">
                        <div>
                            <span ref={currentTime} id="currenttime">00:00</span> / 
                            <span ref={duration} id="duration"> 00:00</span>
                        </div>
                    </div>
                        <span ref={total} onClick={e => updateProgress(e)} id="total" style={{width: width - 300, height: 10, borderRadius: 5, cursor: 'pointer', marginTop: 35, backgroundColor: 'rgba(0,0,0,0.4)', color: 'rgba(0,0,0,0.4)'}}>
                            {/* <span ref={buffered} id="buffered"><span id="current">​</span></span> */}
                        </span>
                        <span onClick={e => updateProgress(e)} style={{height: 10, borderRadius: 5, position: 'absolute', cursor: 'pointer', left: 210, top: 35}} ref={progress} id="progress"></span>
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