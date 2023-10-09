import React, { useEffect, useLayoutEffect, useState } from "react";
import Highlight from "react-highlight";
import { Block } from "../../UI";
import BridgeMethods from "../BridgeMethods/BridgeMethods";
import HistoryActions from "../HistoryActions/HistoryActions";

import { useAppDispatch, useAppSelector } from "../../store/hook";
import { updateScrolls } from "../../store/sys/sysSlice";

const Main = () => {
    const [cod, setCod] = useState<any>([]);

    const historyEvents = useAppSelector(state => state.historyEvents.list);
    const activeIdx = useAppSelector(state => state.historyEvents.activeIdx);
    const sys = useAppSelector(state => state.sys);

    // const listEvents = useAppSelector(state => state.listEvents.list);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (historyEvents[activeIdx] && historyEvents[activeIdx]['data']) {
            setCod(JSON.stringify(historyEvents[activeIdx]['data'], null, 2));
        }
    }, [activeIdx, historyEvents]);


    useLayoutEffect(() => {
        let el = document.getElementById("scroll");

        if(sys.scrolls["mainMethods"]) {
            el.scrollTo(0, sys.scrolls["mainMethods"]);
        }

        return () => {
            dispatch(updateScrolls({
                name: "mainMethods",
                pos: el? el.scrollTop : 0
            }));
        }
    }, [dispatch, sys.scrolls]);

    function showAllLocal() {
        chrome.storage.local.get().then((items) => {
            console.log(items);
        });
        // console.log("События с локальгном");
    }

    return (
        <div className="wrap-root-content">
            <Block id="scroll" style={{flexShrink: 0 }} header={
                <div onClick={showAllLocal}>
                    Список событий
                </div>
            }>
                <BridgeMethods/>
            </Block>

            <HistoryActions />

            <Block style={{ flexGrow: 1 }} header={
                <div>
                    Резульат от события
                </div>
            }>
                <div className="wrapEditor">
                    <div className="editor">
                        <Highlight>
                            {cod}
                        </Highlight>
                    </div>
                </div>
            </Block>
        </div>
    );
}

export default Main;