import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IDevice {
    statusBarStyle: string;
    actionBarColor: string;
    safeTop: number;
    safeRight: number;
    safeBottom: number;
    safeLeft: number;
    nameComponent: string | undefined;
}

export interface ISys {
    route: string;
    sensors: {
        [key: string]: {
            refresh_rate: number;
            data: any;
        }
    },
    scrolls: {
        [key: string]: number;
    },
    device: IDevice;
}

const initialState: ISys = {
    route: 'main',
    sensors: {},
    scrolls: {},
    device: {
        statusBarStyle: "light",
        actionBarColor: "#000000",
        safeTop: 37,
        safeRight: 0,
        safeBottom: 26,
        safeLeft: 0,
        nameComponent: undefined
    }
};

const sysSlice = createSlice({
    name: 'sys',
    initialState,
    reducers: {
        sysUpdate(state, action: PayloadAction<Partial<ISys>>) {
            return {...state, ...action.payload};
        },
        addSensor(state, action: PayloadAction<{name: string, refresh_rate: number, data: any}>) {
            state.sensors[action.payload.name] = {
                refresh_rate: action.payload.refresh_rate,
                data: action.payload.data,
            }
        },
        removeSensor(state, action: PayloadAction<{name: string}>) {
            if(state.sensors[action.payload.name]) {
                delete state.sensors[action.payload.name]
            }
        },
        updateDataSensor(state, action: PayloadAction<{name: string, data: any}>) {
            if(state.sensors[action.payload.name]) {
                state.sensors[action.payload.name]['data'] = {...state.sensors[action.payload.name]['data'], ...action.payload.data};
            }
        },
        updateScrolls(state, action: PayloadAction<{name: string, pos: number}>) {
            state.scrolls[action.payload.name] = action.payload.pos;
        },
        updateDevice(state, action: PayloadAction<Partial<IDevice>>) {
            state.device = {...state.device, ...action.payload};
        },
    }
});

export const {sysUpdate,
    addSensor,
    removeSensor,
    updateDataSensor,
    updateScrolls,
    updateDevice
} = sysSlice.actions;
export default sysSlice.reducer;