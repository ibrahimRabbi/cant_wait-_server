import { Types } from "mongoose"

export type Trating = {
    rating : number,
    comment : string,
    userId : Types.ObjectId
}

export type Tproduct = {
    title:string,
    price:number,
    description:string,
    image:string,
    size:string[],
    color:string[],
    category:string,
    gender: 'male' | 'female' | 'unisex',
    inStock:number,
    tags?:string[];
    rating?: Trating[];
    isDeleted:boolean
}