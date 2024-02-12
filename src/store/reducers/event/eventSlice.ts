import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from '../../../models/IEvent';
import { IUser } from '../../../models/IUser';
interface EventState {
    events: IEvent[]
    guests: IUser[]
}

const initialState: EventState = {
    events: [],
    guests: [],
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<IEvent[]>) => {
            state.events = action.payload;
        },
        setGuests: (state, action: PayloadAction<IUser[]>) => {
            state.guests = action.payload;
        },
    },
})

export const { setEvents, setGuests } = eventSlice.actions;
export default eventSlice.reducer;
