const apiUrl = "http://localhost:3001/places";
let currentPlaceId = 1;
const maxPlaceId = 10;

function fetchPlace(placeId) {
  fetch(`${apiUrl}/${placeId}`)
    .then((response) => response.json())
    .then((place) => {
      displayPlace(place);
    })
    .catch((error) => {
      console.error("Error fetching place data:", error);
    });
}

function displayPlace(place) {
  const container = document.getElementById("place-container");
  container.innerHTML = `
    <h1>${place.name}</h1>
    <img src="${place.image}" alt="${place.name}">
    <p><strong>Best Time to Visit:</strong> ${place.bestTimeToVisit}</p>
    <p><strong>Best Things to Do:</strong> ${place.bestThingsToDo}</p>
    <div class="navigation">
      ${
        currentPlaceId > 1
          ? `<button id="back-button" class="button">Back</button>`
          : ""
      }
      ${
        currentPlaceId < maxPlaceId
          ? `<button id="next-button" class="button">Next</button>`
          : ""
      }
    </div>
  `;

  if (currentPlaceId > 1) {
    document.getElementById("back-button").addEventListener("click", () => {
      currentPlaceId--;
      fetchPlace(currentPlaceId);
    });
  }

  if (currentPlaceId < maxPlaceId) {
    document.getElementById("next-button").addEventListener("click", () => {
      currentPlaceId++;
      fetchPlace(currentPlaceId);
    });
  }
}

fetchPlace(currentPlaceId);
