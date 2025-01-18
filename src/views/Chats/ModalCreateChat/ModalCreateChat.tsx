import { Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import ButtonSave from "../../UIpackv2/Buttons/ButtonSave/ButtonSave"
import AutocompleteUsers from "../../UIpackv2/AutocompleteUsers/AutocompleteUsers"
import { useState } from "react"
import { IcreateChatRequest } from "../../../store/chats/type"
import { iUserData } from "../../../store/user/type"
import { useAppDispatch } from "../../../store/useRedux"
import { createChat } from "../../../store/chats/asyncReducer"
import toast from "react-hot-toast"
import ButtonBack from "../../UIpackv2/Buttons/ButtonBack/ButtonBack"

interface ModalCreateChatProps {
    open: boolean,
    handleClose: () => void,
}

export default function ModalCreateChat(props: ModalCreateChatProps) {
    const dispatch = useAppDispatch();
    
    const [data, setData] = useState<IcreateChatRequest>({
        user_id2: 0,
        message: '',
    });

    const handleChangeUser = (_: any, newValue: iUserData | null) => {
        if (newValue) {
            setData({ ...data, user_id2: newValue.id });
        } else {
            setData({ ...data, user_id2: 0 });
        }
    }

    const saveChat = () => {
        if(!!data.message && data.message.length > 0){
            dispatch(createChat(data));
            props.handleClose();
        }else{
            toast.error("Введите сообщение!");
        }
    }

    return (
        <Dialog open={props.open} fullWidth>
            <DialogTitle>
                Новое сообщение
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ py: 2 }}>
                    <AutocompleteUsers onChange={handleChangeUser} />
                    <TextField
                        label='Ваше сообщение'
                        multiline
                        rows={3}
                        value={data.message}
                        onChange={event => setData({ ...data, message: event.target.value })}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <ButtonBack onClick={props.handleClose}>Отмена</ButtonBack>
                <ButtonSave onClick={saveChat}>
                    Отправить
                </ButtonSave>
            </DialogActions>
        </Dialog>
    )
}