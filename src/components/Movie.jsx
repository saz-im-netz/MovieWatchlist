import React from 'react';

export default function Movie( {movie} ) {
    return (
      <li className="movie">
        <img className="movie-poster" src={movie.Poster} alt={`${movie.Title} poster`} />
        <div className="movie-descr">
          <div className="movie-header">
            <h2>{movie.Title}</h2>
            <img className="star" src="images/star-icon.png" alt="star icon" />
            <h5>{movie.imdbRating}</h5>
          </div>
          <div className="movie-info">
            <h5>{movie.Runtime}</h5>
            <h5>{movie.Genre}</h5>
            <div id={movie.imdbID} className="watchlist-btn">
              <img src="images/plus-icon.png" className="math-icon" alt="plus icon" id={`plus-${movie.imdbID}`} />
              <h5 id={`text-${movie.imdbID}`}>Watchlist</h5>
            </div>
          </div>
          <p>{movie.Plot}</p>
        </div>
        <hr />
      </li>
    );
};
