import { Tsubscription } from "./subs.interfacer";
import { SubscriptionModel } from "./subs.model";

export const createSubcriptionService = async (data: Tsubscription) => {
    const checkBeffore = await SubscriptionModel.findOne({
        $and: [
            { planType: data.planType }
        ]
    })
    if (checkBeffore) {
        throw new Error('This plan already exists')
    }
    const createdSub = await SubscriptionModel.create(data)
    if (!createdSub) {
        throw new Error('Failed to create subscription')
    }
    return createdSub
}