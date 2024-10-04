import React, { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useContext(FavoritesContext);
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  useEffect(() => {
    Promise.all(
      favorites.map((id) =>
        fetch(`http://localhost:3001/places/${id}`).then((response) =>
          response.json()
        )
      )
    )
      .then((data) => setFavoritePlaces(data))
      .catch((error) =>
        console.error("Error fetching favorite places:", error)
      );
  }, [favorites]);

  return (
    <div className="favorites">
      <h1>Your Favorites</h1>
      {favoritePlaces.length > 0 ? (
        favoritePlaces.map((place) => (
          <div key={place.id} className="place-item">
            <h2>{place.name}</h2>
            <Link to={`/place/${place.id}`} className="button">
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p>No favorite places yet.</p>
      )}
    </div>
  );
}

export default Favorites;
