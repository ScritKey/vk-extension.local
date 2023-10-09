import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IList {
    type: string;
    data: any;
    handler: string;
    isError?: boolean;
    imSender?: boolean;
}

export interface IHistoryEvents {
    list: IList[];
    activeIdx: number;
}

const initialState: IHistoryEvents = {
    list: [],
    activeIdx: 0
};

const historyEventsSlice = createSlice({
    name: 'historyEvents',
    initialState,
    reducers: {
        historyEventsUpdate(state, action: PayloadAction<Partial<IHistoryEvents>>) {
            return {...state, ...action.payload};
        },
        historyEventsAdd(state, action: PayloadAction<any>) {
            if(state.list.length > 60) {
                state.list.shift();
            }
            state.list.push(action.payload);
        },
        historyEventsUpdateActive(state, action: PayloadAction<number>) {
            state.activeIdx = action.payload;
        },
        // historyEventsRemoveFirst(state, action: PayloadAction<number>) {
        //     state.list.shift();
        // },
    }
});

export const {historyEventsUpdate,
    historyEventsAdd,
    historyEventsUpdateActive,
    // historyEventsRemoveFirst
} = historyEventsSlice.actions;
export default historyEventsSlice.reducer;