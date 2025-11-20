"use client";

import { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

export default function UploadIPFS({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert("File size must be less than 10MB");
        return;
      }

      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div
      className={`upload-container ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label htmlFor="fileInput" className="upload-label">
        {selectedFile ? (
          <div className="upload-success">
            <FaCheckCircle className="success-icon" />
            <p>{selectedFile.name}</p>
            <span className="file-size">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        ) : (
          <div className="upload-prompt">
            <FaCloudUploadAlt className="upload-icon" />
            <p>Drag & drop an image here</p>
            <span>or click to browse</span>
            <span className="file-types">Supported: JPEG, PNG, GIF, WebP (Max 10MB)</span>
          </div>
        )}
      </label>
    </div>
  );
}
