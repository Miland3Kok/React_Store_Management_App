import {Card, CardMedia, CardContent, Typography} from "@mui/material";
import "./Afdelingen.css";

export default function About() {
    return (
        <Card sx={{maxWidth: 600, mx: 'auto', mt: '2rem', height: ''}}>
            <CardMedia
                className="cardMedia"
                component="img"
                image={'https://cdn-icons-png.flaticon.com/512/273/273177.png'}
                alt="about"
            />
            <CardContent className="cardContent">
                <Typography className="typography" gutterBottom variant="h5" component="div">
                    Winkelbeheer
                </Typography>
                <Typography  className="typography" variant="body2" color="text.secondary">
                    React demo project voor het vak User Interfaces 3 van Karel de Grote Hogeschool
                    gemaakt door Milan de Kok
                </Typography>
            </CardContent>
        </Card>
    );
}