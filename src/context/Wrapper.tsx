import React, { useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from './GlobalContext';

interface ContextProps {
    children: React.ReactNode;
}

const ContextWrapper: React.FC<ContextProps> = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());

    return (
        <GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextWrapper;
