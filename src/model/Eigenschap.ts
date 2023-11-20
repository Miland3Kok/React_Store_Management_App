export interface Eigenschap {
    "id": number;
    "product_id": number;
    "eigenschap": string;
    "waarde": string;
}

export type EigenschapData = Omit<Eigenschap, "id" | "product_id">;