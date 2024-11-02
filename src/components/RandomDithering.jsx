
import React, { useState, useRef } from "react";

function RandomDithering({originalImageData, onFinish: finishwork}){

    function ApplyRandomDithering()
    {
        const ditheredImageData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
        );

        const data = ditheredImageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const grayscale =  (data[i] +  data[i + 1] + data[i + 2]) / 3;
            const randomThreshold = Math.random() * 255;
            const color = grayscale > randomThreshold ? 255 : 0;
            data[i] = color;
            data[i + 1] = color;
            data[i + 2] = color;
        }
        finishwork(ditheredImageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={ApplyRandomDithering}>Apply Random Dithering
            </button>
        </div>
    )
}

export default RandomDithering