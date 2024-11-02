import React, { useRef, useEffect } from "react";

function ResizableCanvas({ imageData, canvasWidth, canvasHeight }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            
            const resizedImageData = ctx.createImageData(canvasWidth, canvasHeight);

            
            for (let y = 0; y < canvasHeight; y++) {
                for (let x = 0; x < canvasWidth; x++) {
                    
                    const origX = Math.floor(x * (imageData.width / canvasWidth));
                    const origY = Math.floor(y * (imageData.height / canvasHeight));
                    const origIndex = (origY * imageData.width + origX) * 4; // 4 for RGBA

                    resizedImageData.data[(y * canvasWidth + x) * 4] = imageData.data[origIndex];       // R
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 1] = imageData.data[origIndex + 1]; // G
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 2] = imageData.data[origIndex + 2]; // B
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 3] = imageData.data[origIndex + 3]; // A
                }
            }

            ctx.putImageData(resizedImageData, 0, 0);
        }
    }, [imageData, canvasWidth, canvasHeight]);

    return <canvas ref={canvasRef} />;
}

export default ResizableCanvas;