import { Router } from "express";
import uploadRouter from '../../routes/rest/upload.route';

const router=  Router();

router.use("/upload",uploadRouter);


export default router;