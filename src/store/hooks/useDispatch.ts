import { useContext } from "react";
import { ReducerContext } from "../Provider";

const useDispatch = () => {
    const { dispatch } = useContext(ReducerContext);

    return dispatch;
};

export default useDispatch;