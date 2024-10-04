import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetch(`http://localhost:3001/places/${id}`)
      .then((response) => response.json())
      .then((data) => setPlace(data))
      .catch((error) => console.error("Error fetching place:", error));
  }, [id]);

  if (!place) {
    return <p>Loading...</p>;
  }

  const isFavorite = favorites.includes(place.id);

  return (
    <div className="place-detail">
      <h1>{place.name}</h1>
      <img src={place.image} alt={place.name} />
      <p>
        <strong>Best Time to Visit:</strong> {place.bestTimeToVisit}
      </p>
      <p>
        <strong>Best Things to Do:</strong> {place.bestThingsToDo}
      </p>
      <button onClick={() => navigate(-1)} className="button">
        Back
      </button>
      <button onClick={() => toggleFavorite(place.id)} className="button">
        {isFavorite ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
}

export default PlaceDetail;
