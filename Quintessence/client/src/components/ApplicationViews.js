import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Home";
import PlanetList from "./Planets/PlanetList";
import Login from "./Login";
import Register from "./Register";
import { AddPlanetForm } from "./Planets/AddPlanet";
import { PlanetEditForm } from "./Planets/PlanetEditForm";
import { PlanetDelete } from "./Planets/PlanetDelete";
import FavoritePlanetList from "./FavoritePlanets/FavoritePlanetList";
import MoonList from "./Moons/MoonList";
import { AddMoonForm } from "./Moons/AddMoon";
import { MoonEditForm } from "./Moons/MoonEditForm";
import { MoonDelete } from "./Moons/MoonDelete";
import { AddFavoritePlanetForm } from "./FavoritePlanets/AddFavoritePlanet";
import { DeleteFavoritePlanet } from "./FavoritePlanets/FavoritePlanetDelete";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <Routes>
            <Route path="/">
                <Route
                    index
                    element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="home" element={<Hello />} />
                <Route path="planets" element={isLoggedIn ? <PlanetList /> : <Navigate to="/login" />} />
                <Route path="moons" element={isLoggedIn ? <MoonList /> : <Navigate to="/login" />} />
                <Route path="planets/planets/add" element={<AddPlanetForm />} />
                <Route path="planets/favoriteplanets/add" element={<AddFavoritePlanetForm />} />
                <Route path="moons/moons/add" element={<AddMoonForm />} />
                <Route path="planet/edit/:planetId" element={<PlanetEditForm />} />
                <Route path="moon/edit/:moonId" element={<MoonEditForm />} />
                <Route path="planet/delete/:planetId" element={< PlanetDelete />} />
                <Route path="favoritePlanet/delete/:favoritePlanetId" element={< DeleteFavoritePlanet />} />
                <Route path="moon/delete/:moonId" element={< MoonDelete />} />
                <Route path="favoritePlanets" element={isLoggedIn ? <FavoritePlanetList /> : <Navigate to="/login" />} />

            </Route>
        </Routes>
    );
}
