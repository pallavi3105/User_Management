import React from 'react';
import './FileUpload.css';

const FileUpload = () => {
  return (
    <div className="file-upload">
      <h2>Upload Files</h2>
      <input type="file" />
      <button>Upload</button>
    </div>
  );
};

export default FileUpload;
