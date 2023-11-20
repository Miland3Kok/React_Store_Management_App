import {useQuery} from 'react-query';
import {getGrondplan} from "../services/WinkelDataService";

export function useGrondplan(grondplanId: number) {
    const {
        isLoading,
        isError,
        data: grondplan,
    } = useQuery(["grondplan", grondplanId], () => getGrondplan(grondplanId));

    return {
        isLoading,
        isError,
        grondplan
    }
}