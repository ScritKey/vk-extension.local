import { configureStore } from '@reduxjs/toolkit';

import sysReducer from './sys/sysSlice';
import listEventsReducer from './listEvents/listEventsSlice';
import historyEventsReducer from './historyEvents/historyEventsSlice';

const store = configureStore({
    reducer: {
        sys: sysReducer,
        listEvents: listEventsReducer,
        historyEvents: historyEventsReducer,
    },
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;