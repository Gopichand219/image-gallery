import React, { useState } from 'react';
import './App.css';
import ImageResults from './components/ImageResults';
import ImageSearch from './components/ImageSearch';
import { ClipLoader } from 'react-spinners';
import riseupIcon from './assets/riseup-icon.png';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [recentSearches, setRecentSearches] = useState([]);

  const searchImages = async (query, page = 1) => {
    setLoading(true);
    setQuery(query);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=gABcXRms_G7ypQTyzC7SpLxL-yGSH9qvCHJJaB70dvY`
    );
    const data = await response.json();
    if (page === 1) {
      setImages(data.results);
    } else {
      setImages((prevImages) => [...prevImages, ...data.results]);
    }
    setLoading(false);

    setRecentSearches((prevSearches) => {
      const newSearches = [query, ...prevSearches.filter((item) => item !== query)];
      return newSearches.slice(0, 4);
    });
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchImages(query, nextPage);
  };

  const handleRecentSearchClick = (query) => {
    setPage(1);
    searchImages(query);
  };

  return (
    <div className="App">
      <img src={riseupIcon} alt='Rise Up Icon' className='riseup-icon'/>
      <ImageSearch searchImages={searchImages} />
      <div className="recent-searches">
        {recentSearches.map((search, index) => (
          <span
            key={index}
            onClick={() => handleRecentSearchClick(search)}
            className="recent-search-item"
          >
            {search}
          </span>
        ))}
      </div>
      {loading ? (
        <div className="loader">
          <ClipLoader size={150} color={"#007bff"} loading={loading} />
        </div>
      ) : (
        <ImageResults images={images} query={query}/>
      )}
      {images.length > 0 && !loading && (
        <button onClick={loadMoreImages} className="load-more-button">Load More</button>
      )}
    </div>
  );
}

export default App;
