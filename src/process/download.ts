import Bull from "bull";
import download from "ytdl-core";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

const downloadQueue = new Bull("download", {
  redis: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
  },
});

downloadQueue.process((job, done) => {
  const link = job.data.link;
  const filePath = job.data.path;

  const fileStream = fs.createWriteStream(filePath);
  download(link).pipe(fileStream);
  fileStream.once("finish", () => {
    done();
  });
});

export default downloadQueue;
