export function createView(selector) {
  const node = document.querySelector(selector);

  return {
    node,
    render: function (movies) {
      movies.forEach((movie) => {
        this.addMovie(movie);
      });
    },

    addMovie: function (movie) {
      const imgClose = document.createElement("img");
      imgClose.className = "delete";
      imgClose.src = "/Vector.de413ce1.svg";
      imgClose.alt = "Картинка";
     

      const div = document.createElement("div");
      div.className = "movie";

      const inputLabelWrapper = document.createElement("div");

      const input = document.createElement("div");
      input.className = "input-checkbox";
    //   input.setAttribute("type", "checkbox");
      input.setAttribute("id", movie.id);

      const lable = document.createElement("lable");
      lable.className = "lable";
      lable.innerText = movie.title;
      lable.setAttribute("for", movie.id);

      inputLabelWrapper.append(input);
      inputLabelWrapper.append(lable);

      // Создаем svg элемент
      //   const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      // Создаем path элемент
      //   const path = document.createElementNS(
      //     "http://www.w3.org/2000/svg",
      //     "path"
      //   );
      //   path.setAttribute(
      //     "d",
      //     "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      //   );

      // Добавляем path в svg
      //   svg.appendChild(path);

      // Устанавливаем атрибуты svg
      //   svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      //   svg.setAttribute("height", "44");
      //   svg.setAttribute("viewBox", "0 -960 960 960");
      //   svg.setAttribute("width", "44");

      // Создаем div-обертку для svg
      //   const wrapperSvg = document.createElement("div");
      //   wrapperSvg.className = "delete";
      //   wrapperSvg.append(svg);

      div.append(inputLabelWrapper);
      div.append(imgClose);
      node.append(div);
    },
  };
}
