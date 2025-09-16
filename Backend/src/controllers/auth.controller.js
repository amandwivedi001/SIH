import db from "../models/index.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiErrors.js"
import { generateOtp } from "../models/otp.model.js"
import { sendOtpSms } from "../utils/sms.service.js"
import { isMatchOtp } from "../models/otp.model.js"
import jwt from "jsonwebtoken"
import { sendOtpEmail } from "../utils/email.service.js"

const commuterRegistration = asyncHandler( async (req, res) => {


    const {phone, email} = req.body;

    console.log(phone, email);

    if (!phone)
        throw new ApiError(400, "Phone number is required!");

    if (!email)
        throw new ApiError(400, "Email is required!");

    if (phone.length != 10)
        throw new ApiError(401, "Enter a valid phone number!");

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + (10 * 60 * 1000))

    console.log(otp);
    

    if (!otp || otp.length != 6)
        throw new ApiError(500, "OTP generation error!");

    // 2 Scenarios otp already exist or new otp to write on db
    const existingOtp = await db.Otp.findOne({ where: { email } });
    if (existingOtp)
        await existingOtp.update({ otp, expiresAt });
    else
        await db.Otp.create( { email, otp, expiresAt });

    // await sendOtpSms(otp, phone);
    await sendOtpEmail(email, otp);

    return res.status(201).json(
        new ApiResponse(200, existingOtp, "OTP sent successfully!")
    )

})

const verifyOtp = asyncHandler (async (req, res) => {
/*
    take phone, otp from commuter
    search otp for particular phone number and checks the otp
    if otp correct creat db of commuter with phone number
    destroy otp
    give jwt token
*/

    const {phone, email, otp} = req.body;

    if (!otp || otp.length != 6)
        throw new ApiError(400, "Enter a valid OTP!");

    if (!email)
        throw new ApiError(501, "Frontend doesn't send email to server!");

    const otpRecord = await db.Otp.findOne({ where: { email } });

    if (!otpRecord)
        throw new ApiError(404, "OTP not found or expired!");

    if (new Date() > otpRecord.expiresAt){
        await otpRecord.destroy();
        throw new ApiError(410, "OTP has expired");
    }

    const isCorrectOtp = await isMatchOtp(otp, otpRecord.otp);

    if (!isCorrectOtp)
        throw new ApiError(403, "Invalid OTP!");

    await otpRecord.destroy();

    // Find or create the commuter
    const [commuter, created] = await db.Commuter.findOrCreate({
      where: { email },
      defaults: { email, phone },
    });

    //TODO: token handling
    const token = jwt.sign(
      { id: commuter.commuter_id, phone: commuter.phone },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return res.status(201).json(
        new ApiResponse(200, {token, commuter}, "Login Successfully!")
    )
    
})


export { commuterRegistration, verifyOtp}


