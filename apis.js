document.addEventListener("DOMContentLoaded", function() {
    const apiEndpoint = "https://pokeapi.co/api/v2/pokemon";
    const resultsPerPage = 10; //numero de registros por pagina
    let currentPage = 1; // pagino

    // Función para cargar datos en la tabla
    function loadTable(page) {
        fetch(`${apiEndpoint}?offset=${(page - 1) * resultsPerPage}&limit=${resultsPerPage}`)
            .then((r) => {
                if (!r.ok) {
                    throw new Error('La respuesta no es OK');
                }
                return r.json();
            })
            .then((data) => {
                const pokemonArray = data.results;
                const pokemonTableBody = document.querySelector("#pokemon-table tbody");
                pokemonTableBody.innerHTML = "";
// ciclo para agregar datos
                pokemonArray.forEach((pokemon, index) => { 
                    // crear los elementos en el html
                    const row = document.createElement("tr");
                    const numberCell = document.createElement("td");
                    const nameCell = document.createElement("td");
// asignar datos a la tabla
                    numberCell.textContent = (page - 1) * resultsPerPage + index + 1; //calcular contenido de la tabla y numero de indice
                    numberCell.style.border = '1px solid #black'; // agregar estilos no funko
                    nameCell.textContent = pokemon.name; // agrega nombres de los pokemones a la tabla
// append chiel agrega elementos a un elemento ya existe en el DOM
                    row.appendChild(numberCell);
                    row.appendChild(nameCell);
                    pokemonTableBody.appendChild(row);
                });
                document.querySelector("#current-page").textContent = page;
            })
            .catch((error) => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }

// Evento para ir a la página anterior
    document.querySelector("#prev").addEventListener("click", function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            loadTable(currentPage);
        }
    });

// Evento para ir a la página siguiente
    document.querySelector("#next").addEventListener("click", function(e) {
        e.preventDefault();
        currentPage++;
        loadTable(currentPage);
    });

// Cargar la primera página al cargar la página
    loadTable(currentPage);

    
        // Obtén referencias a los elementos
        const loadButton = document.getElementById('load-button');
        const nombrePokemonInput = document.getElementById('nombre-pokemon-input');
        const pokemonTable2 = document.getElementById('pokemon-table-2');
    
        // Define la función loadPokemon
        function loadPokemon(nombrePokemon) {
            const apiEndpoint = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.toLowerCase()}`;
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
    
            fetch(apiEndpoint, requestOptions)
                .then(response => response.json())
                .then(data => {
                    // Muestra el nombre del Pokémon en la tabla
                    const row = document.createElement('tr');
                    const dataCell = document.createElement('td');
                   
                    dataCell.textContent = data.name;
                    row.appendChild(dataCell);
                    pokemonTable2.innerHTML = ''; // Limpia la tabla antes de agregar nuevos datos
                    pokemonTable2.appendChild(row);

                    const abilities = data.abilities;
                    const pokemonTableHabilidad = document.getElementById('pokemon-table-habilidad');
                    pokemonTableHabilidad.innerHTML = '';
                        abilities.forEach((habilidad, index) => { 
                            const apiEndpoint = habilidad.ability.url;
                            const row2 = document.createElement('tr')
                            const abilityCell = document.createElement('td')

                            abilityCell.textContent = habilidad.ability.name;
                            row2.appendChild(abilityCell);
                            pokemonTableHabilidad.appendChild(row2);

                            var requestOptions = {
                                method: 'GET',
                                redirect: 'follow'
                            };console.log(apiEndpoint);
                            fetch(apiEndpoint, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            }).catch(error => console.error('Hubo un error al cargar las habilidades:', error));
                        });
                })
                .catch(error => console.error('Hubo un error al cargar el Pokémon:', error));
        }
    
        // Agrega un evento de clic al botón
        loadButton.addEventListener('click', function () {
            const nombrePokemon = nombrePokemonInput.value.trim(); // Obtiene el valor del campo de entrada y lo limpia
            if (nombrePokemon !== '') {
                loadPokemon(nombrePokemon);
            }
        });
});

