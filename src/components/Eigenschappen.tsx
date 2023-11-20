import "./Eigenschappen.css"
import {Alert, Button, CircularProgress, Fab, Paper,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Eigenschap, EigenschapData} from "../model/Eigenschap";
import {useEigenschappen} from "../hooks/useEigenschappen";
import {AddEigenschapDialog} from "./AddEigenschapDialog";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {EditEigenschapDialog} from "./EditEigenschapDialog";
import ManagerContext from "../context/ManagerContext";

interface EigenschappenProps {
    productId: number;
}
export function Eigenschappen({productId}: EigenschappenProps) {
    const {addEigenschapMutation, isErrorAddingEigenschap, isAddingEigenschap} = useEigenschappen(productId);
    const {showManager} = useContext(ManagerContext);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [clickedEigenschap, setClickedEigenschap]= useState<Eigenschap>({id: 0, product_id: 0, eigenschap: "", waarde: ""})
    const [update, setUpdate] = useState(false);
    const [showEigenschappen, setShowEigenschappen] = useState<Eigenschap[]>();
    const [isLoadingShowEigenschappen, setIsLoadingShowEigenschappen] = useState(true);
    const [isErrorShowEigenschappen, setIsErrorShowEigenschappen] = useState(false);

    useEffect(() => {
        async function fetchEigenschappen() {
            try {
                const response = await axios.get<Eigenschap[]>(`/eigenschappen`);
                console.log(productId);
                setShowEigenschappen(response.data.filter(eigenschap => eigenschap.product_id === productId));
                setIsLoadingShowEigenschappen(false);

            } catch (e) {
                setIsErrorShowEigenschappen(true);
                setIsLoadingShowEigenschappen(false);
            }
        }
        fetchEigenschappen()
    }, [update, productId]);

    if(isLoadingShowEigenschappen){
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }

    if (isErrorShowEigenschappen || !showEigenschappen) {
        return <Alert severity="error">Er is iets misgegaan met het ophalen van de eigenschappen</Alert>;
    }

    if (isAddingEigenschap) {
        return <CircularProgress sx={{display: "block", mt: "10em", mx: "auto"}}/>;
    }


    if (isErrorAddingEigenschap) {
        return <Alert severity="error">Data kan niet toegevoegd worden!</Alert>;
    }

    const addEigenschap = (data: EigenschapData) => {
        addEigenschapMutation({...data, product_id: productId});
    };

    function editEigenschap(eigenschap: Eigenschap) {
        axios.patch('/eigenschappen/' + eigenschap.id, eigenschap)
        setUpdate(!update);
    }

    function removeEigenschap(id: Number) {
        axios.delete(`/eigenschappen/${id}`);
        setUpdate(!update);
    }

    function handleEditClick(eigenschap: Eigenschap) {
        setClickedEigenschap(eigenschap);
        setIsEditDialogOpen(true);
    }

    return (
        <>
            <div className="eigenschappen">
                <h2>Eigenschappen</h2>
                {showEigenschappen.map((eigenschap: Eigenschap) => (
                    <Paper className="paper" key={eigenschap.id} sx={{p: 2, m: 1}}>
                        <h3>{eigenschap.eigenschap}</h3>
                        <p>{eigenschap.waarde}</p>
                        {showManager && <Button variant="outlined" onClick={() => handleEditClick(eigenschap)}><EditIcon/></Button>}
                        <Button variant="outlined" onClick={() => removeEigenschap(eigenschap.id)}><DeleteForeverIcon/></Button>
                        {isEditDialogOpen ? <EditEigenschapDialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} onSubmit={editEigenschap} eigenschap={clickedEigenschap} /> : ""}
                        <AddEigenschapDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSubmit={addEigenschap}/>
                    </Paper>))}
                    <Fab
                        sx={{alignSelf: "flex-end", position: "fixed", bottom: "1em", right: "1em"}}
                        size={"large"}
                        color={"primary"}
                        aria-label={"add"}
                        onClick={() => setIsAddDialogOpen(true)}>
                        <AddIcon/>
                    </Fab>
            </div>
            {}

        </>
    );
}