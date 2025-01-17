//@ts-nocheck временно, надо убирать ошибки

import { useEffect, useRef } from "react";
import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { checkSign, getSign } from "../../../../store/sign/reducer";
import { Isign } from "../../../../store/sign/type";
import { IUser } from "../../../../store/user/type";
import { getUserById } from "../../../../store/user/userReducer";
import { getDateFromUnix, getFormatDateFromUnix } from "../../../../features/functions";

type ButtonIconSignProps = {
    iconButtonSlot: IconButtonProps,
    tooltipSlot: {
        title?: TooltipProps['title'],
        onOpen?: TooltipProps['onOpen'],
        enterDelay?: TooltipProps['enterDelay']
    },
    getData: () => string,
    signId: number
}

export default function ButtonIconCheckSign(props: ButtonIconSignProps) {
    const dispatch = useDispatch();
    const sign = useSelector(state => state.sign.entities)[props.signId] as Isign | undefined;
    const user = useSelector(state => state.user.entities)[sign?.user_id] as IUser | undefined;

    const _getSign = () => {
        if (!sign)
            dispatch(getSign(props.signId));
    }
    const _checkSign = ()=>{
        dispatch(checkSign({id_sign: props.signId, text: props.getData()}));
    }

    const title = (props.tooltipSlot.title || "Проверить подпись") + ". " + (user ? user.shortName : "...") + ". " + (sign?.date ? getFormatDateFromUnix(sign?.date) : "...")

    useEffect(() => {
        if(sign && sign.user_id > 0 && !user){
            dispatch(getUserById(sign.user_id));
        }
    }, [sign?.user_id])

    return (
        <Tooltip title={title} onOpen={_getSign}>
            <IconButton color='success' onClick={_checkSign} {...props.iconButtonSlot} aria-label="check sign">
                <FontAwesomeIcon icon={faFileSignature} />
            </IconButton>
        </Tooltip>
    )
}