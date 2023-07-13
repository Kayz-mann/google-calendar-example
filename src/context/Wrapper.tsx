import React, { useEffect, useMemo, useReducer, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import GlobalContext from './GlobalContext';

interface ContextProps {
    children: React.ReactNode;
}

export interface Event {
    id: number;
    day: Dayjs | undefined;
    title: string;
    description: string;
    label: string;
    // Add other properties as needed
}

export type Action =
    | { type: 'push'; payload: Event }
    | { type: 'update'; payload: Event }
    | { type: 'delete'; payload: Event };

const savedEventsReducer = (state: Event[], action: Action): Event[] => {
    switch (action.type) {
        case 'push':
            return [...state, action.payload];

        case 'update':
            return state.map((event) =>
                event.id === action.payload.id ? action.payload : event
            );

        case 'delete':
            return state.filter((event) => event.id !== action.payload.id);

        default:
            return state;
    }
};

const initialEvents = (): Event[] => {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
};

const ContextWrapper: React.FC<ContextProps> = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState<number>(() => dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState<number>(0);
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(dayjs());
    const [showEventModal, setShowEventModal] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [labels, setLabels] = useState<any[]>([]);
    const [savedEvents, dispatch] = useReducer(
        savedEventsReducer,
        [],
        initialEvents
    );

    const filteredEvents = useMemo(() => {
        return savedEvents.filter((evt) =>
            labels.filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label))
    }, [savedEvents, labels])

    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map((evt) => evt.label))];
        });
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null && smallCalendarMonth !== monthIndex) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null)
        }
    }, [showEventModal])

    const updateLabel = (label: any) => {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }

    const handleSetSelectedDay = () => {
        setSelectedDay(dayjs());
    };

    const contextValue = {
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        selectedDay,
        setSelectedDay: handleSetSelectedDay,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatch,
        selectedEvent,
        setSelectedEvent,
        setLabels,
        labels,
        updateLabel,
        filteredEvents
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
