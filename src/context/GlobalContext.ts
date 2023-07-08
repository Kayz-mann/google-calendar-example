import { Dayjs } from "dayjs";
import React from "react";

export interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalendarMonth: number,
  setSmallCalendarMonth: (index: number) => void;
  selectedDay: Dayjs | null;
  setSelectedDay: (day: Dayjs | null) => void;
}

const GlobalContext = React.createContext<GlobalContextType>({
  monthIndex: 0,
  setMonthIndex: () => { },
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => { },
  selectedDay: null,
  setSelectedDay: () => { },
});

export default GlobalContext;
