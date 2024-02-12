import React, { useEffect, useState, FC } from 'react';
import { Button, Modal, TextField, MenuItem, FormHelperText } from '@mui/material'; // Импортируем FormHelperText
import { Box } from '@mui/system';
import { Calendar } from 'antd';
import { useDispatch } from 'react-redux';
import { createEvents, fetchGuests, fetchEvents } from '../../store/reducers/event/thunks';
import { IUser } from '../../models/IUser';
import { IEvent } from '../../models/IEvent';
import { RootState } from '../../store/redux-store';
import { useSelector } from "react-redux";
import { Badge } from 'antd';
import { Dayjs } from 'dayjs';


interface EventForm {
    guests: IUser[];
}

const EventPage: FC<EventForm> = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formError, setFormError] = useState<string>(''); // Добавляем состояние для ошибки формы
    const dispatch = useDispatch();
    const { guests, events} = useSelector((state: RootState) => state.event);
    const {user} = useSelector((state: RootState) => state.auth);
    const [eventForm, setEventForm] = useState<IEvent>({
        author: user.username,
        guest: '',
        date: '',
        description: '',
    })

    useEffect(() => {
        dispatch(fetchGuests() as any);
        dispatch(fetchEvents(user.username) as any);
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleGuestChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEventForm({ ...eventForm, guest: event.target.value as string });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!eventForm.description || !eventForm.date || !eventForm.guest) {
            setFormError('Пожалуйста, заполните все поля');
            return;
        }

        const selectedDate = new Date(eventForm.date);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            setFormError('Задачу можно создать только на предстоящие дни');
            return;
        }

        dispatch(createEvents(eventForm) as any);

        setEventForm({
            author: user.username,
            date: '',
            description: '',
            guest: '',
        });
        setIsModalVisible(false);

        dispatch(fetchEvents(user.username) as any);
    };

    const dateCellRender = (value: Dayjs) => {
        const formattedDate = value.format('YYYY-MM-DD');
        const currentDayEvents = events.filter(ev => ev.date === formattedDate);
        return (
            <div>
                {currentDayEvents.map((ev, index) => <Badge key={index} status="success" text={ev.description} />)}
            </div>
        );
    };

    return (
        <Box sx={{ margin: '40px' }}>
            <Button variant="contained" color="primary" onClick={showModal} style={{ marginBottom: '20px' }}>Добавить событие</Button>
            <Calendar cellRender={dateCellRender} />
            <Modal
                open={isModalVisible}
                onClose={handleCancel}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <Box sx={{ width: 400, backgroundColor: 'white', p: 4, borderRadius: '8px' }}>
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Описание события"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setEventForm({ ...eventForm, description: e.target.value })}
                            value={eventForm.description}
                        />
                        <TextField
                            label="Дата события"
                            type="date"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => setEventForm({ ...eventForm, date: e.target.value })}
                        />
                        <TextField
                            select
                            label="Выбрать пользователя"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={handleGuestChange}
                            value={eventForm.guest}
                        >
                            {guests.map((guest) => (
                                <MenuItem key={guest.username} value={guest.username}>
                                    {guest.username}
                                </MenuItem>
                            ))}
                        </TextField>
                        {formError && <FormHelperText error>{formError}</FormHelperText>}
                        <Button type="submit" variant="contained" color="primary" sx={{ float: 'right' }} >Добавить</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default EventPage;
