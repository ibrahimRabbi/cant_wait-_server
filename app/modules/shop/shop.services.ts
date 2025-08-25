import { Request } from "express"
import { Tproduct } from "./shop.interface"
import { ProductModel } from "./shop.model"





export const addProductServices = async (product: Tproduct) => {

    const checkProduct = await ProductModel.findOne({ $and: [{ title: product.title }, { category: product.category }, { color: { $in: product.color } }, { size: { $in: product.size } }, { price: product.price }] })
    if (checkProduct) {
        throw new Error("this Product already exists")
    }

    const productAdded = await ProductModel.create(product)
    if (!productAdded) {
        throw new Error("Failed to add product")
    }

    return productAdded
}




export const updateProductServices = async (id: string, product:Partial<Tproduct>) => {

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, product, { new: true, runValidators: true, context: 'query'})
    if (!updatedProduct) {  
        throw new Error("Failed to update product")
    }
    return updatedProduct
}

export const deleteProductServices = async (id: string) => {

    const updatedProduct = await ProductModel.findByIdAndUpdate(id,{isDeleted:true}, { new: true})
    if (!updatedProduct) {  
        throw new Error("Failed to update product")
    }
    return updatedProduct
}


export const getAllProductServices = async () => {

    const products = await ProductModel.find({isDeleted:{$ne:true}})
    if (!products) {  
        throw new Error("Failed to get products")
    }
    return products
}


export const getSingleProductServices = async (req:Request) => {

    const products = await ProductModel.findById(req.params?.productId)
    if (!products) {  
        throw new Error("Failed to get products")
    }
    return products
}