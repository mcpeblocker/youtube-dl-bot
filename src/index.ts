// dotenv
import { config } from "dotenv";
config();

import { dl } from "./commands/dl";

import bot from "./core/bot";

bot.command("start", (ctx) => {
  ctx.reply("Hi. I'm Youtube Downloader bot created using grammy.dev");
});

bot.command('dl', dl);

bot.start();

(async () => {
  await bot.init();
  console.log(`Bot @${bot.botInfo.username} started`);
})();
