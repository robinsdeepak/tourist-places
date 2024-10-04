const apiUrl = "http://localhost:3001/places";
let places = [];
let currentPlaceId = null;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function fetchPlaces() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      places = data;
      renderPlaceList();
    })
    .catch((error) => console.error("Error fetching places:", error));
}

function renderPlaceList() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container">
      <h1>Tourist Places</h1>
      <ul class="place-list">
        ${places
          .map(
            (place) => `
          <li>
            <span>${place.name}</span>
            <button data-id="${place.id}" class="view-button">View</button>
            <button data-id="${place.id}" class="favorite-button">
              ${favorites.includes(place.id) ? "Unfavorite" : "Favorite"}
            </button>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;
  setupListEventListeners();
}

function renderPlace(placeId) {
  const place = places.find((p) => p.id === placeId);
  console.log({ placeId: placeId, place: place });
  if (!place) return;

  currentPlaceId = placeId;
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="container">
      <h1>${place.name}</h1>
      <img src="${place.image}" alt="${place.name}">
      <p><strong>Best Time to Visit:</strong> ${place.bestTimeToVisit}</p>
      <p><strong>Best Things to Do:</strong> ${place.bestThingsToDo}</p>
      <div class="navigation">
        <button id="back-button" class="button">Back to List</button>
        <button id="favorite-button" class="button">
          ${favorites.includes(place.id) ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  `;
  console.log("Rendering place Done. ", placeId);

  setupDetailEventListeners();
}

function setupListEventListeners() {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.getAttribute("data-id")).toString();
      renderPlace(id);
    });
  });

  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = parseInt(event.target.getAttribute("data-id")).toString();
      toggleFavorite(id);
      renderPlaceList();
    });
  });
}

function setupDetailEventListeners() {
  document.getElementById("back-button").addEventListener("click", () => {
    renderPlaceList();
  });

  document.getElementById("favorite-button").addEventListener("click", () => {
    toggleFavorite(currentPlaceId);
    renderPlace(currentPlaceId);
  });
}

function toggleFavorite(placeId) {
  if (favorites.includes(placeId)) {
    favorites = favorites.filter((id) => id !== placeId);
  } else {
    favorites.push(placeId);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

fetchPlaces();
