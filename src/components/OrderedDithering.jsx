import React, { useState, useRef } from "react";

function OrderedDithering({originalImageData, onFinish: finishwork}){

    const [matrixPower, setMatrixPower] = useState(1);

    function generateBayerMatrix(n) {
        if (n === 1) {
            return [
                [0, 2],
                [3, 1]
            ];
        }
          
        const prevMatrix = generateBayerMatrix(n - 1);
        const size = prevMatrix.length;
        const newMatrix = Array(size * 2).fill(0).map(() => Array(size * 2).fill(0));
    
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const value = prevMatrix[y][x] * 4;
                newMatrix[y][x] = value;
                newMatrix[y][x + size] = value + 2;
                newMatrix[y + size][x] = value + 3;
                newMatrix[y + size][x + size] = value + 1;
            }
        }
        
        return newMatrix;
    }
    function ApplyOrderedDithering()
    {
        const ditheredImageData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            originalImageData.width,
            originalImageData.height
        );

        const data = ditheredImageData.data;

        const bayerMatrix = generateBayerMatrix(matrixPower);
        const matrixLength = bayerMatrix.length;

        for (let y = 0; y < ditheredImageData.height; y++) {
            for (let x = 0; x < ditheredImageData.width; x++) {
                const i = (y * ditheredImageData.width + x) * 4;
        
                const grayscale = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
                const threshold = (bayerMatrix[y % matrixLength][x % matrixLength] / 16) * 255;
        
                const color = grayscale > threshold ? 255 : 0;
                data[i] = color;       
                data[i + 1] = color;   
                data[i + 2] = color;    
            }
        }
        finishwork(ditheredImageData);
    }
    return (
        <div style={{ marginTop: '10px' }}>
            <label>Matrix Power: {matrixPower}</label>
            <input
                type="range"
                value={matrixPower}
                min="1"
                max="5"
                onChange={(e) => setMatrixPower(Number(e.target.value))}
            />
            <br/>
            <label>Matrix Power Defines the size of the matrix(size = 2 ^ matrix power)</label>
            <br/>
            <button 
                title="apply Dithering" 
                type="button"
                style={{fontSize: '25px' }} 
                onClick={ApplyOrderedDithering}>Apply Ordered Dithering
            </button>
        </div>
    )
}

export default OrderedDithering