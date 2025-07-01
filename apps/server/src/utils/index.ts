import PdfReader from "./pdf-reader";
import * as ResponseGenerator from './responseGenerator';
import GoogleAI from './ai';
import Configs from "../configs/configs";


export const ai = new GoogleAI(Configs.WOOLF_GEMIN_ENDPOINT,Configs.WOOLF_GEMINI_TOKEN);
export const responseGenerator= ResponseGenerator;
export const pdfReader =PdfReader;


