import { Context } from "koa";
import tesseract from "node-tesseract-ocr"
import { createWorker } from 'tesseract.js';

const config = {
  lang: "rus",
}

const a = async (ctx: Context) => {
  try {
    const { file, lang} = ctx.request.body as any;
    
    const worker = createWorker({
      logger: (data) => console.log(data)
    });

    async function recognize() {
      const fileT = Buffer.from(file, 'base64');
      const langT = lang || 'rus';
      await worker.load();
      await worker.loadLanguage(langT);
      await worker.initialize(langT);
      const { data: { text } } = await worker.recognize(fileT);
      console.log(text);
      await worker.terminate();
      return text;
    }

    tesseract
    .recognize(Buffer.from(file, 'base64'), config)
    .then((text) => {
    console.log("Result:", text)
  })
  .catch((error) => {
    console.log(error.message)
  })
  } catch (err) {
    console.log(err);
  }
};


export default a;
