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

export const PlanetDelete = () => {
    const { planetId } = useParams();
    const [planet, setPlanet] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getPlanetById(planetId).then((planet) => setPlanet(planet));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        DeletePlanet(planetId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/planets"));
    };

    return (
        <>
            <h1>Are you sure you want to delete {planet.name}?</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="275"
                        image={planet.imageUrl}
                        alt={planet.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {planet.name}
                        </Typography>
                        <div>Distance: {planet.distance} </div>
                        <div>Gravity: {planet.gravity} </div>
                        <div>Composition: {planet.composition} </div>
                        <div>Orbit: {planet.orbit} </div>
                        <div>Atmosphere: {planet.atmosphere} </div>
                        <div>Size: {planet.size} </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button
                variant="contained"
                onClick={(event) => handleSaveButtonClick(event)}
            >
                Delete
            </Button>
            <Button variant="contained" onClick={() => navigate(`/planets`)}>
                Back
            </Button>
        </>
    );
};