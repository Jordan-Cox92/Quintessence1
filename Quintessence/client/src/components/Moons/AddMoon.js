import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllMoons,
    postNewMoon,
} from "../../modules/moonManager";
import { getAllPlanets } from "../../modules/planetManager";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";



export const AddMoonForm = () => {


    const [moon, setMoon] = useState([]);
    const [planets, setPlanets] = useState([]);

    const [userSelections, setUserSelections] = useState({
        name: "",
        distance: "",
        planetId: "",
        imageUrl: "",
        gravity: "",
        composition: "",
        orbit: "",
        atmosphere: "",
        size: ""
    });
    const navigate = useNavigate();






    useEffect(() => {
        getAllMoons().then((moon) => setMoon(moon));
        getAllPlanets().then((planet) => setPlanets(planet));
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
            size: userSelections.size
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
            postNewMoon(newMoon)
                .catch((e) => alert(e.message))
                .then(() => navigate("/moons"));
        } else {
            alert("Please complete the form");
        }
    };

    const handleInputChange = (event) => {
        const copy = { ...userSelections };
        copy[event.target.name] = event.target.value;
        setUserSelections(copy);
    };

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">Add New Moon</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required
                        autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="ex.. banana"
                        value={userSelections.name}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Distance: </label>
                    <input
                        required
                        autoFocus
                        name="distance"
                        type="text"
                        className="form-control"
                        placeholder="example.com"
                        value={userSelections.distance}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">PlanetId: </label>
                    <select



                        name="planetId"

                        className="form-control"


                        onChange={handleInputChange}
                    >
                        <option value="0">Select a Planet</option>
                        {planets.map(planet => {
                            return <option value={planet.id}>{planet.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>



            <fieldset>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image Url: </label>
                    <input
                        required
                        autoFocus
                        name="imageUrl"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gravity">Gravity: </label>
                    <input
                        required
                        autoFocus
                        name="gravity"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.gravity}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="composition">Composition: </label>
                    <input
                        required
                        autoFocus
                        name="composition"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.composition}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="orbit">Orbit: </label>
                    <input
                        required
                        autoFocus
                        name="orbit"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.orbit}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="atmosphere">Atmosphere: </label>
                    <input
                        required
                        autoFocus
                        name="atmosphere"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.atmosphere}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size: </label>
                    <input
                        required
                        autoFocus
                        name="size"
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={userSelections.size}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <Button
                style={{ marginTop: "2em" }}
                variant="contained"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="submit_button"
            >
                {" "}
                Add New Moon{" "}
            </Button>
        </form>
    );
};