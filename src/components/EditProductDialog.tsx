
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
import {Prod} from "../model/Prod";

const REQUIRED_FIELD_MESSAGE = "This field is required";
const MIN_LENGHT_MESSAGE = (length: number) =>
    `Please enter minimum ${length} characters.`;

interface EditProductDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Prod) => void;
    Product: Prod
}

export function EditProductDialog({isOpen, onClose, onSubmit, Product}: EditProductDialogProps) {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            id: Product.id,
            name: Product.name,
            image: Product.image,
            price: Product.price,
            afdeling_id: Product.afdeling_id,
            afdeling_naam: Product.afdeling_naam,
            omschrijving: Product.omschrijving,
            promo: Product.promo,
            voorraad: Product.voorraad,
            min_voorraad: Product.min_voorraad
        },
    });

    const _onSubmit = (data: Prod) => {
        onSubmit(data);
        onClose();
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(_onSubmit)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContentText paddingX={3}>
                    Hier kan je het product aanpassen.
                </DialogContentText>
                <DialogContent>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Controller
                            name="id"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                max: {value: 24, message: "Positie mag max 24 zijn"}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.id}
                                    type="number"
                                    helperText={errors.id?.message}
                                    style={{paddingBottom: 5}}
                                    label="Positie"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                minLength: {value: 3, message: MIN_LENGHT_MESSAGE(3)}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    style={{paddingBottom: 5}}
                                    label="Naam"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="image"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                minLength: {value: 3, message: MIN_LENGHT_MESSAGE(3)}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.image}
                                    type="url"
                                    helperText={errors.image?.message}
                                    style={{paddingBottom: 5}}
                                    label="Afbeelding"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                min: {value: 0, message: "Prijs kan niet minder dan 0 zijn!"}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.price}
                                    type="number"
                                    helperText={errors.price?.message}
                                    style={{paddingBottom: 5}}
                                    label="Prijs"
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name="omschrijving"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.omschrijving}
                                    helperText={errors.omschrijving?.message}
                                    style={{paddingBottom: 5}}
                                    label="Omschrijving"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="promo"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    type="boolean"
                                    error={!!errors.promo}
                                    helperText={errors.promo?.message}
                                    style={{paddingBottom: 5}}
                                    label="promo"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="voorraad"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                min: {value: 0, message: "Voorraad kan niet minder dan 0 zijn!"}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.voorraad}
                                    type="number"
                                    helperText={errors.voorraad?.message}
                                    style={{paddingBottom: 5}}
                                    label="Voorraad"
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="min_voorraad"
                            control={control}
                            rules={{
                                required: REQUIRED_FIELD_MESSAGE,
                                min: {value: 0, message: "min_voorraad kan niet minder dan 0 zijn!"}
                            }}
                            render={({field}) => (
                                <TextField
                                    error={!!errors.min_voorraad}
                                    type="number"
                                    helperText={errors.min_voorraad?.message}
                                    style={{paddingBottom: 5}}
                                    label="Minimum voorraad"
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