import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface ISubList {
    subNameEvent: string;
    delay?: number;
    isError?: boolean;
    data?: any;
}

export interface IList {
    idx: number;
    nameEvent?: string;
    delay?: number;
    isError?: boolean;
    platforms: string[],
    isOpen?: boolean;
    defaultSubEvent?: number;
    subEvents?: ISubList[],
    error?: any;
    data?: any;

    order: any;

    notification?: string;
}

export interface IListEvents {
    list: IList[];
    activeIdxEvent: number;
}

const initialState: IListEvents = {
    list: [],
    activeIdxEvent: 0
};

const listEventsSlice = createSlice({
    name: 'listEvents',
    initialState,
    reducers: {
        listEventsUpdate(state, action: PayloadAction<Partial<IListEvents>>) {
            return {...state, ...action.payload};
        },
        listEventsUpdateActive(state, action: PayloadAction<number>) {
            state.activeIdxEvent = action.payload;
        },
    }
});

export const {listEventsUpdate, listEventsUpdateActive} = listEventsSlice.actions;
export default listEventsSlice.reducer;