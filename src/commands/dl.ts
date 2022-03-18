import { Context, InputFile } from "grammy";
import { getInfo, getVideoID } from "ytdl-core";
import path from "path";
import fs from "fs";
import downloadQueue from "../process/download";

export const dl = async (ctx: Context) => {
  let link = String(ctx.match);
  const id = await getVideoID(link);

  let filePath = path.join(__dirname, `../../files/${id}.mp4`);

  if (fs.existsSync(filePath)) {
    let { message_id } = await ctx.reply("Uploading...");
    await ctx.replyWithDocument(new InputFile(filePath), {
    //   caption: `${info.videoDetails.title}`,
    });
    return await ctx.api.deleteMessage(ctx.chat!.id, message_id);
  }

  let { message_id } = await ctx.reply("Downloading...");
  await downloadQueue.add({ link, path: filePath });

  downloadQueue.on("completed", async (job, result) => {
    await ctx.api.editMessageText(ctx.chat!.id, message_id, "Downloaded");
    await ctx.api.editMessageText(ctx.chat!.id, message_id, "Uploading...");
    await ctx.replyWithDocument(new InputFile(filePath), {
    //   caption: `${info.videoDetails.title}`,
    });
    await ctx.api.deleteMessage(ctx.chat!.id, message_id);
  });
};
