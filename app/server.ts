import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { createServer } from "http"
import { Server } from "socket.io"
import { socketCors } from "./lib/socketCors"
import { envData } from "./config/envData"
import { conversationController, getAllConversationController } from "./modules/conversation/conversation.controller"
import { router } from "./routes"
import { globalErrorHandler } from "./middleware/globalErrorHandler"
import { notFound } from "./middleware/notFound"
import './helper/unbannedUser'
import { startUnbanJob } from "./helper/unbannedUser"
import { SubscriptionWillBeExpired } from "./helper/subscriptionExpire"
import { sendNotificationController } from "./modules/notification/notification.controller"
import { userModel } from "./modules/user/user.model"



const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, socketCors);


app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/api/v1', router)





async function main() {
    await mongoose.connect(envData.dbUrl as string);

    app.get("/", (req, res) => {
        res.send("hello world your are conneted with server")
    })
    startUnbanJob()
    SubscriptionWillBeExpired()

    io.on("connection", async (socket) => {

        try {
            const userId = socket.handshake.query.userId as string;
            socket.join(userId)
            
            console.log("A user connected with userId:", userId, "socketId:", socket.id);
          

            if (userId) {
                await userModel.findByIdAndUpdate(
                    userId,
                    { isActive: true },
                    { runValidators: true, context: "query" }
                );
            }

         
            conversationController(io, socket);
            sendNotificationController(io, socket);
 
            socket.on("disconnect", async () => {
                try {
                    if (userId) {
                        await userModel.findByIdAndUpdate(
                            userId,
                            { isActive: false },
                            { runValidators: true, context: "query" }
                        );
                    }
                    console.log("A user disconnected:", userId);
                } catch (err) {
                    console.error("Error on disconnect update:", err);
                }
            });

        } catch (err) {
            console.error("Error on connection:", err);
        }
    });


}

main()


app.use(globalErrorHandler)
app.use(notFound)




httpServer.listen(envData.port, () => {
    console.log("Server is on http running on port 5000")
})