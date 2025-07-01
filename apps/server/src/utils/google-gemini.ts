import { GoogleGenAI } from "@google/genai"

type message={
    text:string
}
type Content={
    role:"user" | "System",
    parts:message[]
}

interface GenerateContentRequest{
    contents:Content[],
    systemInstruction:string

}

class GeminiAI{

    private readonly systemMessage?:string;
    private readonly ai:GoogleGenAI;

    constructor(apiKey:string,systemMesage?:string){
     
        this.ai = new GoogleGenAI({apiKey})
        this.systemMessage = systemMesage
    }

    async Invoke(content:string){

        try{

           const response = await this.ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents:content,
            
           });

           console.log(response.candidates);

           return response?.candidates![0].content?.parts![0].text?.replace('```',"").replace("json\n","");




           
        }catch(error){  
            console.log(error);
            throw new Error("Could not generate response from AI");

        }


    }


}



export default GeminiAI; 