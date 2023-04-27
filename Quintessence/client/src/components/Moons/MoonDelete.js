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
    DeleteMoon,
    getMoonById,
} from "../../modules/moonManager";

export const MoonDelete = () => {
    const { moonId } = useParams();
    const [moon, setMoon] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getMoonById(moonId).then((moon) => setMoon(moon));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        DeleteMoon(moonId)
            .catch((e) => alert(e.message))
            .then(() => navigate("/moons"));
    };

    return (
        <>
            <h1>Are you sure you want to delete {moon.name}?</h1>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="275"
                        image={moon.imageUrl}
                        alt={moon.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {moon.name}
                        </Typography>
                        <div>Distance: {moon.distance} </div>
                        <div>planetId: {moon.planetId} </div>
                        <div>Gravity: {moon.gravity} </div>
                        <div>Composition: {moon.composition} </div>
                        <div>Orbit: {moon.orbit} </div>
                        <div>Atmosphere: {moon.atmosphere} </div>
                        <div>Size: {moon.size} </div>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button
                variant="contained"
                onClick={(event) => handleSaveButtonClick(event)}
            >
                Delete
            </Button>
            <Button variant="contained" onClick={() => navigate(`/moons`)}>
                Back
            </Button>
        </>
    );
};