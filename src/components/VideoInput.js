import { useState, useEffect, useRef } from "react";

const VideoInput = () => {
    const videoRef = useRef(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [camera, setCamera] = useState(null);
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        setVideo(videoRef.current);
        setCanvas(canvasRef.current);        
    }, [])
    const start = async () => {
        await launchCamera();
    }

    const launchCamera = () => 
        new Promise(resolve => {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                    mandatory: {
                        minWidth: 1920,
                        maxWidth: 19200,
                        minHeight: 1080,
                        maxHeight: 1080,
                        minFrameRate: 1,
                        maxFrameRate: 10
                    }
                    }
                })
                .then(
                    stream => {
                    video.srcObject = stream;
                    video.play();
                    setCamera(true);
                    resolve();
                    },
                    () => {}
                ).catch(err => alert(err.message));
        });

    return (
        <div>
        {!camera && (
            <button
                style={{
                    padding: 20,
                    fontSize: 14
                }}
                onClick={() => {
                    start();
                }}>
                    Launch Camera
            </button>
        )}
        <video ref={videoRef} src='/test.mp4'></video>
        {/* <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <video ref={videoRef} style={{ display: videoFile ? 'block' : 'none' }} controls></video> */}
        <canvas id="output"></canvas>
        {loading && (
            <div
            style={{
                position: "absolute",
                top: 70,
                left: 10,
                width: 320,
                height: 240,
                background: "rgba(0,0,0,0.5)",
                zIndex: 1,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            >
            Loading
            </div>
        )}
    </div>
    )
}

export default VideoInput;