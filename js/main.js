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
const IDs = [];

let movie = '';


let id = 0;

const idStorage = localStorage.getItem('id')
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

    // const idStorage = localStorage.getItem('newID')

    renderMovies(movies)
    inactiveElement(idStorage)
}

function addMovieBtnHandler(event) {
    event.preventDefault();

    if (!movieInputNode.value) {
        return;
    }

    movie = getMovieName();
    addMovie();

    console.log(movies);

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
    const newMovie = { movie: movie, id: Math.random() };
    movies.push(newMovie);

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
        const movieInactive = document.createElement('button');
        const movieName = document.createElement('p');
        const movieRemoveBtn = document.createElement('button');

        movieItem.dataset.id = movie.id;

        movieListNode.appendChild(movieItem);
        movieItem.appendChild(movieCheckbox);
        movieItem.appendChild(movieLabel);
        movieLabel.appendChild(movieName);
        movieItem.appendChild(movieRemoveBtn);

        movieItem.className = 'movie__item';
        movieLabel.className = 'movie__label';
        movieCheckbox.className = 'movie__checkbox';
        movieInactive.className = 'movie__inactive';
        movieName.className = 'movie__text';
        movieRemoveBtn.className = 'movie__remove';

        movieCheckbox.setAttribute('type', 'checkbox');
        movieCheckbox.setAttribute('id', movie.id);
        movieLabel.setAttribute('for', movie.id)

        movieName.innerText = movie.movie;

        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__item')) {
                id = movie.id;
                items = document.querySelector('[data-id="'+id+'"]');

                inactiveElement(id);
                movieListNode.append(items);
            };
        });

        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__remove')) {
                const id = movie.id;
                console.log(id);
                index = findElementIsArray(id);
                movieItem.classList.add('remove');
                setTimeout(() => deleteMovie(index), 500);
                setTimeout(() => renderMovies(movies), 500);
            };
        });
    });

    // inactiveElement(idStorage)
}

// Сохранение ID в массив
function saveIdInArray(id) {
    IDs.push(id);
    return IDs;
}

// Поиск индекса по ИД
// function findIndexID(id) {
//     const indexID = IDs.findIndex(element => element === id);
//     console.log(indexID);
//     return indexID;
// } 

// "Вычеркивание" карточки
function inactiveElement(id) {
    // const newID = id

    const movieItem = document.querySelector('[data-id="'+id+'"]')
    const checkboxChecked = document.getElementById(id);
    console.log(checkboxChecked)
    console.log(movieItem)

    movieItem.classList.toggle('inactive')
    checkboxChecked.toggleAttribute('checked');

    

    localStorage.setItem('id', id)
}

// Поиск объекта в массиве 
function findElementIsArray(id) {
    const index = movies.findIndex(element => element.id === id);
    console.log(index)
    return index;
}

// Удаление объекта из массива 
function deleteMovie(index) {
    movies.splice(index, 1);
    saveMovies();
}