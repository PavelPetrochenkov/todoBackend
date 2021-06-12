import Router from "koa-router";
import { addFile, updateFile, checkPhoto, deleteFile } from "./file";
import { getFiles, getDefaultTemp, getFirstTemp} from "./fileTodos";

export default function a() {
  let  filesRouter: Router = new Router();

  filesRouter.post("/file/all", getFiles);

  filesRouter.get("/file/temp-default", getDefaultTemp);

  filesRouter.get("/file/temp-first", getFirstTemp);

  filesRouter.post("/file/", addFile);
  
  filesRouter.post("/file/change", updateFile);

  filesRouter.post("/file/photo", checkPhoto);

  filesRouter.post("/file/delete", deleteFile);

  return [filesRouter.routes(), filesRouter.allowedMethods()];
}
