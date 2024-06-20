import { useEffect, useState } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

const useFaceDetect = ({runningMode}) => {
    const [faceLandMarker, setFaceLandmarker] = useState(null);
    useEffect(() => {
        async function createFaceLandmarker() {
            const filesetResolver = await FilesetResolver.forVisionTasks(
              "/tasks-vision/wasm"
            );
            const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
              baseOptions: {
                modelAssetPath: `/model/face_landmarker.task`,
                delegate: "GPU"
              },
              outputFaceBlendshapes: true,
              runningMode,
              numFaces: 1
            });
            setFaceLandmarker(landmarker);
        }
        createFaceLandmarker();
    }, []);
    return { faceLandMarker };
}

export default useFaceDetect;