import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import PlaceList from "./components/PlaceList";
import PlaceDetail from "./components/PlaceDetail";
import Favorites from "./components/Favorites";
import "./styles.css";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PlaceList />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
