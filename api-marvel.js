// js normal ***

/* const marvel = {
    render: () => {
      const urlApi =
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=45513d1d1d5375897967bdea82adadcd&hash=ea62b4a50be99d185de6213bfbf38d65";
      const container = document.querySelector("#marvel-row");
      let contentHTML = ''; // Se corrige el nombre de la variable
  
      fetch(urlApi)
        .then((respuesta) => respuesta.json())
        .then((json) => {
          console.log(json, "RESPUESTA.JSON");
          for (const heroe of json.data.results) {
            let urlHeroe = heroe.urls[0].url;
            contentHTML += `
              <div class="col-md-4">
                <a href="${urlHeroe}" target="_blank">
                  <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${heroe.name}</h3>
              </div>
            `;
          }
          container.innerHTML = contentHTML; // Se corrige el nombre de la variable
        });
    },
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    marvel.render();
  }); */

  // ajax */

  const marvel = {
    render: () => {
      const urlApi =
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=45513d1d1d5375897967bdea82adadcd&hash=ea62b4a50be99d185de6213bfbf38d65";
      const container = $("#marvel-row"); 
      let contentHTML = '';
  
      $.ajax({
        url: urlApi,
        method: "GET",
        dataType: "json",
        success: function (json) {
          console.log(json, "RESPUESTA.JSON");
          for (const heroe of json.data.results) {
            let urlHeroe = heroe.urls[0].url;
            contentHTML += `
              <div class="col-md-4">
                <a href="${urlHeroe}" target="_blank">
                  <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${heroe.name}</h3>
              </div>
            `;
          }
          container.html(contentHTML);
        },
        error: function (error) {
          console.error("Error al cargar los datos de Marvel: " + error);
        },
      });
    },
  };
  
  $(document).ready(function () {
    marvel.render();
  });
  