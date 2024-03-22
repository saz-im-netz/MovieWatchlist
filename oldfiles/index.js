const searchInput = document.getElementById('search-input');
const movieListEl = document.querySelector('.found-movies');
let movieDetails = [];

// Search-Btn
document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault();

    document.querySelector('.placeholder').classList.add('hidden');
    
    renderMovies(searchInput.value);
     
    searchInput.value = '';
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

function showMessageEl(messageEl) {
    messageEl.classList.add('show');
    setTimeout( () => { messageEl.classList.remove("show"); }, 1500);
}
