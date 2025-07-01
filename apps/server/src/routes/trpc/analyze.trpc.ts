// /apps/server/src/routers/analyze.ts

import { router, publicProcedure } from '../../../../../packages/trpc';
import { z } from 'zod';
import { ai, responseGenerator } from '../../utils';

export const analyzeRouter = router({
  analyzeTexts: publicProcedure
    .input(
      z.object({
        cvText: z.string().min(10),
        jdText: z.string().min(10),
      }),
    )
    .mutation(async ({ input }) => {
      // Call Gemini or any AI model here
      const { cvText, jdText } = input;

      const prompt = JSON.stringify({
        data: {
          cvText: cvText,
          jdText: jdText
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

      try{
        const aiResponse = await ai.Invoke(systemInstruction);
        const response = JSON.parse(aiResponse![0].content?.parts![0]?.text || "");
        return {
          result: true,
          data: response,
  
        }

      }catch(err:unknown){
        return {
          result:false,
          data:null,
          message:(err as {message:string}).message
        }
      }
    }),
});
