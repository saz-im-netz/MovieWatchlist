import React from 'react';

import Movie from '/Movie';

export default function MovieList({ movies }) {
    return (
      <ul>
        {movies.map(movie => (
          <Movie key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    );
};
  