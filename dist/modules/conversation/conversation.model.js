"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users', required: true },
    text: { type: String, required: true }
}, { timestamps: true });
const conversationSchema = new mongoose_1.Schema({
    members: { type: [mongoose_1.Schema.Types.ObjectId], required: true },
    messages: { type: [messageSchema], required: true },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
exports.conversationModel = (0, mongoose_1.model)("conversations", conversationSchema);
