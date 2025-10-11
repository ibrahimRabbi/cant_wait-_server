import { Router } from "express";
import { changeStatusAndDeleteReportUserController, getImageReportController, getSingleImageReportController, imageReportController } from "./imageReport.controller";
import { authentication } from "../../middleware/authentication";

export const imageReportRoute = Router()

imageReportRoute.post('/add-report',imageReportController)
imageReportRoute.get('/get-report', authentication, getImageReportController)
imageReportRoute.get('/get-single-report/:reportId', authentication, getSingleImageReportController)
imageReportRoute.patch('/change-status/:id', authentication, changeStatusAndDeleteReportUserController)