import {useQuery} from 'react-query';
import {getAfdelingen} from "../services/WinkelDataService";

export function useAfdelingen() {
    const {
        isLoading,
        isError,
        data: afdelingen,
    } = useQuery(["afdelingen"], getAfdelingen);

    return {
        isLoading,
        isError,
        afdelingen
    }
}