import { Router } from "express";
import { createSettingsController, updateSettingsController} from "./settings.controller";
import { authentication } from "../../middleware/authentication";

export const settingsRouter = Router()

settingsRouter.post("/create-setting", authentication, createSettingsController);

settingsRouter.patch("/update-setting", authentication, updateSettingsController)