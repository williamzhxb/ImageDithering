import React, { useState, useRef } from "react";

const Default_ThreshHold = 128;

function ThresholdDithering({originalCanvasRef, onFinish: finishwork}){
    const [threshholdValue, setThresholdValue] = useState(Default_ThreshHold);
    function ApplyThreshholdDithering()
    {
        const canvas = originalCanvasRef.current;
        const originalCtx = canvas.getContext('2d');
        const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply thresholding
        for (let i = 0; i < data.length; i += 4) {
            const grayscale =  (data[i] +  data[i + 1] +  data[i + 2]) / 3;
            const color = grayscale > threshholdValue ? 255 : 0;
            data[i] = color;  
            data[i + 1] = color;
            data[i + 2] = color;
        }
        finishwork(imageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <label>Threshold: {threshholdValue}</label>
            <input
                type="range"
                min="0"
                max="255"
                value={threshholdValue}
                onChange={(e) => setThresholdValue(Number(e.target.value))}
            />
            <br/>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={ApplyThreshholdDithering}>Apply Threshold Dithering
            </button>
        </div>
    )
}

export default ThresholdDithering