import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {EigenschapData} from "../model/Eigenschap";

const REQUIRED_FIELD_MESSAGE = "This field is required";
const MIN_LENGHT_MESSAGE = (length: number) =>
    `Please enter minimum ${length} characters.`;

interface AddEigenschapDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EigenschapData) => void;
}

export function AddEigenschapDialog({isOpen, onClose, onSubmit}: AddEigenschapDialogProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            eigenschap: "",
            waarde: "",
        },
    });

    const _onSubmit = (data: EigenschapData) => {
        onSubmit(data);
        reset();
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(_onSubmit)}>
                <DialogTitle>Nieuwe Eigenschap</DialogTitle>
                <DialogContentText paddingX={3}>
                    Vul alle velden in om een nieuwe eigenschap aan te maken.
                </DialogContentText>
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Controller
                            name="eigenschap"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                minLength: {value: 3, message: MIN_LENGHT_MESSAGE(3)}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.eigenschap}
                                    helperText={errors.eigenschap?.message}
                                    style={{paddingBottom: 5}}
                                    label="Eigenschap"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="waarde"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                minLength: {value: 3, message: MIN_LENGHT_MESSAGE(3)}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.waarde}
                                    helperText={errors.waarde?.message}
                                    style={{paddingBottom: 5}}
                                    label="Waarde"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </DialogContent>
                <DialogActions style={{paddingRight: "1.5em", paddingBottom: "1.5em"}}>
                    <Button type="reset" variant="outlined" onClick={() => reset()}>
                        Clear
                    </Button>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}