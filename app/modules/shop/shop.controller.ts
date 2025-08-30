import { RequestHandler } from "express";
import { catchAsync } from "../../helper/catchAsync";
import status from "http-status";
import { addProductServices, deleteProductServices, getAllProductServices, getSingleProductServices, updateProductServices } from "./shop.services";




export const addProductController:RequestHandler = catchAsync(async (req,res) => {
   
    if(req.user?.role !== 'admin'){
        res.status(status.UNAUTHORIZED).json({
            sucess:false,
            status:status.UNAUTHORIZED,
            message:"You are not authorized to add product"
        })
    }

    const productAdded = await addProductServices(req.body)
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product added successfully",
        data:productAdded
    })
     
})

export const updateProductController:RequestHandler = catchAsync(async (req,res) => {
   
    if(req.user?.role !== 'admin'){
        res.status(status.UNAUTHORIZED).json({
            sucess:false,
            status:status.UNAUTHORIZED,
            message:"You are not authorized to update product"
        })
    }

    const productAdded = await updateProductServices(req.params?.id ,req.body)
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product updated successfully",
        data:productAdded
    })
     
})

export const deleteProductController:RequestHandler = catchAsync(async (req,res) => {
   
    if(req.user?.role !== 'admin'){
        res.status(status.UNAUTHORIZED).json({
            sucess:false,
            status:status.UNAUTHORIZED,
            message:"You are not authorized to delete product"
        })
    }
    const productAdded = await deleteProductServices(req.params?.id)
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product updated successfully",
        data:productAdded
    })
     
})


export const getAllProductController:RequestHandler = catchAsync(async (req,res) => {
   
    const getAllProducts = await getAllProductServices()
    if(!getAllProducts){
        throw new Error('faild to get products')
    }
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Products retrive successfully",
        data:getAllProducts
    })
     
})


export const getSingleProductController:RequestHandler = catchAsync(async (req,res) => {
   
    const getAllProducts = await getSingleProductServices(req)
    res.status(status.OK).json({
        sucess:true,
        status:status.OK,
        message:"Product retrive successfully",
        data:getAllProducts
    })
     
})