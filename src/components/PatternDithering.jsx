import React, { useState, useRef } from "react";
import DownloadButton from "./DownloadButton";

const Default_DotSize = 1;

function PatternDithering({originalCanvasRef, ditheredCanvasRef, onFinish: finishwork}){

    const [dotSize, setDotSize] = useState(Default_DotSize);
    function ApplyPatternDithering()
    {
        const canvas = originalCanvasRef.current;
        const originalCtx = canvas.getContext('2d');
        const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        const newCtx = newCanvas.getContext('2d');
        newCtx.fillStyle = 'white';
        newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        for (let y = 0; y < canvas.height; y += dotSize) {
            for (let x = 0; x < canvas.width; x += dotSize) {
            
                const i = (y * canvas.width + x) * 4;
                const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
                
                const radius = ((255 - grayscale) / 255) * (dotSize / 2);
      
                newCtx.beginPath();
                newCtx.arc(x + dotSize / 2, y + dotSize / 2, radius, 0, Math.PI * 2);
                newCtx.fillStyle = 'black';
                newCtx.fill();
            }
        }
        finishwork(newCtx.getImageData(0, 0, newCanvas.width, newCanvas.height));
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <label>DotSize: {dotSize}</label>
            <input
                type="range"
                min="1"
                max="10"
                value={dotSize}
                onChange={(e) => setDotSize(Number(e.target.value))}
            />
            <br/>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }} 
                onClick={ApplyPatternDithering}>Apply Pattern Dithering
            </button>
            <br/>
            <br/>
            <DownloadButton{...ditheredCanvasRef}/>
        </div>
    )
}

export default PatternDithering