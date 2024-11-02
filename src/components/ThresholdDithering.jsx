import React, { useState, useRef } from "react";

const Default_ThreshHold = 128;

function ThresholdDithering({originalImageData, onFinish: finishwork}){

    const [thresholdValue, setThresholdValue] = useState(Default_ThreshHold);

    function applyThresholdDithering() {
        const ditheredImageData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
        );

        const data = ditheredImageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const color = grayscale > thresholdValue ? 255 : 0;
            data[i] = color;       
            data[i + 1] = color;   
            data[i + 2] = color;  
        }

        finishwork(ditheredImageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <label>Threshold: {thresholdValue}</label>
            <input
                type="range"
                min="0"
                max="255"
                value={thresholdValue}
                onChange={(e) => setThresholdValue(Number(e.target.value))}
            />
            <br/>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={applyThresholdDithering}>Apply Threshold Dithering
            </button>
        </div>
    )
}

export default ThresholdDithering