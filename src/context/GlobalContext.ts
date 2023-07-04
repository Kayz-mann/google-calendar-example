import React from "react";

export interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
}

const GlobalContext = React.createContext<GlobalContextType>({
  monthIndex: 0,
  setMonthIndex: () => {}
});

export default GlobalContext;
