import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    DeletePlanet,
    getPlanetById,
} from "../../modules/planetManager";

import { deleteFavoritePlanet, getFavoritePlanetById } from "../../modules/favoritePlanetManager";

export const DeleteFavoritePlanet = () => {
    const { favoritePlanetId } = useParams();
    const [planet, setPlanet] = useState({});
    const [favoritePlanet, setFavoritePlanet] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getFavoritePlanetById(favoritePlanetId).then((favoritePlanet) => setFavoritePlanet(favoritePlanet));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        deleteFavoritePlanet(favoritePlanetId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/favoriteplanets"));
    };
    if (!favoritePlanet) {
        return null;
    }
    return (
        <>
            <h1>Are you sure you want to delete {favoritePlanet.planet.name}?</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="275"
                        image={favoritePlanet.planet.imageUrl}
                        alt={favoritePlanet.planet.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {favoritePlanet.planet.name}
                        </Typography>
                        <div>Distance: {favoritePlanet.planet.distance} </div>
                        <div>Gravity: {favoritePlanet.planet.gravity} </div>
                        <div>Composition: {favoritePlanet.planet.composition} </div>
                        <div>Orbit: {favoritePlanet.planet.orbit} </div>
                        <div>Atmosphere: {favoritePlanet.planet.atmosphere} </div>
                        <div>Size: {favoritePlanet.planet.size} </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button
                variant="contained"
                onClick={(event) => { handleSaveButtonClick(event) }}
            >
                Delete
            </Button>
            <Button variant="contained" onClick={() => navigate(`/favoriteplanets`)}>
                Back
            </Button>
        </>
    );
};