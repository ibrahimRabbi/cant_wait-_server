import { Types } from "mongoose"

export type Trating = {
    rating : number,
    message : string,
    userId : Types.ObjectId
}

export type Tproduct = {
    title:string,
    price:number,
    description:string,
    image:string,
    sizes:string[],
    colors:string[],
    gender: 'male' | 'female' | 'unisex',
    // inStock:number,
    tags?:string[];
    rating?: Trating[];
    isDeleted:boolean
}