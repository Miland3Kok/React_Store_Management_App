import {Alert, CircularProgress} from "@mui/material";
import {useProduct} from "../hooks/useProduct";
import "./Product.css";
import {Prod} from "../model/Prod";
import {ProductInfo} from "./ProductInfo";
import {useContext} from "react";
import SettingsContext from "../context/SettingsContext";

interface ProductProps {
    id: number;
    afdelingId: number;
    width: number;
    height: number;
    left: number;
    top: number;
}
export function Product({id, afdelingId, width, height, left, top}: ProductProps){
    const {isLoading, isError, product} = useProduct(id, afdelingId);
    const {showName} = useContext(SettingsContext);
    const {showPrice} = useContext(SettingsContext);
    const {showPromo} = useContext(SettingsContext);
    const {showPositie} = useContext(SettingsContext);
    const {colorIv} = useContext(SettingsContext);
    const {colorW} = useContext(SettingsContext);
    const {colorNiv} = useContext(SettingsContext);
    if (isLoading) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isError || !product) {
        return <Alert severity="error">Data kan niet geladen worden!</Alert>;
    }

    function checkVoorrraad(product: Prod) {
        if (product.voorraad === 0) {
            return(
                <div className="red" style={{width:width, height:height+50, left:left, top:top, border:"3px solid black", backgroundColor: colorNiv}}>
                    <ProductInfo product={product} showName={showName} showPrice={showPrice} showPromo={showPromo} showPositie={showPositie}/>
                </div>
                )
        } else if (product.voorraad < product.min_voorraad) {
            return(
                <div className="orange" style={{width:width, height:height+49, left:left, top:top, border:"3px solid black", backgroundColor: colorW}}>
                    <ProductInfo product={product} showName={showName} showPrice={showPrice} showPromo={showPromo} showPositie={showPositie}/>
                </div>
                )
        } else {
            return(
                <div className="green" style={{width:width, height:height+49, left:left, top:top, border:"3px solid black", backgroundColor: colorIv}}>
                    <ProductInfo product={product} showName={showName} showPrice={showPrice} showPromo={showPromo} showPositie={showPositie}/>
                </div>
            )
        }
    }

    return (
        checkVoorrraad(product)
    )
}
