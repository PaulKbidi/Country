const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const resultCountValue = document.getElementById("resultCountValue");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");
const sortAlpha = document.getElementById("sortAlpha");
const applySearchButton = document.getElementById("applySearch");
const countryList = document.getElementById("countryList");
const api = "https://restcountries.com/v3.1/all";

let countries = [];

//fonctions de recherches
resultCount.addEventListener("input", () => {
  resultCountValue.textContent = resultCount.value;
  displayCountries();
});

applySearchButton.addEventListener("click", () => {
  displayCountries();
});

sortAsc.addEventListener("click", () => {
  sortCountries("ascending");
  displayCountries();
});

sortDesc.addEventListener("click", () => {
  sortCountries("descending");
  displayCountries();
});

sortAlpha.addEventListener("click", () => {
  sortCountries("alphabetical");
  displayCountries();
});

//fonction api pour récupérer et stocker les valeurs
fetchCountries();

function fetchCountries() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      console.log(countries[0]); //pour avoir les valeurs d'un seul pays
      console.log(countries.length); //pour savoir le nombre total de pays récupérés
      //img du drapeau (format svg) => !! flags.svg !!
      //nom du pays en français (regarder dans translations ... ) => !! translations.fra.cummon !!
      //capitale => !! capital !!
      //la population !! population !!
      displayCountries();
    });
}

//fonction de trie des pays
function sortCountries(order) {
  if (order === "ascending") {
    countries.sort((a, b) => a.population - b.population);
  } else if (order === "descending") {
    countries.sort((a, b) => b.population - a.population);
  } else if (order === "alphabetical") {
    countries.sort((a, b) =>
      a.translations.fra.common.localeCompare(b.translations.fra.common)
    );
  }
}


//fonction d'affichage des pays dans des cartes
function displayCountries() {
  const filteredCountries = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    )
    .slice(0, resultCount.value);

  countryList.innerHTML = "";

  filteredCountries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    const flag = document.createElement("img");
    flag.src = country.flags.svg;
    card.appendChild(flag);

    const name = document.createElement("h2");
    name.textContent = country.translations.fra.common;
    card.appendChild(name);

    const continent = document.createElement("p");
    continent.textContent = `Continent: ${country.continents || "Non renseigner"}`; //certain pays n'ont pas de capital renseigner
    card.appendChild(continent);

    const capital = document.createElement("p");
    capital.textContent = `Capital: ${country.capital || "Non renseigner"}`; //certain pays n'ont pas de capital renseigner
    card.appendChild(capital);

    const population = document.createElement("p");
    population.textContent = `Population: ${
      country.population || "Non renseigner" //certain pays n'ont pas de nombre d'habitant renseigner
    }`;
    card.appendChild(population);

    countryList.appendChild(card);
  });
}