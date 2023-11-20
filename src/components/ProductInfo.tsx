import {Prod} from "../model/Prod";

interface ProductInfoProps {
    product: Prod;
    showName: boolean;
    showPrice: boolean;
    showPromo: boolean;
    showPositie: boolean;
}

export function ProductInfo({product, showName, showPrice, showPromo, showPositie}: ProductInfoProps) {
    return (
        <div className="productInfo">
            {showName && <h1>{product.name}</h1>}
            {showPositie && <div>Positie: {product.id}</div>}
            {showPrice && <div>Prijs: €{product.price}</div>}
            {<div>Voorraad: {product.voorraad}</div>}
            {showPromo && <div>{product.promo.toString() === "true" ? <p>In promotie</p> :
                <p>Geen promotie</p>}</div>}
        </div>
    )
}