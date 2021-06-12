import { Context } from "koa";
import filesCollection from "../../../models/filesModels";
import path from 'path';
import mime from 'mime-types';
import fs from 'fs';

export const getFiles = async (ctx: Context) => {
  try {
    const { userId } = ctx.request.body as any;

    const files = await filesCollection.find({ userid: userId });

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      files:files,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getDefaultTemp = async (ctx: Context) => {
    const docPath = path.join(__dirname, 'default.docx');
        let mimeType = mime.lookup(docPath);
        const src = fs.createReadStream(docPath);
        ctx.response.set("content-type", mimeType);
        ctx.response.set("content-disposition", "attachment; filename=template.docx");
        ctx.body = src;
};

export const getFirstTemp = async (ctx: Context) => {
  try {
    const { userId } = ctx.request.body as any;

    const files = await filesCollection.find({ userid: userId });

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      files:files,
    };
  } catch (err) {
    console.log(err);
  }
};
