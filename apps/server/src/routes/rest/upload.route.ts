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

router.post("/analyze",async(req,res)=>{

    const data = req.body;
    console.log("body: ",data)
    const prompt = JSON.stringify({
        data: {
            cvText:data.cvText,
            jdText:data.jdText
        }
    });


    const systemInstruction = `You are an expert job recruiter

You are tasked with analyzing job description and resume or cv of candidate given in the data object

List down the strengths and weakness of the candidate and rate the candidate between 0 to 100 and give the final verdict if the candidate is a good match for the job or not.



Give the output in JSON format
Do not add extra characters or line breaks 
example:{

name: string //candidate name

verdict: "Reject" | "Borderline | "Shortlist" | "Ideal",
verdict_reason: "string"  // explain in 1 or 2 explanation for verdict

matching_score: 45 (0-100)

strengths: string[], // array of string containing strength points (maximum 6)
 
weakness: string[] //array of string containg weakness (maximum 6)
}


data: ${prompt}
}`
    const response =await  ai.Invoke(systemInstruction);
    console.log(response);
    return generateSuccessResponse(res,
        JSON.parse(response)
    );
});

export default router;