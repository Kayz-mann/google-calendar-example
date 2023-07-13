import { Dayjs } from "dayjs";
import React from "react";
import { Action, Event } from "./Wrapper";

export interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (index: number) => void;
  selectedDay: Dayjs | null;
  setSelectedDay: (day: Dayjs | null) => void;
  showEventModal: boolean;
  setShowEventModal: (value: boolean) => void;
  savedEvents: Event[];
  dispatch: React.Dispatch<Action>;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  setLabels: React.Dispatch<React.SetStateAction<any[]>>;
  labels: any[];
  updateLabel: (label: any) => void; // Include the argument in the function declaration
  filteredEvents: any;
}


const GlobalContext = React.createContext<GlobalContextType>({
  monthIndex: 0,
  setMonthIndex: () => { },
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => { },
  selectedDay: null,
  setSelectedDay: () => { },
  showEventModal: false,
  setShowEventModal: () => { },
  savedEvents: [],
  dispatch: () => { },
  selectedEvent: null,
  setSelectedEvent: () => { },
  setLabels: () => { },
  labels: [],
  updateLabel: () => { },
  filteredEvents: [],
});

export default GlobalContext;
