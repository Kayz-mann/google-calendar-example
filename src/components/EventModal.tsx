import { useContext, useState } from 'react';
import GlobalContext, { GlobalContextType } from '../context/GlobalContext';

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
    const { setShowEventModal, selectedDay, setSelectedDay, dispatch, selectedEvent } =
        useContext<GlobalContextType>(GlobalContext);
    const [title, setTitle] = useState<string>(
        selectedEvent ? selectedEvent.title : ''
    );
    const [description, setDescription] = useState<string>(
        selectedEvent ? selectedEvent.description : ''
    );
    const [selectedLabel, setSelectedLabel] = useState<string | undefined>(
        selectedEvent
            ? labelClasses.find((lbl) => lbl === selectedEvent.label)
            : labelClasses[0]
    );


    console.log(selectedLabel);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const calendarEvent: Object | any = {
            title,
            description,
            label: selectedLabel,
            day: selectedDay ? selectedDay?.valueOf() : undefined,
            id: selectedEvent ? selectedEvent.id : Date.now()
        };

        if (selectedEvent) {
            dispatch({ type: 'update', payload: calendarEvent })
        } else {
            dispatch({ type: 'push', payload: calendarEvent })
        }

        dispatch({
            type: 'push',
            payload: calendarEvent
        });

        setShowEventModal(false);
    };

    return (
        <div className='h-screen/4 w-full fixed left-0 top-0 flex justify-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between'>
                    <span className='material-icons-outlined text-gray-400'>
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={
                                    () => {
                                        dispatch({ type: 'delete', payload: selectedEvent }),
                                            setShowEventModal(false)
                                    }
                                }
                                className='material-icons-outlined text-gray-400 cursor-pointer'>
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span className='material-icons-outlined text-gray-400'>
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className='p-3'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input
                            type='text'
                            name='title'
                            placeholder='Add title'
                            value={title}
                            required
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 broder-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 '
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className='flex flex-row items-center'>
                            <span className='material-icons-outlined text-gray-400 mx-2'>
                                schedule
                            </span>
                            <p>{selectedDay?.format("dddd, MMMM, DD")}</p>
                        </div>
                        <div>
                            <span className='material-icons-outlined text-gray-400 mx-2'>
                                segment
                            </span>
                            <input
                                type='text'
                                name='title'
                                placeholder='Add a description'
                                value={description}
                                required
                                className='pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 broder-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 '
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-row gap-x-2'>
                            <span className='material-icons-outlined text-gray-400'>
                                bookmark_border
                            </span>
                            {labelClasses.map((label, i) => (
                                <span
                                    onClick={() => setSelectedLabel(label)}
                                    key={i}
                                    className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                                >
                                    {selectedLabel === label && (
                                        <span className='material-icons-outlined text-white text-sm'>
                                            check
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end w-100 border-t p-3 mt-5'>
                    <button
                        onClick={handleSubmit}
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    );
};

export default EventModal;
