import { ICategory } from "./ICategory";
import { IReview } from "./IReview";

export interface IProduct {
    productSkuId: string;
    product: {
        productId: string;
        productName: string;
        productDescription: string;
        productSumary: string;
        summary: string;
        manufacturer: string;
        brandName: string;
        category: ICategory;
        reviews: IReview[];
    }
    price: number;
    productImage: string;
    description: string;
    category: ICategory;
}