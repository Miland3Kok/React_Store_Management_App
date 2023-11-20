import "./ProductDetail.css"
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Prod} from "../model/Prod";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Alert, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Paper, Typography} from "@mui/material";
import {Eigenschappen} from "./Eigenschappen";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {EditProductDialog} from "./EditProductDialog";
import ManagerContext from "../context/ManagerContext";

export function ProductDetail() {
    const {showManager} = useContext(ManagerContext);
    const [product, setProduct] = useState<Prod>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [clickedProd, setClickedProd]= useState<Prod>({id: 0, name: "", image: "", price: 0, afdeling_id: 0, afdeling_naam: "", omschrijving: "", promo: false, voorraad: 0, min_voorraad: 0});
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get<Prod>(`/producten/${id}`);
                setProduct(response.data);
                setIsLoading(false);

            } catch (e) {
                setIsError(true);
                setIsLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    function editProduct(product: Prod) {
        if (product.id < 8) {
            product.afdeling_id = 1;
            product.afdeling_naam = "GPU's";
        } else if (product.id < 14) {
            product.afdeling_id = 2;
            product.afdeling_naam = "CPU's";
        } else if (product.id < 21) {
            product.afdeling_id = 3;
            product.afdeling_naam = "Cases";
        } else if (product.id < 25) {
            product.afdeling_id = 4;
            product.afdeling_naam = "RAM";
        }
        axios.put(`/producten/${product.id}`, {id: (Number(product.id)), name: product.name, image: product.image, price: (Number(product.price)), afdeling_id: (Number(product.afdeling_id)), afdeling_naam: product.afdeling_naam, omschrijving: product.omschrijving, promo: product.promo, voorraad: (Number(product.voorraad)), min_voorraad: (Number(product.min_voorraad))});
        setProduct(product);
    }

    function handleEditClick(product: Prod) {
        setClickedProd(product);
        setIsEditDialogOpen(true);
    }

    if (isLoading) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isError || !product) {
        return <Alert severity="error">Data kan niet geladen worden!</Alert>;
    }

    return (
        <>
            <div className="product-detail">
                <Paper className="paper" elevation={3} sx={{height: '140%', width: '100%'}}>
                    <Card sx={{maxWidth: '1000px', mx: 'auto', mt: '2rem', height: ''}}>
                        <CardMedia
                            className="cardMedia"
                            component="img"
                            image={product.image}
                            alt="about"
                            sx={{maxWidth: '500px'}}
                        />
                        <CardContent className="cardContent">
                            <Typography className="typography" gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography className="typography" gutterBottom variant="h6" component="div">
                                {product.afdeling_naam}
                            </Typography>
                            <Typography  className="typography" variant="body1" color="text.secondary">
                                {showManager && <Button variant="contained" onClick={() => handleEditClick(product)}><EditIcon/></Button>}
                                <Button variant="contained"
                                        onClick={() => navigate(`/searchProduct/${product.id}`)}>
                                    <SearchIcon/>
                                </Button>
                                {isEditDialogOpen? <EditProductDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSubmit={editProduct} Product={clickedProd}/> : null}
                            </Typography>
                            <Typography  className="typography" variant="body1" color="text.secondary">
                                {product.promo.toString() === "true" ? <p>Dit product is in promotie!</p> :
                                    <p>Dit product is niet in promotie.</p>}
                            </Typography>
                            <Typography  className="typography" variant="body1" color="text.secondary">
                                €{product.price}
                            </Typography>

                            <Typography  className="typography" variant="body1" color="text.secondary">
                                Voorraad: {product.voorraad}
                            </Typography>
                            <Divider/>
                            <Typography  className="typography" variant="body2" color="text.secondary">
                               <strong>Omschrijving: <br/></strong>
                                {product.omschrijving}
                            </Typography>
                            <Eigenschappen productId={product.id}/>
                        </CardContent>
                    </Card>
                </Paper>
            </div>
        </>
    );

}