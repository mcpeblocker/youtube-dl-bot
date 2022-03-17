import { Bot } from "grammy";
import * as process from 'process';

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error("Bot token must be provided");
}

const bot = new Bot(token);

export default bot;