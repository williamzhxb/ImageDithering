import React, { useRef, useEffect } from "react";

function ResizableCanvas({ imageData, canvasWidth, canvasHeight }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            // Set the canvas size
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Create a new ImageData object to fit the canvas size
            const resizedImageData = ctx.createImageData(canvasWidth, canvasHeight);

            // Loop through each pixel and scale the original ImageData
            for (let y = 0; y < canvasHeight; y++) {
                for (let x = 0; x < canvasWidth; x++) {
                    // Calculate the corresponding pixel in the original image data
                    const origX = Math.floor(x * (imageData.width / canvasWidth));
                    const origY = Math.floor(y * (imageData.height / canvasHeight));
                    const origIndex = (origY * imageData.width + origX) * 4; // 4 for RGBA

                    // Copy pixel data
                    resizedImageData.data[(y * canvasWidth + x) * 4] = imageData.data[origIndex];       // R
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 1] = imageData.data[origIndex + 1]; // G
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 2] = imageData.data[origIndex + 2]; // B
                    resizedImageData.data[(y * canvasWidth + x) * 4 + 3] = imageData.data[origIndex + 3]; // A
                }
            }

            // Put the resized ImageData on the canvas
            ctx.putImageData(resizedImageData, 0, 0);
        }
    }, [imageData, canvasWidth, canvasHeight]);

    return <canvas ref={canvasRef} />;
}

export default ResizableCanvas;