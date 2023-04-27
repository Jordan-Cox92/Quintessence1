import { getToken } from "./authManager";

const _apiUrl = "/api/favoritePlanet";

export const getAllFavoritePlanets = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get planets"
                );
            }
        });
    });
};

export const postNewFavoritePlanet = (newFavoritePlanet) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFavoritePlanet),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("This planet already exists in favorites");
            }
        });
    });
};

export const getFavoritePlanetById = (favoritePlanetId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/favoritePlanet/${favoritePlanetId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get planets"
                );
            }
        });
    });
};

export const deleteFavoritePlanet = (favoritePlanetId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/favoritePlanet/delete/${favoritePlanetId}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to delete planet"
                );
            }
        });
    });
};