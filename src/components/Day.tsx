import dayjs, { Dayjs } from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';

interface DayProps {
    day: Dayjs;
    rowIdx: number;
}

const Day: React.FC<DayProps> = ({ day, rowIdx }) => {
    const [dayEvents, setDayEvents] = useState<any[]>([])
    const { setShowEventModal, setSelectedDay, savedEvents, setSelectedEvent, filteredEvents } = useContext<GlobalContextType>(GlobalContext)

    useEffect(() => {
        const events = filteredEvents.filter((evt: any) => {
            const eventDay = dayjs(evt.day);
            return eventDay.isValid() && eventDay.format("DD-MM-YY") === day.format("DD-MM-YY");
        });

        setDayEvents(events);
    }, []);

    const getCurrentDayClass = () => {
        return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
            ? 'bg-blue-600 text-white rounded-full w-7'
            : '';
    };

    return (
        <div className='border border-gray-200 flex flex-col'>
            <header className='flex flex-col items-center'>
                {rowIdx === 0 && <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div
                onClick={() => {
                    setSelectedDay(day);
                    setShowEventModal(true);
                }}
                className="flex-1 cursor-pointer"
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate `}
                        key={idx}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Day;
