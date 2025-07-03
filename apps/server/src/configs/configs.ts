import dotenv from 'dotenv';
dotenv.config();

class Configs{

    public static PORT:string = process.env.PORT || "4000";
    public static FRONTEND_URL = process.env.FRONTEND_URL || "";
    public static WOOLF_GEMIN_ENDPOINT:string = process.env.WOOLF_GEMIN_ENDPOINT || "";
    public static WOOLF_GEMINI_TOKEN:string = process.env.WOOLF_GEMINI_TOKEN || "";
    public static GEMINI_API_KEY:string = process.env.GEMINI_API_KEY || "";

}

export default Configs;