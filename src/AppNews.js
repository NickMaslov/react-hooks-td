import React, { useState, useEffect, useRef } from 'react';
import './AppNews.css'
import axios from 'axios';

export default function AppNews() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits);
    setError(null)
    } catch (err) {
        setError(err)
    }
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };
  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
        <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12"/>
        <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">Submit</button>
        <button type="button" onClick={handleClearSearch} className="bg-teal text-white rounded p-1"> 
          Clear
        </button>
      </form>
      {loading ? (
        <div className="text-orange-dark font-bold">Loading Results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url}
              className="text-indigo-dark hover:text-indigo-darkest"
              >{result.title}</a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div> }
    </div>
  );
}
