import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef, useState } from "react";
import useFaceDetect from "../hooks/useFaceDetect";
import { DrawingUtils, FaceLandmarker } from "@mediapipe/tasks-vision";
import { lowerLipIds, upperLipIds } from "../constants/constants";
import { useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";

const ImageLoad = () => {
    const rougeColor = useSelector((state) => state.color.value);
    const [selectedFile, setSelectedFile] = useState(null);
    const {faceLandMarker} = useFaceDetect('IMAGE');
    const imageRef = useRef(null);
    const [faceLandmarkerResult, setFaceLandmarkerResult] = useState(null);
    const canvasRef = useRef(null);
    const onSelectFile = (ev) => {
        let files = ev.target.files;
        let reader = new FileReader();
        if (files.length > 0) {
            reader.readAsDataURL(files[0]);
        }
        reader.onload = (e) => {
          setSelectedFile(e.target?.result);
        };
    };

    const detectLip = (e) => {
        e.preventDefault();
        if (!faceLandMarker) return;
        // validate rougeColor
        if (!rougeColor) {
            alert("Please select a color !");
            return;
        }
        // validate selected Image
        if (!selectedFile || !imageRef.current) {
            return;
        }

        const result = faceLandMarker.detect(imageRef.current);
        setFaceLandmarkerResult(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const drawLip = () => {
        if ( !canvasRef.current || !faceLandmarkerResult ) return;
        const canvas = canvasRef.current;
        const imageElement = imageRef.current;
        canvas.setAttribute("class", "canvas absolute");
        canvas.setAttribute("width", imageElement.naturalWidth + "px");
        canvas.setAttribute("height", imageElement.naturalHeight + "px");
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.width = `${imageElement.width}px`;
        canvas.style.height = `${imageElement.height}px`;
        const ctx = canvas.getContext("2d");

        for (const landmarks of faceLandmarkerResult.faceLandmarks) {
            // console.log(landmarks);
            // Draw upper lip
            ctx.fillStyle = `${rougeColor}80`; // Red color with 50% opacity
            ctx.beginPath();
            upperLipIds.forEach((id, index) => {
                const x = landmarks[id].x * canvasRef.current.width;
                const y = landmarks[id].y * canvasRef.current.height;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.fill();

            // Draw lower lip
            ctx.beginPath();
            lowerLipIds.forEach((id, index) => {
                const x = landmarks[id].x * canvasRef.current.width;
                const y = landmarks[id].y * canvasRef.current.height;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.fill();
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_TESSELATION,
            //   { color: "green", lineWidth: 0.1 }
            // );

            // drawingUtils.drawConnectors(
            //     landmarks,
            //     FaceLandmarker.FACE_LANDMARKS_CONTOURS,
            //     { color: "#30FF30" }
            //   );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
            //   { color: "#FF3030" }
            // );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
            //   { color: "#FF3030" }
            // );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
            //   { color: "#30FF30" }
            // );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
            //   { color: "#30FF30" }
            // );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
            //   { color: "#E0E0E0" }
            // );
            // drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
            //   color: "red", lineWidth: 0.5
            // });
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS,
            //   { color: "#FF3030" }
            // );
            // drawingUtils.drawConnectors(
            //   landmarks,
            //   FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS,
            //   { color: "#30FF30" }
            // );
        }
    }

    useEffect(() => {
        if (faceLandmarkerResult)
            drawLip();
    }, [drawLip, faceLandmarkerResult]);

    const canvasClipping = () => {
        const canvas = canvasRef.current;
        const imageElement = imageRef.current;
        canvas.setAttribute("class", "canvas absolute");
        canvas.setAttribute("width", imageElement.naturalWidth + "px");
        canvas.setAttribute("height", imageElement.naturalHeight + "px");
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.width = `${imageElement.width}px`;
        canvas.style.height = `${imageElement.height}px`;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageRef.current, 0, 0, imageRef.current.width, imageRef.current.height);
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
    }

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const imageElement = imageRef.current;
        if( !canvas ) {
            return;
        }
        console.log(imageRef.current.height);
        console.log(imageRef.current);
        canvas.setAttribute("class", "canvas absolute");
        canvas.setAttribute("width", imageElement.naturalWidth + "px");
        canvas.setAttribute("height", imageElement.naturalHeight + "px");
        canvas.style.left = "0px";
        canvas.style.top = "0px";
        canvas.style.width = `${imageElement.width}px`;
        canvas.style.height = `${imageElement.height}px`;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
    }

    document.addEventListener("resize", drawLip());

    useEffect(() => {
        if( imageRef.current )
            imageRef.current.src = selectedFile;
        redrawCanvas();
    }, [selectedFile])

    return (
        <div>
            <div className="mx-auto w-2/3 max-h-120 min-height-60 border-dashed border-2 border-indigo-600">
                <div className="w-1/2 h-1/2 mx-auto py-20">
                    <div className="relative">
                        {!selectedFile && <div className="py-40" width={640} height={380}>Please select your avatar...</div>}
                        {selectedFile && <div className="mx-auto">
                            <canvas ref={canvasRef} className="canvas absolute" width="640px" height="380px" style={{left: '0px', top: '0px'}}></canvas>
                            <img src={selectedFile} style={{width: '640px'}} alt="avatar" ref={imageRef}/>
                        </div>
                        }
                    </div>
                </div>
                <p className="mt-4  text-xs leading-5 text-current">
                    PNG, JPG, GIF Files...
                </p>
            </div>
            <div className="mt-8 text-xs leading-5 text-white">
                <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <span>
                    {!selectedFile
                        ? `Select your avatar`
                        : `Change your avatar`}{" "}
                    </span>
                    <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={onSelectFile}/>
                </label>

                <LoadingButton 
                    label="Show Result"
                    handleClick={detectLip}
                    loadingLabel="Loading AI model" 
                    // loading={faceLandMarker ? false: true}
                    loading={true}
                    disable={(faceLandMarker && selectedFile) ? false: true}
                    classList={`${selectedFile ? 'cursor-pointer': 'cursor-not-allowed'} bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`} 
                />
            </div>
        </div>
        
    )
}

export default ImageLoad;