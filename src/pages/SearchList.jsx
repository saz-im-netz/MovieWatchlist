import React from 'react'
import '../index.css'

import Movie from '../components/Movie'

import searchIcon from '../../assets/images/Search.png'
import movieIcon from '../../assets/images/movie-icon.png'

export default function SearchList() {

    const [movieDetails, setMovieDetails] = React.useState([]);
    const [notFound, setNotFound] = React.useState(false);
    const [searchKey, setSearchKey] = React.useState('');

    const renderMovies = async (searchKey) => {
        setNotFound(false);
        try{
            // get Movie Ids => array
            const response = await fetch(`https://www.omdbapi.com/?&apikey=659c6422&s=${searchKey}`);
            const data = await response.json();
            if (!data.Search) throw new Error('Movies not found');

            const movieIds = data.Search.map( movie => movie.imdbID);
            const movieDetailsPromises = movieIds.map(async id => {
                const response = await fetch(`https://www.omdbapi.com/?&apikey=659c6422&i=${id}`);
                return response.json();
            });

            // get Movie Details => array of objects
            const movies = await Promise.all(movieDetailsPromises);
            setMovieDetails(movies);
        }
        catch(error){
            console.error(error);
            setNotFound(true);
            setMovieDetails([]);
        }
    }
    React.useEffect( () => {
        renderMovies(searchKey);
    }, [searchKey]);


    
    // store Movie to localStorage
    document.addEventListener('click', e => {
        
        movieDetails.forEach( item => {
            if( e.target.id === item.imdbID || 
                e.target.id === "text-"+item.imdbID || 
                e.target.id === "plus-"+item.imdbID){
                    saveMovieToLocalStorage(item.imdbID, movieDetails);     
            }
        });
        
    });

    function saveMovieToLocalStorage(movieId, movies){
        const savedMovie = movies.filter( movie => movie.imdbID === movieId)[0];

        if(localStorage.getItem(savedMovie.imdbID) === null){
            localStorage.setItem(savedMovie.imdbID, JSON.stringify(savedMovie));
            showMessageEl(document.getElementById('new-movie')); 
        }
        else{
            showMessageEl(document.getElementById('double'));
        }
        

    }


    // Search-Btn
    function handleSubmit(e){
        e.preventDeafault()

        setSearchKey(searchInput.value)
     
        searchInput.value = ''
    }

    function showMessageEl(messageEl) {
        messageEl.classList.add('show')
        setTimeout( () => { messageEl.classList.remove("show"); }, 1500)
    }

    return (
        <div className="container">
            <header>
                <div className="bg"></div>
                <h1>Find your film</h1>
                <h3><a href="watchlist.html">My Watchlist</a></h3>

                <form id="search-form" onSubmit={handleSubmit}>
                    <img src={searchIcon} alt="Image of a magnifying glass as search icon"/>
                    <input  type="search"
                            id="search-input"
                            placeholder="Search for movie title..."
                            aria-label="Search site for movies"/>
                    <input type="submit" value="Search"/>
                </form>
            </header>

            <main>
                <div className="placeholder">
                    <img src={movieIcon} alt="Image of a film roll"/>
                    <h4>Start exploring</h4>
                </div>

                {notFound ? (
                    <div className="not-found hidden">
                        <h4>Unable to find what your're looking for. Please try antother search.</h4>
                    </div>
                ) : (
                    <ul className="found-movies">
                        <MovieList movies={movieDetails} />
                    </ul>
                )}
                
                <div id="new-movie" className="message">
                    <p>Movie added to Watchlist.</p>
                </div>

                <div id="double" className="message">
                    <p>Movie already in Watchlist.</p>
                </div>
                
            </main>

        </div>
    )
}
