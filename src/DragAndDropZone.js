// http://127.0.0.1:8000/predict
import React, { useState } from "react";
import axios from "axios";

const DragAndDropZone = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/predict",
          formData
        );
        setResponse(response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No image to upload.");
    }
  };

  return (
    <div className="drag-drop-container"
      
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3>Drag & Drop Image Here</h3>
      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            className="uploaded-image"
          />
          <button onClick={handleUpload}>Upload Image</button>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {response && (
        <div className="response-container">
          <h2>Response:</h2>
          <h3>
            <strong>Class : {response.class}</strong>
          </h3>
          <h3>
            <strong>
              Confidence: {response.confidence.toString().slice(2, 4)}%
            </strong>
          </h3>
        </div>
      )}
    </div>
  );
};

export default DragAndDropZone;
