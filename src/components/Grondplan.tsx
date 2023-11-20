import "./Grondplan.css";
import {useContext} from "react";
import {Alert, CircularProgress} from "@mui/material";
import {Position} from "../model/Position";
import {useParams} from "react-router-dom";
import {Product} from "./Product"
import {useNavigate} from "react-router-dom";
import {useGrondplan} from "../hooks/useGrondplan";

export function Grondplan() {
    const {id} = useParams();
    const afdelingId = Number(id);
    const navigate = useNavigate();
    const {isLoading, isError, grondplan} = useGrondplan(Number(id!));


    if (isLoading) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isError || !grondplan) {
        return <Alert severity="error">Data kan niet geladen worden!</Alert>;
    }

    return (
        <>
            <div className="grondplan" style={{}}>
            {grondplan.positions.map(({id, width, height, left, top} : Position) => (
                <div className={"position"}
                     key={id}
                     style={{width: width, height: height, left: left+50, top: top+50, position: "absolute"}}
                     onClick={() => navigate(`/productdetail/${id}`)}>
                    <Product id={id}
                             afdelingId={afdelingId}
                             width={width}
                             height={height}
                             left={left}
                             top={top}
                    />
                </div>
            ))}
            </div>
        </>
    );
}