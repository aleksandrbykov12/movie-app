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
    test(idStorage)
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
        const movieInactive = document.createElement('button');
        const movieName = document.createElement('p');
        const movieRemoveBtn = document.createElement('button');

        // const checkItemsClass = localStorage.getItem('checkItemsClass');
        // const idElement = document.querySelector('[data-id="'+idStorage+'"]');
        // console.log(idElement)
        // console.log(idStorage)

        // if (checkItemsClass) {
        //     idElement.classList.remove('inactive');
        // } else {
        //     test(idStorage);
        // }

        movieItem.dataset.id = movie.id;

        movieListNode.appendChild(movieItem);
        // movieItem.appendChild(movieInactive);
        movieItem.appendChild(movieName);
        movieItem.appendChild(movieRemoveBtn);

        movieItem.className = 'movie__item';
        movieInactive.className = 'movie__inactive';
        movieName.className = 'movie__text';
        movieRemoveBtn.className = 'movie__remove';

        movieName.innerText = movie.movie;

        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__item')) {
                id = movie.id;
                console.log(id);
                console.log(idStorage)
                items = document.querySelector('[data-id="'+id+'"]');
                // console.log(items);
                // items.classList.toggle('inactive');
                const checkItemsClass = items.classList.contains('inactive');
                localStorage.setItem('checkItemsClass', checkItemsClass);
                test(id);
                movieListNode.append(items);
                
                // if (checkItemsClass) {
                //     items.classList.remove('inactive');
                // } else {
                //     test(id);
                // }
            };
        });

        movieItem.addEventListener('click', function (event) {
            if (event.target.classList.contains('movie__remove')) {
                const id = movie.id;
                console.log(id);
                index = findElementIsArray(id);
                // deleteMovie(index);
                movieItem.classList.add('remove');
                setTimeout(() => deleteMovie(index), 500);
                setTimeout(() => renderMovies(movies), 500);
                // renderMovies(movies);
            };
        });
    });

    test(idStorage)
}

// "Вычеркивание" карточки
function test(id) {
    // const newID = id
    // console.log(newID)
    const testID = document.querySelector('[data-id="'+id+'"]')
    console.log(testID)
    // testID.classList.add('inactive')
    testID.classList.toggle('inactive')

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