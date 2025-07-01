
import type { Summary } from "@/App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";


type Props = {
    summary?:Summary,
    isOpen:boolean,
    onOpenChange:(value:boolean)=>void

}


function Bar({offset,score,color}:{offset:number,score:number,color:string}){

    const width = useMemo(()=>{
        if(score<=offset) return 0;
        return (score>=offset+25?100:score*100/(offset+25));
    },[offset,score])
    return (
        <div className={`h-full w-1/4  `}>
            <div className={`h-full`}
            style={{
                width:`${width}%`,
                backgroundColor:color
            }}
            
            ></div>
        </div>
    )
}
function MatchBars({score}:{score:number}){

    return (
    <div>
        <h2 className="md:*:text-xl font-semibold">Match Score: {score}</h2>
        <div className="flex gap-1">
          <div className="w-full h-2 rounded-full overflow-hidden flex border bg-gray-200 gap-[1px] ">
                
                <Bar  offset={0} score={score} color="#ffa2a2"  />
                <Bar offset={25} score={score} color="#ffb86a"/>
                <Bar  offset={50} score={score} color="#8ec5ff"/>
                <Bar  offset={75} score={score} color="#7bf1a8"/>
          </div>

        </div>
    </div>

    )
}

function CollapsibleList({list,title}:{list:string[],title:string}){

    const [isOpen,setIsOpen] = useState<boolean>(false);
    return (<div>
        {/* Header or Title */}
        <div 
        onClick={()=>setIsOpen(prev=>!prev)}
        className="flex gap-2 items-center justify-between bg-gray-100 p-2">
        <h3 className="text-lg">{title} </h3>
        <ChevronDown className={`${isOpen?"rotate-180":""}`}></ChevronDown>
        </div>
        {/* List */}
        <div className={`duration-200 ${isOpen?"":"hidden"} overflow-hidden`}>
            <ul className="!list-disc p-2 text-left">
            {list.map((text,i)=><li key={i}><p>{i+1}. {text}</p></li>)}
            </ul>
        </div>

    </div>)



}

function SummaryDialog({summary,isOpen,onOpenChange}:Props){

return (<Dialog
open={isOpen}
onOpenChange={(v)=>onOpenChange(v)}
>
  <DialogContent
  className=""
  >
    <DialogHeader>
      <DialogTitle className="text-md md:text-lg">Candidate Result - {summary?.name}</DialogTitle>
      <hr />
      <DialogDescription
      
      >
            <div className="flex flex-col gap-2 max-h-[70vh] overflow-auto">
                <div className="flex  md:flex-row flex-col justify-between items-center">
                    <div 
                    className="w-full md:w-[60%]"
                    >
                    <MatchBars score={summary?.matching_score || 0} />
                    </div>
                    <h3 className="md:text-lg  font-semibold">
                        <span
                        className=""
                        >Verdict</span>
                        -{summary?.verdict}</h3>
                </div>
                <p>{summary?.verdict_reason}</p>
                <CollapsibleList 
                title="Strengths"
                list={summary?.strengths || []}
                />
                
                <CollapsibleList
                title={"Weaknesses"}
                list={summary?.weakness || []}
                />
            </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>)




}

export default SummaryDialog;