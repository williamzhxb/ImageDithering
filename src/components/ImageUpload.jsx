import React, { useState, useRef } from "react";
import DefaultImage from "../logo.svg";
import Popup from 'reactjs-popup';

const ImageUpload = () => {
    const [imageURL, setImageURL] = useState(DefaultImage);
    
    const fileUploadRef = useRef();

    const [isThresholdBarHidden, setIsThresholdBarHidden] = useState(true);

    const [isTestHidden, setIsTestHidden] = useState(true);

    const [selectedValue, setSelectedValue] = useState('');

    const [ditheringResult, setDitheringResult] = useState('');

    const originalCanvasRef = useRef(null);

    const ditheredCanvasRef = useRef(null);

    const imgRef = useRef(new Image());

    const [threshold, setThreshold] = useState(128);

    const [threshold2, setThreshold2] = useState(128);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        switch(event.target.value)
        {
            case "Thresholding":
                setIsThresholdBarHidden(false);
                setIsTestHidden(true);
                break;
            case "Random":
                setIsThresholdBarHidden(true);
                setIsTestHidden(false);
                break;
            case "Pattern": 
                setIsThresholdBarHidden(true); 
                setIsTestHidden(true);
                break;
            case "Ordered": 
                setIsThresholdBarHidden(true); 
                setIsTestHidden(true);
                break;
            case "Error-Diffusion": 
                setIsThresholdBarHidden(true); 
                setIsTestHidden(true);
                break;
            default:
        }
    };

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const displayUploadedImage = () => {
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
        const cachedURL = URL.createObjectURL(uploadedFile);
        setImageURL(cachedURL);
    }

    const ApplyDitheringToImage = () => {
        if(imageURL === DefaultImage)
        {
            setDitheringResult("Please upload an image before apply any dithering!");
            return;
        }

        switch(selectedValue) {
            case "Thresholding":
                const canvas = originalCanvasRef.current;
                const originalCtx = canvas.getContext('2d');
                const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Apply thresholding
                for (let i = 0; i < data.length; i += 4) {
                    const grayscale = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
                    const color = grayscale > threshold ? 255 : 0; // Black or white based on threshold
                    data[i] = color;     // Red
                    data[i + 1] = color; // Green
                    data[i + 2] = color; // Blue
                }
                const ditheredCanvas = ditheredCanvasRef.current;
                const DitheredCtx = ditheredCanvas.getContext('2d');
                DitheredCtx.putImageData(imageData, 0, 0);
            
                setDitheringResult("Applied Threshold Dithering!");
                break;
            case "Random":
                setDitheringResult("Applied Random Dithering");
                break;
            case "Pattern":
                setDitheringResult("Applied Pattern Dithering");
                break;
            case "Ordered":
                setDitheringResult("Applied Ordered Dithering");
                break;
            case "Error-Diffusion":
                setDitheringResult("Applied Error-Diffusion Dithering");
                break;
            default:
                setDitheringResult("Please Choose a Dithering method!");
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
                    onChange = {displayUploadedImage}
                />
            </form>
            <label htmlFor="dropdown">Select a dithering option:</label>
            <select id="dropdown" value={selectedValue} onChange={handleChange}>
                <option value="Default">Please Select from the following</option>
                <option value="Thresholding">Thresholding</option>
                <option value="Random">Random Dithering</option>
                <option value="Pattern">Pattern Dithering</option>
                <option value="Ordered">Ordered Dithering</option>
                <option value="Error-Diffusion">Error-Diffusion Dithering</option>
            </select>
            <br/>
            <div hidden={isTestHidden} style={{ marginTop: '10px' }}>
                <label>Threshold: {threshold2}</label>
                <input
                type="range"
                min="0"
                max="255"
                value={threshold2}
                onChange={(e) => setThreshold2(Number(e.target.value))}
                />
            </div>
            <div hidden={isThresholdBarHidden} style={{ marginTop: '10px' }}>
                <label>Threshold: {threshold}</label>
                <input
                type="range"
                min="0"
                max="255"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                />
            </div>
            <br/>
            <button title="apply Dithering" type="button" onClick={ApplyDitheringToImage}>Apply Dithering</button>
            <br/>
            <br/>
            <label id="ditherResult">{ditheringResult}</label>
            <br/>
            <br/>
            <br/>
            <label>Current Image Preview</label>
            <br/>
            <canvas ref={ditheredCanvasRef} style={{ border: '1px solid black', marginTop: '10px', maxWidth: '100%', height: 'auto' }} />
        </div>
    )
}

export default ImageUpload