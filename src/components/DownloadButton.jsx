import React, { useState, useRef } from "react";

function DownloadButton(ditheredCanvasRef){

    function downloadImage()
    {
        const canvas = ditheredCanvasRef.current;
        const imageURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'Dithered-Image.png';
        link.click();
    }
    return (
        <div>
            <button style={{fontSize: '25px' }} onClick={downloadImage}>Download Current Image</button>
        </div>
    )
}

export default DownloadButton