let savedMovies = [];
getMoviesFromLocalStorage();
renderSavedMovies();

// delete Movie from localStorage
document.addEventListener('click', e => {
    
    savedMovies.forEach( item => {
        if( e.target.id === item.imdbID || 
            e.target.id === "text-"+item.imdbID || 
            e.target.id === "minus-"+item.imdbID){
                deleteMovieFromLocalStorage(item.imdbID); 

                getMoviesFromLocalStorage();
                renderSavedMovies();
                
        }
    })
    
})


function deleteMovieFromLocalStorage(movieId){
    localStorage.removeItem(movieId);
    savedMovies = getMoviesFromLocalStorage;
}

function getMoviesFromLocalStorage(){
    savedMovies = [];
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        savedMovies.push(JSON.parse(localStorage.getItem(key)));
    }
}

function renderSavedMovies(){
    document.querySelector('.saved-movies').innerHTML = '';
    let savedMoviesHtml = getSavedMovieHtml(savedMovies);
    document.querySelector('.saved-movies').innerHTML = savedMoviesHtml;
    
    if(savedMovies.length > 0){
        document.querySelector('.empty-list').classList.add('hidden');
    }
    else{
        document.querySelector('.empty-list').classList.remove('hidden');
    }
}

function getSavedMovieHtml(arrayOfMovies){
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
                        <img src="images/minus-icon.png" class="math-icon" id="minus-${imdbID}">
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