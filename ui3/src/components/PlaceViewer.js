import React, { useState, useEffect } from "react";

const apiUrl = "http://localhost:3001/places";
const maxPlaceId = 10;

function PlaceViewer() {
  const [place, setPlace] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(1);

  useEffect(() => {
    fetch(`${apiUrl}/${currentPlaceId}`)
      .then((response) => response.json())
      .then((data) => setPlace(data))
      .catch((error) => console.error("Error fetching place data:", error));
  }, [currentPlaceId]);

  const handleNext = () => {
    if (currentPlaceId < maxPlaceId) {
      setCurrentPlaceId(currentPlaceId + 1);
    }
  };

  const handleBack = () => {
    if (currentPlaceId > 1) {
      setCurrentPlaceId(currentPlaceId - 1);
    }
  };

  if (!place) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} />
      <p>
        <strong>Best Time to Visit:</strong> {place.bestTimeToVisit}
      </p>
      <p>
        <strong>Best Things to Do:</strong> {place.bestThingsToDo}
      </p>
      <div className="navigation">
        {currentPlaceId > 1 && (
          <button onClick={handleBack} className="button">
            Back
          </button>
        )}
        {currentPlaceId < maxPlaceId && (
          <button onClick={handleNext} className="button">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default PlaceViewer;
