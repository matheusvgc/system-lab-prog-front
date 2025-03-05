import { ICategory } from "./ICategory";

export interface IProduct {
    productId: string;
    product: {
        productId: string;
        productName: string;
        productDescription: string;
        productSumary: string;
        summary: string;
        manufacturer: string;
        brandName: string;
        category: ICategory;
    }
    price: number;
    image: string;
    description: string;
    category: ICategory;
}