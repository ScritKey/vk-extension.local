import { useContext } from "react";
import { ReducerContext } from "../Provider";

const useSelector = (fn: any): any => {
    const { state } = useContext(ReducerContext);

    return fn(state);
};

export default useSelector;