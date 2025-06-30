import {Response} from 'express'
export function generateSuccessResponse<T>(res:Response,data:T,statusCode=200){

     res.status(statusCode).json({
        result:true,
        message:"Request processed successfully",
        data
    });



}

export function generateErrorResponse(res:Response,message:string,statusCode=500){

     res.status(statusCode).json({
        result:false,
        message,
        data:null,

    });


}