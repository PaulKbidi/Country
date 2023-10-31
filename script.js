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
    });
}