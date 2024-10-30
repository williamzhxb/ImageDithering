import React, { useState, useRef } from "react";
import DefaultImage from "../logo.svg";

const ImageUpload = () => {
    const [imageURL, setImageURL] = useState(DefaultImage);
    
    const fileUploadRef = useRef();

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    const handleImageUpload = (event) => {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    const displayImage = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cachedURL = URL.createObjectURL(uploadedFile);
        setImageURL(cachedURL);
    }
    return (
        <div className="relative h-96 w-96">
            <img 
                src={imageURL}
                alt = "Image"
                className = "h-96 w-96 rounded-full" 
                style={{ width: '400px', height: '300px' }}
            />
            <form id="uploadForm" encType='multipart/form-data'>
                <input
                    type="file"
                    id="file"
                    ref = {fileUploadRef}
                    onChange = {displayImage}
                />
            </form>
            <label htmlFor="dropdown">Select a dithering option:</label>
            <select id="dropdown" value={selectedValue} onChange={handleChange}>
                <option value="">Please select Dithering Method</option>
                <option value="Thresholding">Thresholding</option>
                <option value="Random">Random Dithering</option>
                <option value="Patterning">Patterning Dithering</option>
                <option value="Ordered">Ordered Dithering</option>
                <option value="Error-Diffusion">Error-Diffusion Dithering</option>
            </select>
        </div>
    )
}

export default ImageUpload