import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { iUserData } from "../../../store/user/type";
import { useAppDispatch } from "../../../store/useRedux";
import { getUserByName } from "../../../store/user/asyncReducer";

interface AutocompleteUsersProps{
    onChange?: (event: any, newValue: iUserData | null) => void,
    value?: iUserData
}

export default function AutocompleteUsers(props: AutocompleteUsersProps) {
    const dispatch = useAppDispatch();

    const [users, setUsers] = useState<iUserData[]>([]);

    const changeInput = (_: object, newInputValue: string) => {
        if (newInputValue.length >= 2) {
            dispatch(getUserByName(newInputValue)).unwrap().then(resp => {
                setUsers(resp);
            }).catch(() => {
                setUsers([]);
            })
        } else {
            setUsers([]);
        }
    }

    return (
        <Autocomplete
            value={props.value}
            options={users}
            noOptionsText='Пусто'
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) =>
                option.id == value.id
            }
            onInputChange={changeInput}
            renderInput={(params) => <TextField  {...params} label={'ФИО'} placeholder={'Введите ФИО'} />}
            renderOption={(props, option, _) => (
                <li {...props} key={option.id}>
                    <span>{option.name}</span>
                </li>
            )}
            onChange={props.onChange}
        />
    )
}