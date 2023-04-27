import { getToken } from "./authManager";

const _apiUrl = "/api/moon";

export const getAllMoons = () => {
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

export const postNewMoon = (newMoon) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMoon),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("This moon already exists");
            }
        });
    });
};

export const getMoonById = (moonId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/moon/${moonId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get moons"
                );
            }
        });
    });
};

export const DeleteMoon = (moonId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/moon/delete/${moonId}`, {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to delete moon"
                );
            }
        });
    });
};

export const EditMoon = (moon) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/moon/edit/${moon.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moon),
        }).then((resp) => {
            if (!resp.ok) {
                throw new Error(
                    "An unknown error occurred while trying to edit moon"
                );
            }
        });
    });
};