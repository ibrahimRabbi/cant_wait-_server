import { Server, Socket } from "socket.io";
import { conversationModel } from "./conversation.model";
import { Tconversations, Tmessage } from "./conversation.interface";
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../helper/catchAsync";
import { Tuser } from "../user/user.interface";


export const conversationController = (io: Server, socket: Socket) => {

    socket.on('checkingAndjoinConversationRoom', async (payload) => {
 
        const messageData: Tmessage = { sender: payload.senderId, text: payload.text }
        const data: Tconversations = {
            members: [payload.senderId, payload.reciverId],
            messages: payload.text ? [messageData] : []
        }
        const members = [payload.senderId, payload.reciverId].sort();
        const checkExistancy = await conversationModel.findOne({ members: { $all: members } })

        if (!checkExistancy) {
            const createCoversation = await conversationModel.create(data)
            socket.join(createCoversation._id.toString())
            socket.emit("joinedConversationRoom", createCoversation._id)
        } else {
            socket.join(checkExistancy._id.toString())
            socket.emit("joinedConversationRoom", checkExistancy._id)
        }
    })


    socket.on('getMessage', async (converSId) => {
        const findConversation = await conversationModel.findById(converSId)

        if (findConversation) {
            socket.emit("loadMessage", findConversation.messages);
        }

    })



    socket.on('sendMessage', async (payload) => {

        const messageData: Tmessage = { sender: payload.sender, text: payload.text }

        const updated = await conversationModel.findByIdAndUpdate(
            payload?.conversationId,
            { $push: { messages: messageData } },
            { new: true }
        )

        if (updated) {
            io.to(payload?.conversationId).emit("receiveMessage", messageData);
        }



    })

}


export const getAllConversationController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const checkExistancy = await conversationModel.find({ members: req.query.userId }).populate('members')

    if (!checkExistancy) {
        throw new Error("conversation not Found")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "Product added successfully",
        data: checkExistancy
    })
})


export const getAllActiveUserController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

   
    const activeUser: Tuser[] = []
    const checkExistancy = await conversationModel.find({ members: req.user._id }).populate('members').select('members')
    checkExistancy.forEach((doc: any) => {
        const opponentUser = doc.members.filter((member: any) => member?._id.toString() !== req.user._id.toString()
        );
        activeUser.push(...opponentUser)

    });
    const findActiceUsers = activeUser.filter(v=>v?.isActive)
    




    if (!checkExistancy) {
        throw new Error("conversation not Found")
    }
    res.status(status.OK).json({
        sucess: true,
        status: status.OK,
        message: "active user retrive successfully",
        data: findActiceUsers
    })
})

