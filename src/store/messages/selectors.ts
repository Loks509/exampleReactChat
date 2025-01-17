import { RootState } from "../store";
import { messagesAdapter } from "./initialState";

export const messagesSelectors = messagesAdapter.getSelectors((state: RootState) => state.messages)
