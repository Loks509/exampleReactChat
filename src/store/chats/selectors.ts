import { RootState } from "../store";
import { chatsAdapter } from "./type";

export const chatsSelectors = chatsAdapter.getSelectors((state: RootState) => state.chats.chats)
