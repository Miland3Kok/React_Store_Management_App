import axios from "axios";
import {Plan} from "../model/plan";
import {Afdeling} from "../model/Afdeling";
import {Prod} from "../model/Prod";
import {Eigenschap} from "../model/Eigenschap";

export const getAfdelingen = async () => {
    const afdelingen = await axios.get<Afdeling[]>('/afdelingen');
    return afdelingen.data;
}

export const getGrondplan = async (id: number) => {
    const grondplan = await axios.get<Plan>(`/grondplannen/${id}`);
    return grondplan.data;
}

export const getProduct = async (id: number, afdelingId: number) => {
    const product = await axios.get<Prod>(`/producten/${id}`);
    if (product.data.id === id && product.data.afdeling_id === afdelingId) {
        return product.data;
    }
}

export const getEigenschappen = async (productId: number) => {
    const eigenschappen = await axios.get<Eigenschap[]>(`/eigenschappen`);
    return eigenschappen.data.filter(eigenschap => eigenschap.product_id === productId);
}

export const addEigenschap = (eigenschap: Omit<Eigenschap, "id">) => {
    return axios.post('/eigenschappen', eigenschap)
}