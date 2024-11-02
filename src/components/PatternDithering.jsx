import React, { useState, useRef } from "react";

const Default_DotSize = 1;

function PatternDithering({originalImageData, onFinish: finishwork}){

    const [dotSize, setDotSize] = useState(Default_DotSize);
    const canvasRef = useRef(null);

    function ApplyPatternDithering()
    {
        const data = originalImageData.data;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = originalImageData.width;
        newCanvas.height = originalImageData.height;
        const newCtx = newCanvas.getContext('2d');
        newCtx.fillStyle = 'white';
        newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        for (let y = 0; y < newCanvas.height; y += dotSize) {
            for (let x = 0; x < newCanvas.width; x += dotSize) {
                const i = (y * newCanvas.width + x) * 4;
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
        </div>
    )
}

export default PatternDithering