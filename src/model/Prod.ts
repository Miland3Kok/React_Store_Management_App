export interface Prod {
    id: number;
    name: string;
    image: string;
    price: number;
    afdeling_id: number;
    afdeling_naam: string;
    omschrijving: string;
    promo: boolean;
    voorraad: number;
    min_voorraad: number;
}

export type ProdData = Omit<Prod, "id" | "afdeling_id">;