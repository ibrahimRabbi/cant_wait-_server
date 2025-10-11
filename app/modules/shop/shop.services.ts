import { Request } from "express"
import { Tproduct } from "./shop.interface"
import { ProductModel } from "./shop.model"
import { imageHostToCloudinary } from "../../helper/imageHostToCloudinary"


export const addProductServices = async (req:Request) => {
 
    const checkProduct = await ProductModel.findOne({
        $and: [
            { title: req?.body.title },
            { colors: { $in: req?.body.colors } },
            { sizes: { $in: req?.body.sizes } },
            { description: req?.body?.description },
            { price: req?.body.price }
        ]
    })
    if (checkProduct) {
        throw new Error("this Product already exists")
    }

    const imageName = `cant_wait_${Math.random().toString().split('.')[1]}`
    const imagePath = req.file?.path || 'No document1 uploaded';


    const image = await imageHostToCloudinary(imageName, imagePath as string)

    const data = {
        ...req.body,
        image: (image as unknown as {secure_url: string})?.secure_url || 'null',
    };

    const productAdded = await ProductModel.create(data)
    if (!productAdded) {
        throw new Error("Failed to add product")
    }

    return productAdded
}

export const updateProductServices = async (id: string, req:Request) => {
 const data = {
        ...req.body,
    };
    
    if (req.file) {
        const imageName = `cant_wait_${Math.random().toString().split('.')[1]}`
        const imagePath = req.file?.path || 'No event image uploaded';


        const image = await imageHostToCloudinary(imageName, imagePath as string)

        data.image = (image as unknown as { secure_url: string })?.secure_url || 'null'
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' })
    if (!updatedProduct) {
        throw new Error("Failed to update product")
    }
    return updatedProduct
}


export const deleteProductServices = async (id: string) => {

    const updatedProduct = await ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    if (!updatedProduct) {
        throw new Error("Failed to Delete product")
    }
    return updatedProduct
}
export const getAllProductServices = async (req: Request) => {

    const pageNumber: number = parseInt(req?.query?.page as string)
    const limitValue: number = parseInt(req.query?.limit as string)
    const skipValue = (pageNumber - 1) * limitValue
    const queries: any = { isDeleted: { $ne: true } }

    if (req.query.search) {
        const products = await ProductModel.find({
            $and: [
                { title: { $regex: req.query.search, $options: 'i' } },
                { isDeleted: { $ne: true } }
            ]
        }).skip(skipValue).limit(limitValue)
        return products
    }


    if (req.query.gender) {
        queries.gender = req.query.gender
    }

    if (req.query.price) {
        queries.price = { $gte: parseInt(req.query.price as string) }
    }

    const products = await ProductModel.find(queries).skip(skipValue).limit(limitValue)

    if (req.query.rating) {
        const products = await ProductModel.find({
            $and: [
                { 'rating.rating': { $gte: parseInt(req.query.rating as string) } },
                { isDeleted: { $ne: true } }
            ]
        }).skip(skipValue).limit(limitValue)
        return products
    }

    if (!products) {
        throw new Error("Failed to get products")
    }
    return products
}

export const getSingleProductServices = async (req: Request) => {

    const products = await ProductModel.findById(req.params?.productId)
    if (!products) {
        throw new Error("Failed to get products")
    }
    return products
}

export const addReviewProductServices = async (req: Request) => {

    req.body.userId = req.user._id
    const added = await ProductModel.findByIdAndUpdate(
        req.params?.productId,
        { $push: { rating: req.body } },
        { new: true, runValidators: true, context: 'query' }
    )

    if (!added) {
        throw new Error("Failed to Add review")
    }
    return added
}