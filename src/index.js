import { doc } from "firebase/firestore";
import { createMoviesModel } from "./model";
import { createView } from "./view";
import { createFirebase } from "./firebase";
import { MOVIES_FIREBASE_KEY } from "./constant";

const btnAddMovie = document.querySelector(".js-btn-add-movie");
const inputNode = document.querySelector(".js-input-movie");
const listMovies = document.querySelector(".listMovies");

const initialMovies = [];
const model = createMoviesModel();
const view = createView(".listMovies");
const firebase = createFirebase(MOVIES_FIREBASE_KEY);

firebase.pull().then((movies) => {
  model.update(movies);
  view.render(model.get());
});

btnAddMovie.addEventListener("click", function () {
  const movieTitle = inputNode.value.trim();

  if (movieTitle !== "") {
    const movie = model.create({
      title: movieTitle,
    });
    view.addMovie(movie);
    firebase.push(movie);
    inputNode.value = "";
  } else {
    alert("Введите название фильма");
  }
});

listMovies.addEventListener("click", checkMovie);

function checkMovie(event) {
  // Проверяем, что событие произошло на чекбоксе
  if (event.target.classList.contains("input-checkbox")) {
    // Находим родительский элемент <div class="movie">
    const grandParentNode = event.target.parentNode.parentNode;

    // Переключаем класс у родительского элемента
    grandParentNode.classList.toggle("movie_hidden");

    // Переключаем класс у текущего чекбокса
    event.target.classList.toggle("input-checkbox_checked");

    // Находим соответствующий тег <label>
    const labelElement = event.target.nextElementSibling;

    console.log('-----', labelElement);

    // Переключаем класс у тега <label>
    if (labelElement) {
      labelElement.classList.toggle("label_checked");
    }
  }
}


listMovies.addEventListener("click", deleteMovie);

async function deleteMovie(event) {
  if (event.target.className === "delete") {
    const parentNode = event.target.parentNode;
    const movieId = parentNode.querySelector(".input-checkbox").id;
    console.log("ID элемента:", movieId);
    // найдет родительский элемент "movie",
    // затем найдет внутри него элемент с классом "input-checkbox" и получит его ID,
    // Теперь у вас есть ID элемента, который можно использовать для удаления или редактирования

    try {
      await firebase.delete(movieId);

      location.reload();
    } catch (error) {
      console.error("Ошибка при удалении документа: ", error);
    }
  }
}
