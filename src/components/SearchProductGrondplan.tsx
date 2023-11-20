import {useGrondplan} from "../hooks/useGrondplan";
import {Alert, CircularProgress} from "@mui/material";
import {Position} from "../model/Position";
import {useNavigate} from "react-router-dom";
import {Prod} from "../model/Prod";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function SearchProductGrondplan() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [isProductError, setIsProductError] = useState(false);
    const [product, setProduct] = useState<Prod>();

    useEffect(() => {
       async function fetchProduct() {
           try {
               const response = await axios.get<Prod>(`/producten/${id}`);
               setProduct(response.data);
               setIsProductLoading(false);
           } catch (e) {
               setIsProductError(true);
               setIsProductLoading(false);
           }
       }
       fetchProduct();
    }, [id]);

    const {isLoading, isError, grondplan} = useGrondplan(Number(product?.afdeling_id));

    if (isLoading || isProductLoading) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isError || isProductError || !grondplan) {
        return <Alert severity="error">Data kan niet geladen worden!</Alert>;
    }

    return (
        <>
            <div>
                <div className="grondplan" style={{}}>
                    <h1 className="showprod">Afdeling: {product?.afdeling_naam}</h1>
                    {grondplan.positions.map(({id, width, height, left, top} : Position) => (
                        <div className={"position"}
                             key={id}
                             style={{width: width, height: height, left: left+ 50, top: top+50, position: "absolute", border: id === product?.id ? "3px solid red" : "3px solid black"}}
                             onClick={() => navigate(`/productdetail/${id}`)}>
                            <h1 className="showprod">{id === product?.id ? product.name : ""}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}