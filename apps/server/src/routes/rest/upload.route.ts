import { Router } from "express";
import uploadMiddleware from '../../middleware/upload.middleware';
import UploadController from "../../controllers/upload.controller";
import GeminiAI from "../../utils/google-gemini";
import { generateSuccessResponse } from "../../utils/responseGenerator";
import {ai} from '../../utils';

const router = Router();
const uploadController = new UploadController();












// const geminiAI = new GeminiAI(
//     "https://intertest.woolf.engineering/invoke",
//     "lUu8fRntxtRJCbf/CKv6kRI0b/aETxvl",
//     systemInstruction
// )

//const geminiAI = new GeminiAI("AIzaSyBkIMU-wYuoNsDuApohhWGnvOSB_XzbyMo");


router.post("/",
    uploadMiddleware.fields([{name:"cv",maxCount:1},{name:"jd",maxCount:1}]),
    uploadController.uploadFile
)

export default router;