import {trpcClient} from '../api/trpc';

export async function uploadFiles(cv: File, jd: File) {

    try {
        const formData = new FormData();
        formData.append("jd", jd);
        formData.append("cv", cv);

        const textResponse = await fetch("http://localhost:4000/upload", {
            method: "POST",
            body: formData
        });

        const fileText = await textResponse.json();
        console.log(fileText);
        return {
             result:true,
            cvText: fileText.data.cvText,
            jdText: fileText.data.jdText
        }

    } catch (error: unknown) {

        return {
            result:false,
            message:(error as {message:string}).message
        };

    }

}

export async function analyzeData(cvText: string, jdText: string) {
    try {

       const response = await  trpcClient.analyze.analyzeTexts.mutate({
            cvText,jdText
        });

        if(!response.result){
            return {
                result:response.result,
                message:"Could not analyze the documents"
            }
        }
        console.log("analysis:",response);
        return {
            result:true,
            summary:response.data
        }
        






    } catch (error: unknown) {
        console.log(error);
        return{
            result:false,
            message:"Could not generate summary"
        };
    }
}