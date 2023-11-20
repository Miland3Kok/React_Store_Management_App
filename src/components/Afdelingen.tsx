import "./Afdelingen.css"
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Alert, Typography} from "@mui/material"
import {Afdeling} from "../model/Afdeling";
import {useNavigate} from "react-router-dom";
import {useAfdelingen} from "../hooks/useAfdelingen";

export function Afdelingen() {
    const {isLoading, isError, afdelingen} = useAfdelingen();
    const navigate = useNavigate();

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
            <div className="afdelingen">
                {afdelingen.map(({id, name, image}: Afdeling) => (
                    <Card className="cardAfdeling"
                        sx={{width: 350, m: 1}}
                        key={id}
                        onClick={() => navigate(`/grondplan/${id}`)}
                    >
                        <CardActionArea>
                            <CardMedia className="cardMedia"
                                component="img"
                                height="400"
                                width="25%"
                                image={image}
                                alt={name}
                            />
                            <CardContent className="cardContent">
                                <Typography className="typography"
                                    gutterBottom
                                    variant="h4"
                                    component="div"
                                    sx={{ textAlign: "center"}}
                                >
                                    {name}
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </>
    );
}
