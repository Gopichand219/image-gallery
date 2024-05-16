import React, { useState } from 'react';
import './App.css';
import ImageResults from './components/ImageResults';
import ImageSearch from './components/ImageSearch';
import { ClipLoader } from 'react-spinners';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const searchImages = async (query, page = 1) => {
    setLoading(true);
    setQuery(query);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=gABcXRms_G7ypQTyzC7SpLxL-yGSH9qvCHJJaB70dvY`
    );
    console.log(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=gABcXRms_G7ypQTyzC7SpLxL-yGSH9qvCHJJaB70dvY`)
    const data = await response.json();
    console.log(data.results);
    if (page === 1) {
      setImages(data.results);
    } else {
      setImages((prevImages) => [...prevImages, ...data.results]);
    }
    setLoading(false);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchImages(query, nextPage);
  };

  return (
    <div className="App">
      <h1>Image Search App</h1>
      <ImageSearch searchImages={searchImages} />
      {loading ? (
        <div className="loader">
          <ClipLoader size={150} color={"#007bff"} loading={loading} />
        </div>
      ) : (
        <ImageResults images={images} />
      )}
      {images.length > 0 && !loading && (
        <button onClick={loadMoreImages} className="load-more-button">Load More</button>
      )}
    </div>
  );
}

export default App;
