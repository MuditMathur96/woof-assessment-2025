import { useState } from "react";
import UploadComp from "./components/pages/upload-comp"
import { Button } from "./components/ui/button";
import { Loader, Sparkles } from "lucide-react";
import SummaryDialog from "./components/summary/summary-dialog";
import { analyzeData, uploadFiles } from "./api/api";


export type Summary={
    name:string,
    strengths:string[],
    weakness:string[],
    matching_score:number,
    verdict:string,
    verdict_reason:string

}
type FileState ={
  jd:File | null,
  cv: File | null
}


function App() {

  const [fileData,setFileData] = useState<FileState>({
    jd:null,
    cv:null
  });
  
  const [loading,setLoading] = useState<boolean>(false);

  const [summary,setSummary] = useState<Summary | null>(null);
  const[ isDialgOpen,setIsDialogOpen] = useState<boolean>(false);

  async function handleSubmit(){

    if(!fileData.cv || !fileData.jd){
      alert("Please upload valid files");
      return;
    }
    setLoading(true);
    

    try{

      const fileText = await uploadFiles(fileData.cv,fileData.jd);

      console.log(fileText);
      if(!fileText.result){
        alert("Error in uploading files:"+fileText.message);
        return;
      }

      const summaryData = await analyzeData(fileText.cvText,fileText.jdText);

      if(!summaryData.result){
         
        alert("Error in generating summary");
        return;
      }   

      setSummary(summaryData.summary);
      setIsDialogOpen(true);
    }catch(error:unknown){
      console.log((error as {message:string}).message)
    }finally{

      setLoading(false);
    }




  }


  return (
    <>
      <form >
        <div 
        className=" flex flex-col md:flex-row  items-center justify-center gap-5 p-12">
          
          <UploadComp
          className="h-[200px] "
          value={fileData.jd}
          accept=".pdf"
          disabled={loading}
          onFilesChange={(file)=>setFileData(prev=>({...prev,jd:file}))}
          />
          <UploadComp
          className="h-[200px] "
          value={fileData.cv}
          accept=".pdf"
          disabled={loading}
          onFilesChange={(file)=>setFileData(prev=>({...prev,cv:file}))}
          />

        </div>

        <div
        className="flex items-center justify-center"
        >
          <Button
          onClick={handleSubmit}
          disabled = {loading || !fileData.cv || !fileData.jd}
          size={"lg"}
          >
            {loading?<Loader className="animate-spin" />
            :<Sparkles />}
            {loading?"Analyzing":"Analyze"}</Button>
        </div>

        <SummaryDialog 
        isOpen={isDialgOpen}
        onOpenChange={(v)=>setIsDialogOpen(v)}
        summary={summary || undefined}
         
        />

      </form>
    </>
  )
}

export default App
