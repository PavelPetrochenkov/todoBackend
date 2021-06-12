import { Context } from "koa";
import filesCollection from "../../../models/filesModels";
import { getSocket } from "../../../../server";
import { ObjectId } from "mongodb";
import tesseract from "node-tesseract-ocr"

export const addFile = async (ctx: Context) => {
  try {
    const { text, userId, number, date, desc, fields, file, name } = ctx.request.body as any;

    if (!text.length) {
      ctx.response.status = 400;
      ctx.body = {
        reason: "INVALID_TEXT",
        message: "Text cant be empty",
      };
    } else {
      const fileRes = await filesCollection.insertOne({
        userid: userId,
        text,
        number,
        date,
        desc,
        fields,
        file,
        name
      });

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        file: fileRes.ops[0],
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (ctx: Context) => {
  try {
    const { id } = ctx.request.body as any;

    await filesCollection.findOneAndDelete({
      _id:ObjectId(id),
    });

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      id,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateFile = async (ctx: Context) => {
  try {
    const { _id, ...opts } = ctx.request.body as any;

    await filesCollection.findOneAndUpdate({
      _id:ObjectId(_id),
      ...opts,
    });

    const file = await filesCollection.findOne({ _id: ObjectId(_id)});

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      file: file,
    };
  } catch (err) {
    console.log(err);
  }
};

export const checkPhoto = async (ctx: Context) => {
  try {
    const { file, lang} = ctx.request.body as any;
    const text = await tesseract
    .recognize(Buffer.from(file.split(',')[1], 'base64'), {lang:lang})
    .then((text) => {
      return text
      })

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        text,
      }
  } catch (err) {
    console.log(err);
  }
};
