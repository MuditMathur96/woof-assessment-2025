import PdfReader from "./pdf-reader";
import * as ResponseGenerator from './responseGenerator';
import GoogleAI from './ai';
import Configs from "../configs/configs";

/**
 * Default export of utils
 * Allows code to be decoupled and easly replacable if required
 * Can be mocked during unit testing
 */
export const ai = new GoogleAI(Configs.WOOLF_GEMIN_ENDPOINT,Configs.WOOLF_GEMINI_TOKEN);
export const responseGenerator= ResponseGenerator;
export const pdfReader =PdfReader;


