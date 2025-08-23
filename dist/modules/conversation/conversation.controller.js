"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationController = void 0;
const conversation_model_1 = require("./conversation.model");
const conversationController = (io, socket) => {
    socket.on('checkingAndjoinConversationRoom', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const messageData = { sender: payload.senderId, text: payload.text };
        const data = {
            members: [payload.senderId, payload.reciverId],
            messages: [messageData]
        };
        const checkExistancy = yield conversation_model_1.conversationModel.findOne({
            members: { $all: [payload.senderId, payload.reciverId] }
        });
        if (!checkExistancy) {
            const createCoversation = yield conversation_model_1.conversationModel.create(data);
            socket.join(createCoversation._id.toString());
            socket.emit("joinedConversationRoom", createCoversation._id);
        }
        else {
            socket.join(checkExistancy._id.toString());
            socket.emit("joinedConversationRoom", checkExistancy._id);
        }
    }));
    socket.on('getMessage', (converSId) => __awaiter(void 0, void 0, void 0, function* () {
        const findConversation = yield conversation_model_1.conversationModel.findById(converSId);
        if (findConversation) {
            socket.emit("loadMessage", findConversation.messages);
        }
    }));
    socket.on('sendMessage', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const messageData = { sender: payload.sender, text: payload.text };
        const updated = yield conversation_model_1.conversationModel.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.conversationId, { $push: { messages: messageData } }, { new: true });
        console.log("updated", updated);
        if (updated) {
            io.to(payload === null || payload === void 0 ? void 0 : payload.conversationId).emit("receiveMessage", messageData);
        }
    }));
};
exports.conversationController = conversationController;
