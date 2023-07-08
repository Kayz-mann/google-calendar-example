import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import GlobalContext from './GlobalContext';

interface ContextProps {
    children: React.ReactNode;
}

const ContextWrapper: React.FC<ContextProps> = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState<number>(0);
    const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    useEffect(() => {
        if (smallCalendarMonth !== null) {
            setMonthIndex(smallCalendarMonth)
        }
    }, [smallCalendarMonth]);

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                selectedDay,
                setSelectedDay: () => { setSelectedDay(dayjs()) },
                showEventModal,
                setShowEventModal
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
