import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext, { GlobalContextType } from './GlobalContext';

interface ContextProps {
    children: React.ReactNode;
}

const ContextWrapper: React.FC<ContextProps> = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState<number>(0);
    const [selectedDay, setSelectedDay] = useState<null>(null);

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
                setSelectedDay: () => { setSelectedDay(null) },
            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
