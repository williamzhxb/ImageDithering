import React, { useState, useRef } from "react";
import ThresholdDithering from "./ThresholdDithering"
import RandomDithering from "./RandomDithering"
import PatternDithering from "./PatternDithering"
import OrderedDithering from "./OrderedDithering"
import ErrorDiffusionDithering from "./ErrorDiffusionDithering"

const DITHERING_ALGORITHM = {
    threshold: (props) => <ThresholdDithering {...props}/>,
    random: (props) => <RandomDithering {...props}/>,
    pattern: (props) => <PatternDithering {...props} />,
    ordered: (props) => <OrderedDithering {...props}/>,
    errorDiffusion: (props) => <ErrorDiffusionDithering {...props}/>
};

function ImageUpload() {
    
    const fileUploadRef = useRef();

    const imgRef = useRef(new Image());

    const [selectedDitheringMethod, setSelectedDitheringMethod] = useState('threshold');

    const [ditheringResult, setDitheringResult] = useState('');

    const originalCanvasRef = useRef(null);

    const ditheredCanvasRef = useRef(null);

    function DisplayUploadedImage() {
        const uploadedFile = fileUploadRef.current.files[0];
        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                    imgRef.current.src = e.target.result;
                    imgRef.current.onload = () => {
                    const canvas = originalCanvasRef.current;
                    const ctx = canvas.getContext('2d');
                    canvas.width = imgRef.current.width;
                    canvas.height = imgRef.current.height;
                    ctx.drawImage(imgRef.current, 0, 0);
                };
            };
            reader.readAsDataURL(uploadedFile); 
        }
    }

    return (
        <div className="relative h-96 w-96">
            <label>Original Image</label>
            <br/>
            <canvas ref={originalCanvasRef} style={{ border: '1px solid black', marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
            <br/>
            <form id="uploadForm" encType='multipart/form-data'>
                <input
                    type="file"
                    id="file"
                    ref = {fileUploadRef}
                    onChange = {DisplayUploadedImage}
                    accept="image/*"
                />
            </form>
            <label htmlFor="dropdown">Select a dithering option:</label>
            <select id="dropdown" value={selectedDitheringMethod}  onChange={(e) => setSelectedDitheringMethod(e.target.value)}>
                <option value="threshold">Thresholding</option>
                <option value="random">Random Dithering</option>
                <option value="pattern">Pattern Dithering</option>
                <option value="ordered">Ordered Dithering</option>
                <option value="errorDiffusion">Error-Diffusion Dithering</option>
            </select>
            <br/>
            {DITHERING_ALGORITHM[selectedDitheringMethod]({
                originalCanvasRef,
                onFinish: async (resultImageData) => {
                    const ditheredCanvas = ditheredCanvasRef.current;
                    const context = ditheredCanvasRef.current.getContext('2d');
                    ditheredCanvas.width = imgRef.current.width;
                    ditheredCanvas.height = imgRef.current.height;
                    context.putImageData(resultImageData, 0, 0);
                }
            })}
            <br/>
            <br/>
            <label id="ditherResult">{ditheringResult}</label>
            <br/>
            <label>Current Image Preview</label>
            <br/>
            <canvas ref={ditheredCanvasRef} style={{ border: '1px solid black', marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
        </div>
    )
}

export default ImageUpload