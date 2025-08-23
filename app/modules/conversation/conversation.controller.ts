import { Server, Socket } from "socket.io";
import { conversationModel } from "./conversation.model";
import { Tconversations, Tmessage } from "./conversation.interface";


export const conversationController = (io: Server, socket: Socket) => {

    socket.on('checkingAndjoinConversationRoom', async (payload) => {

        const messageData: Tmessage = { sender: payload.senderId, text: payload.text }
        const data: Tconversations = {
            members: [payload.senderId, payload.reciverId],
            messages: [messageData]

        }

        const checkExistancy = await conversationModel.findOne({
            members: { $all: [payload.senderId, payload.reciverId] }
        })

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
        console.log("updated", updated);

        if (updated) {
            io.to(payload?.conversationId).emit("receiveMessage",messageData);
        }



    })


}