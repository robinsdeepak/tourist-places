import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/places")
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  return (
    <div className="place-list">
      {places.map((place) => (
        <div key={place.id} className="place-item">
          <h2>{place.name}</h2>
          <Link to={`/place/${place.id}`} className="button">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PlaceList;
