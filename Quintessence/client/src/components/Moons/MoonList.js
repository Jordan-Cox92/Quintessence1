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
import { getAllMoons } from "../../modules/moonManager";

export default function MoonList() {
    const [moons, setMoons] = useState([]);

    const navigate = useNavigate();

    function createData(
        id,
        name,
        distance,
        planetId,
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
            planetId,
            imageUrl,
            gravity,
            composition,
            orbit,
            atmosphere,
            size
        };
    }
    const rows = moons.map((moon) =>
        createData(
            `${moon.id}`,
            `${moon.name}`,
            `${moon.distance}`,
            `${moon.planetId}`,
            `${moon.imageUrl}`,
            `${moon.gravity}`,
            `${moon.composition}`,
            `${moon.orbit}`,
            `${moon.atmosphere}`,
            `${moon.size}`

        )
    );

    useEffect(() => {
        getAllMoons().then((moon) => setMoons(moon));
    }, []);

    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    navigate("moons/add");
                }}
            >
                Add New Moon
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
                                        onClick={() => navigate(`/moon/${row.id}`)}
                                    >
                                        Details
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/moon/edit/${row.id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(`/moon/delete/${row.id}`)}
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