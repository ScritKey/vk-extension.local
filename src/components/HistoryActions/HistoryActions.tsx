import React from 'react';
import { historyEventsUpdate, historyEventsUpdateActive } from '../../store/historyEvents/historyEventsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';

import { Block } from '../../UI';
import './HistoryActions.scss';
import { Icon20DeleteClockAltOutline, Icon24DeleteClockOutline } from "@vkontakte/icons";

const HistoryActions = () => {
    const historyEvents = useAppSelector(state => state.historyEvents.list);
    const activeIdx = useAppSelector(state => state.historyEvents.activeIdx);

    const dispatch = useAppDispatch();

    function clickItem(idx: number) {
        dispatch(historyEventsUpdateActive(idx));
    }

    function clearHistory() {
        dispatch(historyEventsUpdate({
            list: []
        }));
    }

    return (
        <Block style={{ width: 320, flexShrink: 0 }} header={
            <div className="headerHistory">
                <div style={{display: "flex", alignItems: "center"}}>
                    История событий
                </div>
                <div className="buttonClear" onClick={clearHistory} title="Очистить историю">
                    <Icon20DeleteClockAltOutline/>
                </div>
            </div>
        }>
            <div className='historyActions'>
                <div className="itemsWrap">
                    {historyEvents.map((e: any, i: number) => {
                        let classItem = "item";
                        let classType = "typeWrap";

                        if(e.isError) {
                            classType = classType + " isError";
                        }

                        if(e.imSender) {
                            classItem = classItem + " imSender";
                        }

                        if(activeIdx === i) {
                            classItem = classItem + " isActive";
                        }

                        return (
                            <div key={i} className={classItem} onClick={() => clickItem(i)}>
                                <div className="headerItem">
                                    <div style={{wordBreak: "break-word"}}>
                                        {e.handler}
                                        <div className={classType}>
                                            {e.type}
                                        </div>
                                    </div>

                                    {/*<div>*/}
                                    {/*    sda*/}
                                    {/*</div>*/}
                                </div>

                                {e.moreEvents? (
                                    <>
                                        <div className="moreItemsTitle">
                                            Событие дополнительно отправляет:
                                        </div>
                                        <div className="moreItemsWrap">
                                            {e.moreEvents.map((name: string) => {
                                                return (
                                                    <div className="moreItem">
                                                        {name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Block>
    );
};

export default HistoryActions;