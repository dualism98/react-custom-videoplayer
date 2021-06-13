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

    React.useEffect(() => {
        video.current.addEventListener('loadeddata', function(){
            console.log(video)
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
                currentTime.current.innerText = formatTime(video.current.currentTime, hasHours) 
                var prgrs = Math.floor(video.current.currentTime) / Math.floor(video.current.duration)
                progress.current.style.width = Math.floor(prgrs * (Number(props.width) - 300)) + "px";
            }, false);

            // video.current.addEventListener("progress", function() {
            //     var buff = Math.floor(video.current.buffered.end(0)) / Math.floor(video.current.duration);
            //     buffered.current.style.width =  Math.floor(buffered * controls.total.width()) + "px";
            // }, false);
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

    const updateProgress = (e) => {
        let x = (e.pageX - total.current.offsetLeft) / (Number(props.width) - 300);
        video.current.currentTime = x * video.current.duration;
        currentTime.current.innerText = formatTime(video.current.currentTime, hasHours)
    }

    return(
        <div tabIndex='0' onKeyDown={e => {
            console.log(e.key)
            if (e.key === ' ') playClick()
        }} style={{width: Number(props.width), height: Number(props.height)}}>
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
                    <div id="time">
                        <div>
                            <span ref={currentTime} id="currenttime">00:00</span> / 
                            <span ref={duration} id="duration"> 00:00</span>
                        </div>
                    </div>
                    {/* <div id='progress-line'> */}
                    {/* <span ref={progress} id="progress"> */}
                        <span ref={total} onClick={e => updateProgress(e)} id="total" style={{width: Number(props.width) - 300, height: 10, borderRadius: 5, cursor: 'pointer', marginTop: 25, backgroundColor: 'rgba(0,0,0,0.4)'}}>
                            {/* <span ref={buffered} id="buffered"><span id="current">​</span></span> */}
                        </span>
                        <span onClick={e => updateProgress(e)} style={{height: 10, borderRadius: 5, position: 'absolute', cursor: 'pointer', left: 210, top: 25}} ref={progress} id="progress"></span>
                    {/* </span> */}
                    {/* </div> */}
                </div> : null}
        </div>
    )
}

export default Player