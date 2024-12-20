import React, { useState, useRef } from "react";

function ErrorDiffusionDithering({originalImageData, onFinish: finishwork}){
    
    function ApplyErrorDiffusionDithering()
    {
        const ditheredImageData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
        );

        const data = ditheredImageData.data;

        for (let y = 0; y < ditheredImageData.height; y++) {
            for (let x = 0; x < ditheredImageData.width; x++) {
                const i = (y * ditheredImageData.width + x) * 4;
        
                const grayscale = (data[i] +  data[i + 1] +  data[i + 2]) / 3;
                const newPixel = grayscale < 128 ? 0 : 255;
                const error = grayscale - newPixel;
        
                data[i] = data[i + 1] = data[i + 2] = newPixel;
        
                if (x + 1 < ditheredImageData.width) data[(y * ditheredImageData.width + (x + 1)) * 4] += error * 7 / 16;
                if (x - 1 >= 0 && y + 1 < ditheredImageData.height) data[((y + 1) * ditheredImageData.width + (x - 1)) * 4] += error * 3 / 16;
                if (y + 1 < ditheredImageData.height) data[((y + 1) * ditheredImageData.width + x) * 4] += error * 5 / 16;
                if (x + 1 < ditheredImageData.width && y + 1 < ditheredImageData.height) data[((y + 1) * ditheredImageData.width + (x + 1)) * 4] += error * 1 / 16;
            }
        }
        finishwork(ditheredImageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={ApplyErrorDiffusionDithering}>Apply Error Diffusion Dithering
            </button>
        </div>
    )
}

export default ErrorDiffusionDithering