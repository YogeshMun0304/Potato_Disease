import React from 'react';
import DragAndDropZone from './DragAndDropZone';
import './App.css';
const App = () => {
  return (
    <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
    <h1>Image Upload</h1>
    <DragAndDropZone />
  </div>
  );
};

export default App;
