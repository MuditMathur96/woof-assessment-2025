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

class GeminiVertexAI{

    private readonly endpoint:string;
    private readonly authToken:string;
    private readonly systemMessage?:string;

    constructor(endpoint:string,authToken:string,systemMesage?:string){
        this.endpoint = endpoint;
        this.authToken = authToken;
        this.systemMessage = systemMesage
    }

    getHeaders(){
        return {
            'Authorization': `${this.authToken}`,
        }
    }

    async Invoke(content:string):Promise<string>{

        try{

            const requestBody:GenerateContentRequest={
                systemInstruction:this.systemMessage || "You are an helpful AI agent",
                contents:[
                  
                    {
                        role:"user",
                        parts:[
                            {
                                text:content
                            }
                        ]
                    }
                ]
            }

            //console.log("Headers:",this.getHeaders())
            const response = await fetch(this.endpoint,{
                method:"POST",
                body:JSON.stringify(requestBody),
                headers:this.getHeaders()

            });
            const data = await response.json();
         
            return data.candidates[0].content.parts[0].text;

        }catch(error){  
            console.log(error);
            throw new Error("Could not generate response from AI");

        }


    }


}



export default GeminiVertexAI; 