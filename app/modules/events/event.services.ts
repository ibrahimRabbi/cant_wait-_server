import { Tevent } from "./event.interface"
import { EventModel } from "./event.model"




export const createEventServices = async (data: Tevent) => {
    const event = await EventModel.create(data)
    if(!event){
        throw new Error("Event creation failed")
    }
    return event
}

export const updateEventServices = async (id: string, data: Partial<Tevent>) => {
    const event = await EventModel.findByIdAndUpdate(id, data, { new: true, runValidators: true ,context:'query'})
    if(!event){
        throw new Error("Event update failed")
    }
    return event
}

export const deleteEventServices = async (id: string) => {
    const event = await EventModel.findByIdAndUpdate(id, {isDeleted:true}, { new: true})
    if(!event){
        throw new Error("Event deleted failed")
    }
    return event
}