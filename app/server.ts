import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { createServer } from "http"
import { Server } from "socket.io"
import { socketCors } from "./lib/socketCors"
import { envData } from "./config/envData"
import { userRouter } from "./modules/user/user.route"
import { conversationController } from "./modules/conversation/conversation.controller"
 


const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, socketCors);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', userRouter)







async function main() {
    await mongoose.connect(envData.dbUrl as string);

    app.get("/", (req, res) => {
        res.send("hello world your are conneted with server")
    })

    io.on("connection", (socket) => {
        console.log("A user connected");

       conversationController(io,socket)

        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

}

main()




httpServer.listen(envData.port, () => {
    console.log("Server is on http running on port 5000")
})