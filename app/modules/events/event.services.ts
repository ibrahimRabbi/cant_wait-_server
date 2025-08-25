import { Tevent } from "./event.interface"
import { EventModel } from "./event.model"

export const createEventServices = async (data: Tevent) => {
    const event = await EventModel.create(data)
    if(!event){
        throw new Error("Event creation failed")
    }
    return event
}