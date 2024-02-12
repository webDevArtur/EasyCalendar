import {createAsyncThunk} from '@reduxjs/toolkit';
import {setGuests, setEvents} from "./eventSlice.ts";
import axios from "axios";
import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

export const fetchGuests = createAsyncThunk(
    'event/fetchGuests',
    async (_, {dispatch}) => {
        try {
            const response = await axios.get<IUser[]>('../../users.json');
            dispatch(setGuests(response.data));
        }
        catch (e) {
            console.log(e);
        }
    }
)

export const createEvents = createAsyncThunk(
    'event/createEvents',
    async (event: IEvent) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            localStorage.setItem('events', JSON.stringify(json));
        }
        catch (e) {
            console.log(e);
        }

    }
)

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async ( username: string , {dispatch}) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter((event) => event.author === username || event.guest === username);
            dispatch(setEvents(currentUserEvents));
        }
        catch (e) {
            console.log(e);
        }
    }
)