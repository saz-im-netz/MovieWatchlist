import React from 'react'
import '../index.css'

import searchIcon from '../assets/images/Search.png'
import movieIcon from '../assets/images/movie-icon.png'

export default function SearchList() {

    function handleSubmit(e){
        e.preventDeafault()

        document.querySelector('.placeholder').classList.add('hidden')
        renderMovies(searchInput.value)
     
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

                <div className="not-found hidden">
                    <h4>Unable to find what your're looking for. Please try antother search.</h4>
                </div>
                    
                <ul className="found-movies">
                   {/* movies go here */}
                </ul>
                
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


const searchInput = document.getElementById('search-input');
const movieListEl = document.querySelector('.found-movies');
let movieDetails = [];

// Search-Btn
document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();

    
});

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

async function renderMovies(searchKey){
    document.querySelector('.not-found').classList.add('hidden');

    // if(searchInput.value === ''){
    //     document.querySelector('.not-found').classList.remove('hidden');
    // }
    // else{
    try{
        // get Movie Ids => array
        const movieIds = [];
        const response = await fetch(`https://www.omdbapi.com/?&apikey=659c6422&s=${searchKey}`);
        const data = await response.json();

        data.Search.forEach( movie => {
            movieIds.push(movie.imdbID);
        });
        
        // get Movie Details => array of objects
        movieDetails = [];
        movieIds.forEach( async movie => {
            const response = await fetch(`https://www.omdbapi.com/?&apikey=659c6422&i=${movie}`);
            const data = await response.json();
            
            movieDetails.push(data);

            let movieListHtml = getMovieHtml(movieDetails);
            
            movieListEl.innerHTML = movieListHtml;
        });
    }
    catch(error){
        console.error(error);
        document.querySelector('.not-found').classList.remove('hidden');
        movieListEl.innerHTML = '';
    }
        
    

}

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
    

function getMovieHtml(arrayOfMovies){
    let movieListHtml = '';
    arrayOfMovies.forEach( item => {
    const {Title, imdbRating, Runtime, Genre, Poster, Plot, imdbID} = item;

    movieListHtml += `
        <li class="movie">
                
            <img class="movie-poster" src="${Poster}">
            <div class="movie-descr">
                
                <div class="movie-header">
                    <h2>${Title}</h2>
                    <img class="star" src="images/star-icon.png">
                    <h5>${imdbRating}</h5>
                </div>
        
                <div class="movie-info">
                    <h5>${Runtime}</h5>
                    <h5>${Genre}</h5>
                    <div id="${imdbID}" class="watchlist-btn">
                        <img src="images/plus-icon.png" class="math-icon" id="plus-${imdbID}">
                        <h5 id="text-${imdbID}">Watchlist</h5>
                    </div>
                </div>
        
                <p>${Plot}</p>
        
            </div>
        
        </li>
        
        <hr>
    `
    });

    return movieListHtml;
}

