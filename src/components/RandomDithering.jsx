
import React, { useState, useRef } from "react";
import DownloadButton from "./DownloadButton";

function RandomDithering({originalCanvasRef, ditheredCanvasRef, onFinish: finishwork}){

    function ApplyRandomDithering()
    {
        const canvas = originalCanvasRef.current;
        const originalCtx = canvas.getContext('2d');
        const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const grayscale =  (data[i] +  data[i + 1] + data[i + 2]) / 3;
            const randomThreshold = Math.random() * 255;
            const color = grayscale > randomThreshold ? 255 : 0;
            data[i] = color;
            data[i + 1] = color;
            data[i + 2] = color;
        }
        finishwork(imageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <button 
                title="apply Dithering" 
                type="button" 
                style={{fontSize: '25px' }}
                onClick={ApplyRandomDithering}>Apply Random Dithering
            </button>
            <br/>
            <br/>
            <DownloadButton{...ditheredCanvasRef}/>
        </div>
    )
}

export default RandomDithering