import { useParams } from "react-router-dom";
import useEffectAuth from "../../../core/hooks/useEffectAuth";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { getMessages } from "../../../store/messages/asyncReducer";
import { messagesSelectors } from "../../../store/messages/selectors";

export default function SelectedChat(){
    const { chatId } = useParams();
    const dispatch = useAppDispatch()

    const messages = useAppSelector(messagesSelectors.selectAll);
    const isLoading = useAppSelector(state => state.messages.loadingStatus) === 'loading';

    useEffectAuth(() => {
        dispatch(getMessages(Number(chatId)))
    }, [chatId])

    console.debug(messages)

    return (
        <>Выбранный чат</>
    )
}