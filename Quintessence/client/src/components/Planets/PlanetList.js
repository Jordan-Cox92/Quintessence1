import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useRadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllPlanets } from "../../modules/planetManager";
import { postNewFavoritePlanet } from "../../modules/favoritePlanetManager";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "firebase/auth";
import firebase from "firebase/app";




export default function PlanetList() {
    const [planets, setPlanets] = useState([]);
    const [user, setUser] = useState([])
    const currentFirebaseUser = firebase.auth().currentUser.uid

    const navigate = useNavigate();

    function createData(
        id,
        name,
        distance,
        imageUrl,
        gravity,
        composition,
        orbit,
        atmosphere,
        size
    ) {
        return {
            id,
            name,
            distance,
            imageUrl,
            gravity,
            composition,
            orbit,
            atmosphere,
            size
        };
    }
    const rows = planets.map((planet) =>
        createData(
            `${planet.id}`,
            `${planet.name}`,
            `${planet.distance}`,
            `${planet.imageUrl}`,
            `${planet.gravity}`,
            `${planet.composition}`,
            `${planet.orbit}`,
            `${planet.atmosphere}`,
            `${planet.size}`

        )
    );

    useEffect(() => {
        getAllPlanets().then((planet) => setPlanets(planet));
    }, []);

    useEffect(() => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }, [])

    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    navigate("planets/add");
                }}
            >
                Add New Planet
            </Button>

            <Button
                variant="contained"
                onClick={() => {


                }}
            >
                Add Favorite Planet
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Distance</TableCell>
                            <TableCell>Gravity</TableCell>
                            <TableCell>Orbit</TableCell>
                            <TableCell>Size</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.distance}</TableCell>
                                <TableCell>{row.gravity}</TableCell>
                                <TableCell>{row.orbit}</TableCell>
                                <TableCell>{row.size}</TableCell>

                                <TableCell>

                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            const newFavorite = {
                                                userId: user.id,
                                                planetId: parseInt(row.id)
                                            }
                                            postNewFavoritePlanet(newFavorite);

                                        }}
                                    >
                                        Add Favorite
                                    </Button>


                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/planet/${row.id}`)}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/planet/edit/${row.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/planet/delete/${row.id}`)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}