import { Category } from "./category";

export class Product {
    public id!:number;
    public productName!: string;
    public valueInStock!: number;
    public description!: string;
    public imgName!: string;
    public category!: Category;
    public price!: number;
}