import "./Afdelingen.css"
import {CircularProgress, Alert} from "@mui/material"
import {useNavigate} from "react-router-dom";
import {useAfdelingen} from "../hooks/useAfdelingen";
import "./Afdelingen.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Prod} from "../model/Prod";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function OverzichtAfdelingen() {
    const {isLoading, isError, afdelingen} = useAfdelingen();
    const [isLoadingProducten, setIsLoadingProducten] = useState(false);
    const [isErrorProducten, setIsErrorProducten] = useState(false);
    const [producten, setProducten] = useState<Prod[]>([]);
    const navigate = useNavigate();
    let voorraad_Afdeling1=0;
    let voorraad_Afdeling2=0;
    let voorraad_Afdeling3=0;
    let voorraad_Afdeling4=0;

    useEffect(() => {
        setIsLoadingProducten(true);
        axios.get<Prod[]>("/producten")
            .then(response => {
                setProducten(response.data);
                setIsLoadingProducten(false);
            })
            .catch(() => {
                setIsErrorProducten(true);
                setIsLoadingProducten(false);
            });
    }, []);

    if (isLoading) {
        return (
            <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>
        );
    }

    if (isLoadingProducten) {
        return (
            <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>
        );
    }

    if (isError || !afdelingen) {
        return <Alert severity="error">Afdelingen kunnen niet geladen worden!</Alert>;
    }

    if (isErrorProducten || !producten) {
        return <Alert severity="error">Producten kunnen niet geladen worden!</Alert>;
    }

    function berekenAantalVoorraad(){
        producten.forEach((product) => {
            if(product.afdeling_id===1){
                voorraad_Afdeling1+=product.voorraad;
            }
            if(product.afdeling_id===2){
                voorraad_Afdeling2+=product.voorraad;
            }
            if(product.afdeling_id===3){
                voorraad_Afdeling3+=product.voorraad;
            }
            if(product.afdeling_id===4){
                voorraad_Afdeling4+=product.voorraad;
            }
        })
    }

    berekenAantalVoorraad()
    function createdata(
        id: number,
        name: string,
        voorraad: number
    ) {
        return { id, name, voorraad };
    }

    const rows = [
        createdata(1, "GPU's", voorraad_Afdeling1),
        createdata(2, "CPU's", voorraad_Afdeling2),
        createdata(3, "Cases", voorraad_Afdeling3),
        createdata(4, "RAM", voorraad_Afdeling4),
    ]

    if (isLoading) {
        return (
            <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>
        );
    }

    if (isError || !afdelingen) {
        return <Alert severity="error">Afdelingen kunnen niet geladen worden!</Alert>;
    }

    return (
        <>
            <TableContainer className="tablecontainer" component={Paper}>
                <Table className="table" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell className="tablecell" align="left">Id</TableCell>
                            <TableCell align="left">Naam</TableCell>
                            <TableCell align="left">Voorraad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow className={"tableRow"}
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                                onClick={() => navigate(`/grondplan/${row.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.voorraad}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}
