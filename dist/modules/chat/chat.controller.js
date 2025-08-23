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
exports.registerChat = void 0;
const chat_model_1 = require("./chat.model");
const registerChat = (io, socket) => {
    socket.on('sender', (value) => __awaiter(void 0, void 0, void 0, function* () {
        const created = yield chat_model_1.Message.create({ text: value, sender: 'abc@gmail.com', createdAt: new Date() });
        if (!created) {
            throw new Error('faild');
        }
        socket.emit('recivedOwnMessage', created);
    }));
};
exports.registerChat = registerChat;
