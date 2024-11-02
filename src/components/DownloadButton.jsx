import React, { useState, useRef } from "react";

function DownloadButton({imageData}){

    function downloadImage()
    {
        if (!imageData) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.putImageData(imageData, 0, 0);
        const imageURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = 'Dithered-Image.png';
        link.click();
    }
    return (
        <div>
            <button 
                style={{fontSize: '25px' }} 
                onClick={downloadImage}
                disabled={!imageData}>Download Current Image</button>
        </div>
    )
}

export default DownloadButton