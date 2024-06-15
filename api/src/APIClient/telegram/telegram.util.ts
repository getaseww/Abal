export const TELEGRAM_API:string = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;
export const URI = `/webhook/${process.env.TELEGRAM_TOKEN}`;
export const WEBHOOK_URI = process.env.SERVER_URL + URI;
