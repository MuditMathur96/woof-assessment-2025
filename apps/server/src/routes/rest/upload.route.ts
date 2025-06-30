import { Router } from "express";
import uploadMiddleware from '../../middleware/upload.middleware';
import UploadController from "../../controllers/upload.controller";

const router = Router();
const uploadController = new UploadController();
router.post("/",
    uploadMiddleware.fields([{name:"cv",maxCount:1},{name:"jd",maxCount:1}]),
    uploadController.uploadFile
)

export default router;