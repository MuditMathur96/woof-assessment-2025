// /apps/server/src/routers/analyze.ts

import { router, publicProcedure } from '../../../../../packages/trpc';
import { z } from 'zod';
import { ai, responseGenerator } from '../../utils';
import { getAnalyzerPrompt } from '../../utils/prompt-generator';

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
 

      try{
        const aiResponse = await ai.Invoke(getAnalyzerPrompt(prompt));
        const response = JSON.parse(aiResponse.replace("```json\n","").replace("```",""));
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
