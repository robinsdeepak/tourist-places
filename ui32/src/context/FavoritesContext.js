import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (placeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(placeId)
        ? prevFavorites.filter((id) => id !== placeId)
        : [...prevFavorites, placeId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
