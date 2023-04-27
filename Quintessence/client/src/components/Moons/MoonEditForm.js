import { Box, Button, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
    EditMoon,
    getMoonById,
} from "../../modules/moonManager";

export const MoonEditForm = () => {
    const { moonId } = useParams();
    const [moon, setMoon] = useState({});

    const [userSelections, setUserSelections] = useState({
        name: "",
        distance: "",
        planetId: "",
        imageUrl: "",
        gravity: "",
        composition: "",
        orbit: "",
        atmosphere: "",
        size: "",
        id: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        getMoonById(moonId).then((moon) => setUserSelections(moon));
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        const newMoon = {
            name: userSelections.name,
            distance: userSelections.distance,
            planetId: userSelections.planetId,
            imageUrl: userSelections.imageUrl,
            gravity: userSelections.gravity,
            composition: userSelections.composition,
            orbit: userSelections.orbit,
            atmosphere: userSelections.atmosphere,
            size: userSelections.size,
            id: moonId,
        };
        if (
            userSelections.name &&
            userSelections.distance &&
            userSelections.planetId &&
            userSelections.imageUrl &&
            userSelections.gravity &&
            userSelections.composition &&
            userSelections.orbit &&
            userSelections.atmosphere &&
            userSelections.size
        ) {
            EditMoon(newMoon)
                .catch((e) => alert(e.message))
                .then(() => navigate("/moons"));
        } else {
            alert("Please complete the form");
        }
    };

    return (

        <FormControl>
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Moon Name"
                        value={userSelections.name}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.name = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Distance"
                        value={userSelections.distance}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.distance = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>

                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="planetId"
                        value={userSelections.planetId}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.planetId = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>


                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Image URL"
                        value={userSelections.imageUrl}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.imageUrl = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <img
                    src={userSelections.imageUrl}
                    alt={userSelections.name}
                    height="100"
                ></img>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Gravity"
                        value={userSelections.gravity}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.gravity = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Composition"
                        value={userSelections.composition}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.composition = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Orbit"
                        value={userSelections.orbit}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.orbit = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Atmosphere"
                        value={userSelections.atmosphere}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.atmosphere = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>


                <div>
                    <TextField
                        required={true}
                        id="outlined-required"
                        label="Size"
                        value={userSelections.size}
                        onChange={(evt) => {
                            const copy = { ...userSelections };
                            copy.size = evt.target.value;
                            setUserSelections(copy);
                        }}
                    />
                </div>


                <Button
                    style={{ marginTop: "2em" }}
                    variant="contained"
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary"
                >
                    Save Moon
                </Button>
            </Box>
        </FormControl>
    );
};