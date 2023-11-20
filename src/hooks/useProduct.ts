import {useQuery} from 'react-query';
import {getProduct} from "../services/WinkelDataService";

export function useProduct(id: number, afdelingId: number) {
    const {
        isLoading,
        isError,
        data: product,
    } = useQuery(["product", id, afdelingId], () => getProduct(id, afdelingId));

    return {
        isLoading,
        isError,
        product
    }
}