import PdfReader from "./pdf-reader";
import * as ResponseGenerator from './responseGenerator';
import GoogleAI from './google-gemini';
import Configs from "../configs/configs";


export const ai = new GoogleAI(Configs.GEMINI_API_KEY);
export const responseGenerator= ResponseGenerator;
export const pdfReader =PdfReader;


