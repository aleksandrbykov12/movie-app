// Button's
const addFilmBtnNode = document.querySelector('.movie__form-btn');

// Input's
const movieInputNode = document.querySelector('.movie__form-input');

// Form's
const movieFormNode = document.querySelector('.movie__form');

// HTML list (ul)
const movieListNode = document.querySelector('.movie__list');

// Global Variables
let movies = [];

let movie = '';
let id = 0;

// ================BUTTON'S================

addFilmBtnNode.addEventListener('click', addMovieBtnHandler);

// ================FUNCTION'S================

init()

function init() {
    const moviesStorageString = localStorage.getItem('movies');
    const moviesStorage = JSON.parse(moviesStorageString); 

    if (Array.isArray(moviesStorage)) {
        movies = moviesStorage
    } else {
        return;
    }

    renderMovies(movies)
}

function addMovieBtnHandler(event) {
    event.preventDefault();

    if (!movieInputNode.value) {
        return;
    }

    movie = getMovieName();
    addMovie();

    clearInput(movieInputNode);
    renderMovies(movies);
}

// Сохранение списка фильмов
function saveMovies() {
    const moviesString = JSON.stringify(movies);
    localStorage.setItem('movies', moviesString);
}

// Получаем название фильма из поля ввода
function getMovieName() {
    return movieInputNode.value;
}

// Добавление фильма в массив
function addMovie() {
    const newMovie = { movie: movie, id: Math.random(), checked: false };
    movies.unshift(newMovie);

    saveMovies();

    return movies;
}

// Очистка поля ввода
function clearInput(e) {
    e.value = '';
}

// Отображение списка фильмов
function renderMovies(movies) {
    movieListNode.innerHTML = '';

    movies.forEach (movie => {
        const movieItem = document.createElement('li');
        const movieLabel = document.createElement('label');
        const movieCheckbox = document.createElement('input');
        const movieRemoveBtn = document.createElement('button');
        const movieEditBtn = document.createElement('button');

        movieItem.dataset.id = movie.id;

        movieListNode.appendChild(movieItem);
        movieItem.appendChild(movieCheckbox);
        movieItem.appendChild(movieLabel);
        movieItem.appendChild(movieEditBtn);
        movieItem.appendChild(movieRemoveBtn);

        movieItem.className = 'movie__item';
        movieLabel.className = 'movie__label';
        movieCheckbox.className = 'movie__checkbox';
        movieEditBtn.className = 'movie__edit';
        movieRemoveBtn.className = 'movie__remove';

        movieCheckbox.setAttribute('type', 'checkbox');
        movieCheckbox.setAttribute('id', movie.id);
        movieLabel.setAttribute('for', movie.id);

        movieLabel.innerText = movie.movie;

        checkStateCard(movieItem, movieCheckbox, movie);
        
        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__label')) {
                inactiveCardHandler(movie, movieCheckbox);
            };
        });

        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__remove')) {
                deleteMovieHandler(movie, movieItem);
            };
        });

        movieItem.addEventListener('click', (event) => {
            if (event.target.classList.contains('movie__edit')) {
                editMovieName(movieLabel, movie)
            };
        });

    });
}

function inactiveCardHandler(movie, movieCheckbox) {
    id = movie.id;
    const indexMovie = movies.findIndex(element => element.id === movie.id);
    items = document.querySelector('[data-id="'+id+'"]');

    inactiveElement(id);

    movie.checked = movieCheckbox.checked;

    movingObject(movieCheckbox, indexMovie, movie);
    saveMovies();
    renderMovies(movies);
}

function deleteMovieHandler(movie, movieItem) {
    const id = movie.id;
    index = findElementIsArray(id);
    movieItem.classList.add('remove');
    setTimeout(() => deleteMovie(index), 500);
    setTimeout(() => renderMovies(movies), 500);
}

// Редактирование названия фильма
const editMovieName = (movieLabel, movie) => {
    const newMovieName = prompt(`Введите новое название для ${movie.movie}`, `${movie.movie}`);

    if (newMovieName === '' || newMovieName == null) {
        return;
    };

    movieLabel.innerText = newMovieName;
    movie.movie = newMovieName;
    saveMovies();
}

// "Вычеркивание" карточки
function inactiveElement(id) {
    const movieItem = document.querySelector('[data-id="'+id+'"]');
    const checkboxChecked = document.getElementById(id);

    movieItem.classList.toggle('inactive')
    checkboxChecked.toggleAttribute('checked');
}

// Проверка состояния карточки
function checkStateCard (movieItem, movieCheckbox, movie) {
    if (movie.checked) {
        movieItem.classList.add('inactive');
        movieCheckbox.setAttribute('checked', '');
    } else {
        movieItem.classList.remove('inactive');
        movieCheckbox.setAttribute('unchecked', '');
    };
}

// Перемещение объекта в конец/начало массива по нажатию
function movingObject(movieCheckbox, indexMovie, movie) {
    if (movieCheckbox.checked) {
        movies.splice(indexMovie, 1);
        movies.push(movie);
    } else {
        movies.splice(indexMovie, 1)
        movies.unshift(movie);
    };
}

// Поиск объекта в массиве 
function findElementIsArray(id) {
    const index = movies.findIndex(element => element.id === id);
    return index;
}

// Удаление объекта из массива 
function deleteMovie(index) {
    movies.splice(index, 1);
    saveMovies();
}