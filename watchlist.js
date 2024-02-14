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
                    <h2 class="movie-title">${Title}</h2>
                    <div class="movie-rating">
                        <img class="star" src="images/star-icon.png">
                        <h5>${imdbRating}</h5>
                    </div>
                </div>
        
                <div class="movie-info">
                    <h5>${Runtime}</h5>
                    <h5>${Genre}</h5>
                    <div id="${imdbID}" class="watchlist-btn">
                        <img src="images/plus-icon.png" class="math-icon" id="plus-${imdbID}">
                        <h5 class="add-btn" id="text-${imdbID}">Watchlist</h5>
                    </div>
                </div>
                
            </div>
            <p class="movie-plot">${Plot}</p>
            
        </li>
        
        <hr>
    `
    });

    return movieListHtml;
}