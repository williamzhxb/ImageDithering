import React, { useState, useRef, useEffect } from "react";
import DefaultImage from "../DefaultImage.png"
import ThresholdDithering from "./ThresholdDithering"
import RandomDithering from "./RandomDithering"
import PatternDithering from "./PatternDithering"
import OrderedDithering from "./OrderedDithering"
import ErrorDiffusionDithering from "./ErrorDiffusionDithering"
import DownloadButton from "./DownloadButton";
import ResizableCanvas from "./ResizableCanvas";


//A map matching user selection to the actual dithering function components
const DITHERING_ALGORITHM = {
    threshold: (props) => <ThresholdDithering {...props}/>,
    random: (props) => <RandomDithering {...props}/>,
    pattern: (props) => <PatternDithering {...props} />,
    ordered: (props) => <OrderedDithering {...props}/>,
    errorDiffusion: (props) => <ErrorDiffusionDithering {...props}/>
};

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

function ImageUpload() {
    
    const fileUploadRef = useRef();

    const [originalImageData, setOriginalImageData] = useState(null);
    const [ditheredImageData, setDitheredImageData] = useState(null);
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
   
    const imgRef = useRef(new Image());

    const [selectedDitheringMethod, setSelectedDitheringMethod] = useState('threshold');

    //sets the default image
    useEffect(() => {
        const img = new Image();
        img.src = DefaultImage;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setOriginalImageData(imageData);
            setDitheredImageData(imageData);
        };
    }, []);

    //To displayed the image after user upload an image file
    function DisplayUploadedImage() {
        const uploadedFile = fileUploadRef.current.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgRef.current.src = e.target.result;
                imgRef.current.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = imgRef.current.width;
                    canvas.height = imgRef.current.height;
                    ctx.drawImage(imgRef.current, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    setOriginalImageData(imageData);
                    setDitheredImageData(imageData);
                };
            };
            reader.readAsDataURL(uploadedFile); 
        }
    }

    const handleUndo = () => {
        if (undoStack.length > 0) {
            const lastState = undoStack.pop();
            setRedoStack((prev) => [...prev, ditheredImageData]);
            setDitheredImageData(lastState);
            setUndoStack([...undoStack]);
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextState = redoStack.pop();
            setUndoStack((prev) => [...prev, ditheredImageData]);
            setDitheredImageData(nextState);
            setRedoStack([...redoStack]);
        }
    };

    return (
        <div className="upload">
            {originalImageData && (
                <div style={{ display: 'inline-block', marginRight: '30px' }}>
                    <label style={{fontSize: '30px' }}>Original Image</label>
                    <br/>
                    <ResizableCanvas 
                        imageData={originalImageData} 
                        canvasWidth={CANVAS_WIDTH} 
                        canvasHeight={CANVAS_HEIGHT} 
                    />
                </div>
            )}
            {ditheredImageData && (
                <div style={{ display: 'inline-block' }}>
                    <label style={{fontSize: '30px' }}>Current Image</label>
                    <br/>
                    <ResizableCanvas 
                        imageData={ditheredImageData} 
                        canvasWidth={CANVAS_WIDTH} 
                        canvasHeight={CANVAS_HEIGHT} 
                    />
                </div>
            )}
            <br/>
            <form id="uploadForm" encType='multipart/form-data'>
                <input
                    type="file"
                    id="file"
                    ref = {fileUploadRef}
                    style={{fontSize: '25px' }}
                    onChange = {DisplayUploadedImage}
                    accept="image/*"
                />
            </form>
            <label htmlFor="dropdown">Select a dithering option:</label>
            <select id="dropdown" value={selectedDitheringMethod} style={{fontSize: '25px' }} onChange={(e) => setSelectedDitheringMethod(e.target.value)}>
                <option value="threshold">Thresholding</option>
                <option value="random">Random Dithering</option>
                <option value="pattern">Pattern Dithering</option>
                <option value="ordered">Ordered Dithering</option>
                <option value="errorDiffusion">Error-Diffusion Dithering</option>
            </select>
            <br/>
            {DITHERING_ALGORITHM[selectedDitheringMethod]({
                originalImageData,
                onFinish: async (resultImageData) => {
                    setDitheredImageData(resultImageData);
                    setUndoStack((prev) => [...prev, ditheredImageData]);
                    setRedoStack([]);
                }
            })}
            <button onClick={handleUndo} style={{ marginRight: '10px', fontSize: '20px' }}>Undo</button>
            <button onClick={handleRedo} style={{ marginRight: '10px', fontSize: '20px' }}>Redo</button>
            <br/>
            <DownloadButton imageData={ditheredImageData} style= {{marginTop:'20px'}}/>
        </div>
    )
}

export default ImageUpload