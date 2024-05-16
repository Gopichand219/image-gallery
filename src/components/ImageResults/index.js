import React from 'react';
import './index.css';

const ImageResults = ({ images ,query}) => {
  return (
    <div className="image-results">
      <h1 className='image-query'>{query}</h1>
      {images.map((image) => (
        <div key={image.id} className="image-item">
          <img src={image.urls.small} alt={image.description} className="image" />
          <div className="image-info">
            <p>Captured by {image.user.name}</p>
            <p>{image.alt_description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageResults;
