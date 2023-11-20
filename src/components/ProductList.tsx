import "./ProductList.css";
import {GridColDef, DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Button, CircularProgress, TextField, } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import SearchIcon from '@mui/icons-material/Search';
import {Prod} from "../model/Prod";
import {useNavigate} from "react-router-dom";

export function ProductList() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [producten, setProducten] = useState<Prod[]>([]);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const handleSearch = async () => {
        await axios.get<Prod[]>(`/producten/?q=${value}`)
            .then((response) => setProducten(response.data));
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 70 },
        { field: 'name', headerName: 'Naam', width: 250 },
        { field: 'price', headerName: 'Prijs in €', width: 130 },
        { field: 'afdeling_id', headerName: 'Afdeling', width: 130 },
        { field: 'promo', headerName: 'Promo', width: 130 },
        { field: 'action', headerName: 'Product pagina', width: 130,
            renderCell: (params) => {
                const onClick = (e: any) => {
                    e.stopPropagation();
                    navigate(`/productdetail/${params.id}`);
                };
                return <Button onClick={onClick}><LinkIcon></LinkIcon></Button>;
            }
        },
    ];

    useEffect(() => {
        setIsLoading(true);
        axios.get<Prod[]>("/producten")
            .then(response => {
                //sort response.data by promo
                response.data.sort((a, b) => (a.promo > b.promo) ? -1 : 1)
                setProducten(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsError(true);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isError || !producten) {
        return <Alert severity="error">Data kan niet geladen worden!</Alert>;
    }

    return (
        <>
            <div className="filter">
                <TextField className="textfield" id="standard-basic" label="Search" variant="standard" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button className="filterButton" type="submit" variant="contained" onClick={handleSearch}><SearchIcon/></Button>
            </div>
            <div className="producttable" style={{height: 1000, width: '100%'}}>
            <DataGrid className="dataGrid" rows={producten} columns={columns} pageSize={25} />
            </div>
        </>
    );
}