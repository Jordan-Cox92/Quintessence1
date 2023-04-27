import { getToken } from "./authManager";

const _apiUrl = "/api/planet";

export const getAllPlanets = () => {
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

export const postNewPlanet = (newPlanet) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlanet),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("This planet already exists");
            }
        });
    });
};

export const getPlanetById = (planetId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/planet/${planetId}`, {
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

export const DeletePlanet = (planetId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/planet/delete/${planetId}`, {
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

export const EditPlanet = (planet) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/planet/edit/${planet.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planet),
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to edit planet"
                );
            }
        });
    });
};