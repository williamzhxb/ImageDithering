import React, { useState, useRef } from "react";
import DownloadButton from "./DownloadButton";

function ErrorDiffusionDithering({originalCanvasRef, ditheredCanvasRef, onFinish: finishwork}){
    function ApplyErrorDiffusionDithering()
    {
        const canvas = originalCanvasRef.current;
        const originalCtx = canvas.getContext('2d');
        const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
        
                const grayscale = (data[i] +  data[i + 1] +  data[i + 2]) / 3;
                const newPixel = grayscale < 128 ? 0 : 255;
                const error = grayscale - newPixel;
        
                data[i] = data[i + 1] = data[i + 2] = newPixel;
        
                if (x + 1 < canvas.width) data[(y * canvas.width + (x + 1)) * 4] += error * 7 / 16;
                if (x - 1 >= 0 && y + 1 < canvas.height) data[((y + 1) * canvas.width + (x - 1)) * 4] += error * 3 / 16;
                if (y + 1 < canvas.height) data[((y + 1) * canvas.width + x) * 4] += error * 5 / 16;
                if (x + 1 < canvas.width && y + 1 < canvas.height) data[((y + 1) * canvas.width + (x + 1)) * 4] += error * 1 / 16;
            }
        }
        finishwork(imageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={ApplyErrorDiffusionDithering}>Apply Error Diffusion Dithering
            </button>
            <br/>
            <br/>
            <DownloadButton{...ditheredCanvasRef}/>
        </div>
    )
}

export default ErrorDiffusionDithering