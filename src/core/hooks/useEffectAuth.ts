import { DependencyList, EffectCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/modalAuth/slice";

export default function useEffectAuth(effect: EffectCallback, deps?: DependencyList): void {
    const dispatch = useDispatch();

    /* @ts-ignore */
    const isLogin = useSelector(state => state.user.isLogin) as boolean;
    /* @ts-ignore */
    const userId = useSelector(state => state.user.id) as number;

    useEffect(isLogin ? effect :
        () => { dispatch(showModal()) }, deps?.concat(userId));
}