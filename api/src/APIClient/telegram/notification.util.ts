import axios from "axios";
import { TELEGRAM_API, URI, WEBHOOK_URI } from "./telegram.util";
import logger from "../../utils/loggers/winston";
import { TelegramAPIEndPoint } from "../../enums";

// import { TelegramAPIRequestType } from "../../constants/constants";



export const initTelegramBot = async () => {

  await axios
    .get(
      `${TELEGRAM_API}/${TelegramAPIEndPoint.SET_WEBHOOK
      }?url=${WEBHOOK_URI}`
    )
    .then((res) => {
      console.log("res", res)
      logger.info("Notification telegram bot webhook set");
    })
    .catch((error) => {
      logger.error("Failed to set notification telegram bot webhook", error);
    });
};

export const sendMessage = async (
  chat_id: number,
  message: string,
) => {
  await axios
    .post(`${TELEGRAM_API}/${TelegramAPIEndPoint.SEND_MESSAGE}`, {
      chat_id: chat_id,
      text: message,
    })
    .then((res) => {
      logger.info(`Notification telegram bot - ${res?.data?.toString()}`);
    })
    .catch((error) => {
      logger.info(`Notification telegram bot Erro`, error);
    });
};
