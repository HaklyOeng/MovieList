const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzAyY2NiZDYyMjZmYjYzN2IzMGRlN2JjMGIzY2I0ZiIsInN1YiI6IjY1MmVlMTk5YTgwMjM2MDBjMzE1ZWM3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b_n-lsm96wjN84W2o6Oy1c7JJmPHBxwPL_1nMciaQOE";


async function getMovies() {    // await is use with async function
    try {

        let response = await fetch('https://api.themoviedb.org/3/movie/popular', { // fetch = java collect data from over the web
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json(); // tranform data into json file
        return data;

    } catch (error) {  // to check if there any problem with try
        console.error(error);
    }
}
async function getMovie(movieId) {

    try {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieI}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        let data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

async function displayMovies() {

    let data = await getMovies();

    const movieListDiv = document.getElementById('movie-list');
    const moviePosterTemplate = document.getElementById('movie-card-template');

    let movies = data.results; // name a var that equal to array for easy access to data

    for (i = 0; i < movies.length; i++) {

        let movie = movies[i];

        let movieCard = moviePosterTemplate.content.cloneNode(true); // clone a template

        let movieImgElement = movieCard.querySelector('.card-img-top'); // access a specifice elements in template
        movieImgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // replace value with the retrive value

        let movieTitleElement = movieCard.querySelector('.card-body > h5');
        movieTitleElement.textContent = movie.title;

        let movieParagraphElement = movieCard.querySelector('.card-text');
        movieParagraphElement.textContent = movie.overview;

        let movieButton = movieCard.querySelector('.btn-primary');
        movieButton.setAttribute('data-movieId', movie.id);



        movieListDiv.appendChild(movieCard); // add element to cloned template
    }

}


async function showMovieDetails(clickedBtn) {

    // get the id of the movie that was click
    let movieId = clickedBtn.getAttribute('data-movieId');
    // get the details of the movie with that ID from TMDB API
    let movie = await getMovie(movieId);

    let modalTitle = document.querySelector('.modal-header > h1');
    modalTitle.textContent = movie.title;

    let modalImg = document.querySelector('.img')
    modalImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    let genresResults = '';    
    for (i = 0;i < movie.genres.length;i++) {
        let result = movie.genres[i].name;       
        genresResults += `${result}; `;      
    }
    let companys = '';
    for (c = 0; c < movie.production_companies.length; c++) {
        let comName = movie.production_companies[c].name;
        companys += `${comName}; `;
    }
    let languages = '';
    for (l = 0; l < movie.spoken_languages.length; l++) {
        let langName = movie.spoken_languages[l].name;
        languages += `${langName}; `;
    }

    let genres = document.querySelector('.col-7 > p')
    genres.textContent = genresResults;
    let tagline = document.querySelector('#tagline')
    tagline.textContent = movie.tagline;
    let releaseDate = document.querySelector('.col-5 > h6')
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    let overview = document.querySelector('#overview')
    overview.textContent = movie.overview;

    let companyName = document.querySelector('#companyName');
    companyName.textContent = companys;
    let language = document.querySelector('#language');
    language.textContent = languages;




    // put those details into my modal
}