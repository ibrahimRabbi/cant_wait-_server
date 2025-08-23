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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socketCors_1 = require("./lib/socketCors");
const envData_1 = require("./config/envData");
const user_route_1 = require("./modules/user/user.route");
const conversation_controller_1 = require("./modules/conversation/conversation.controller");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, socketCors_1.socketCors);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', user_route_1.userRouter);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(envData_1.envData.dbUrl);
        app.get("/", (req, res) => {
            res.send("hello world your are conneted with server");
        });
        io.on("connection", (socket) => {
            console.log("A user connected");
            (0, conversation_controller_1.conversationController)(io, socket);
            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });
    });
}
main();
httpServer.listen(envData_1.envData.port, () => {
    console.log("Server is on http running on port 5000");
});
