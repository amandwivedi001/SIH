import { commuterRegistration, verifyOtp } from "../controllers/auth.controller.js";
import { Router } from 'express';


const authRoute = Router();

authRoute.route("/send-otp").post(commuterRegistration);
authRoute.route("/verify-otp").post(verifyOtp);

export { authRoute };