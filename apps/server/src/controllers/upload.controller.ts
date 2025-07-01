import { Request,Response } from "express";
import { generateErrorResponse, generateSuccessResponse } from "../utils/responseGenerator";
import PDFParser from 'pdf-parse';
import pdfReader from "../utils/pdf-reader";

export default class UploadController{

    async uploadFile(req:Request,res:Response){

        try{
              const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
                };
                const cvFile = files["cv"][0];
                const jdFile = files["jd"][0];

                if(!cvFile || !jdFile){
                     return generateErrorResponse(res,"Both CV and JD are required",400);
                }

                const cvText = await pdfReader.parse(cvFile.buffer)
                const jdText = await pdfReader.parse(jdFile.buffer);

                return generateSuccessResponse<{
                    cvText:string,jdText:string
                }>(res,
                    {cvText:cvText,jdText:jdText}
                );



        }catch(e){


        }


    }



}