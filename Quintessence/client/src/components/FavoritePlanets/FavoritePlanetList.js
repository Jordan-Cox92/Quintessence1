import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllFavoritePlanets } from "../../modules/favoritePlanetManager";
import { getCurrentUserByFirebaseId } from "../../modules/userManager";
import "firebase/auth";
import firebase from "firebase/app";

export default function FavoritePlanetList() {
    const [favoritePlanets, setFavoritePlanets] = useState([]);
    const [filteredFavPlanets, setFilteredFavPlanets] = useState([])
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
    const rows = favoritePlanets.map((favoritePlanet) =>
        createData(
            `${favoritePlanet.planet.id}`,
            `${favoritePlanet.planet.name}`,
            `${favoritePlanet.planet.distance}`,
            `${favoritePlanet.planet.imageUrl}`,
            `${favoritePlanet.planet.gravity}`,
            `${favoritePlanet.planet.composition}`,
            `${favoritePlanet.planet.orbit}`,
            `${favoritePlanet.planet.atmosphere}`,
            `${favoritePlanet.planet.size}`

        )
    );
    console.log(rows);
    useEffect(() => {
        getAllFavoritePlanets().then((favoritePlanet) => setFavoritePlanets(favoritePlanet));
    }, [user]);

    useEffect(() => {
        getCurrentUserByFirebaseId(currentFirebaseUser).then(user => setUser(user));
    }, [])

    useEffect(
        () => {
            const userFavorites = favoritePlanets.filter(favoritePlanet => favoritePlanet.userId === user.id)
            setFilteredFavPlanets(userFavorites)
        },
        [favoritePlanets]
    )

    return (
        <>


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
                        {filteredFavPlanets.map((fav) => (

                            <TableRow
                                key={fav.planet.name}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {fav.planet.name}
                                </TableCell>
                                <TableCell>{fav.planet.distance}</TableCell>
                                <TableCell>{fav.planet.gravity}</TableCell>
                                <TableCell>{fav.planet.orbit}</TableCell>
                                <TableCell>{fav.planet.size}</TableCell>

                                <TableCell>


                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/favoritePlanet/delete/${fav.planet.id}`)}
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