import { RootState } from "../store";
import { messagesAdapter } from "./type";

export const messagesSelectors = messagesAdapter.getSelectors((state: RootState) => state.messages.messages)
