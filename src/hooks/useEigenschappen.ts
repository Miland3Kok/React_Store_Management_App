import {useMutation, useQuery, useQueryClient} from 'react-query';
import {addEigenschap, getEigenschappen} from "../services/WinkelDataService";
import {Eigenschap} from "../model/Eigenschap";

export function useEigenschappen(productId: number) {
    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        data: eigenschappen,
    } = useQuery(["eigenschappen", productId], () => getEigenschappen(productId));

    const {
        mutate,
        isLoading: isAddingEigenschap,
        isError: isErrorAddingEigenschap,
    } = useMutation((eigenschap: Omit<Eigenschap, "id">) => addEigenschap(eigenschap), {
        onSuccess: () => {
            queryClient.invalidateQueries(["eigenschappen", productId]);
        },
    });

    return {
        isLoading,
        isError,
        eigenschappen,
        addEigenschapMutation: mutate,
        isAddingEigenschap,
        isErrorAddingEigenschap,
    }
}