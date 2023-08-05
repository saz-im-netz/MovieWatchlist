const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// searchForm.addEventListener('submit', );

function getMovies(){
    fetch(`http://www.omdbapi.com/?&apikey=659c6422&t=avatar`)
        .then(res=>res.json())
        .then(data=>console.log(data))
}

getMovies()


/* `<li class="movie">
                    
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
            <div class="watchlist-btn">
                <img src="images/plus-icon.png" class="math-icon">
                <h5>Watchlist</h5>
            </div>
        </div>

        <p>Plot</p>

    </div>
    

</li>

<hr>` */