import { bookEventRoute } from './../bookEvent/bookEvent.route';
import { Server, Socket } from "socket.io";
import { NotificationModel } from "./notification.model";
import { catchAsync } from "../../helper/catchAsync";
import { NextFunction, Request, Response } from "express";
import status from "http-status";

export const sendNotificationController = (io: Server, socket: Socket) => {

  socket.on('send_Notification', async (data) => {
    const pushNotificationInDB = await NotificationModel.create(data)

    if (data.userId && data.userId !== "all") {
      io.to(data.userId).emit("recive_notification", pushNotificationInDB);
    } else {
      socket.broadcast.emit("recive_notification", pushNotificationInDB);
    }
  })

}


export const getUserNotificationController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
  const checkExistancy = await NotificationModel.find({
    $or: [
      { userId: req?.user?._id.toString() },
      { userId: 'all' }
    ]
  });
 
  if (!checkExistancy) {
    throw new Error("faild to get notifications")
  }
  res.status(status.OK).json({
    sucess: true,
    status: status.OK,
    message: "notification retrive successfully",
    data: checkExistancy
  })
})