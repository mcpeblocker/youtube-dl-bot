import { Context, InputFile } from "grammy";
import download from "ytdl-core";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

export const dl = async (ctx: Context) => {
  let link = String(ctx.match);

  let fileId = uuid();
  let filePath = path.join(__dirname, `../../files/${fileId}.mp4`);
  download(link)
    .pipe(fs.createWriteStream(filePath))
    .once("finish", () => {
        ctx.replyWithVideo(
            new InputFile(filePath)
        );
    });
};
