"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const express_1 = require("express");
const conversation_controller_1 = require("./conversation.controller");
exports.chatRouter = (0, express_1.Router)();
exports.chatRouter.post('/conversation', conversation_controller_1.conversationController);
