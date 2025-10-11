import { Request } from "express";
import { imageHostToCloudinary } from "../../helper/imageHostToCloudinary";
import { Tevent } from "./event.interface"
import { EventModel } from "./event.model"




export const createEventServices = async (req: Request) => {

    const imageName = `cant_wait_${Math.random().toString().split('.')[1]}`
    const imagePath = req.file?.path || 'No event image uploaded';


    const image = await imageHostToCloudinary(imageName, imagePath as string)

    const data = {
        ...req.body,
        image: (image as unknown as { secure_url: string })?.secure_url || 'null',
    };
    const event = await EventModel.create(data)
    if (!event) {
        throw new Error("Event creation failed")
    }
    return event
}

export const updateEventServices = async (id: string, req: Request) => {

    const data = {
        ...req.body,
    };
    
    if (req.file) {
        const imageName = `cant_wait_${Math.random().toString().split('.')[1]}`
        const imagePath = req.file?.path || 'No event image uploaded';


        const image = await imageHostToCloudinary(imageName, imagePath as string)

        data.image = (image as unknown as { secure_url: string })?.secure_url || 'null'
    }

    const event = await EventModel.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' })
    if (!event) {
        throw new Error("Event update failed")
    }
    return event

}

export const deleteEventServices = async (id: string) => {
    const event = await EventModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    if (!event) {
        throw new Error("Event deleted failed")
    }
    return event
}