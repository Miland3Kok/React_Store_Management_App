
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
import {Eigenschap} from "../model/Eigenschap";

const REQUIRED_FIELD_MESSAGE = "This field is required";
const MIN_LENGHT_MESSAGE = (length: number) =>
    `Please enter minimum ${length} characters.`;

interface EditEigenschapDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Eigenschap) => void;
    eigenschap: Eigenschap
}

export function EditEigenschapDialog({isOpen, onClose, onSubmit, eigenschap}: EditEigenschapDialogProps) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            id: eigenschap.id,
            product_id: eigenschap.product_id,
            eigenschap: eigenschap.eigenschap,
            waarde: eigenschap.waarde,
        },
    });

    const _onSubmit = (data: Eigenschap) => {
        onSubmit(data);
        onClose();
    }

    return (

        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(_onSubmit)}>
                <DialogTitle>Edit Eigenschap</DialogTitle>
                <DialogContentText paddingX={3}>
                    Hier kan je de velden aanpassen.
                </DialogContentText>
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Controller
                            name="id"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                            }}
                            render={({field}) => (
                                <TextField
                                    disabled={true}
                                    error={!!errors.id}
                                    helperText={errors.id?.message}
                                    style={{paddingBottom: 5}}
                                    label="id"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="product_id"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                minLength: {value: 3, message: MIN_LENGHT_MESSAGE(3)}
                            }}
                            render={({field}) => (
                                <TextField
                                    disabled={true}
                                    error={!!errors.product_id}
                                    helperText={errors.product_id?.message}
                                    style={{paddingBottom: 5}}
                                    label="product_id"
                                    {...field}
                                />
                            )}
                        />
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
                                required: REQUIRED_FIELD_MESSAGE
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
                    <Button type="submit" variant="contained">
                        Edit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );

}
