import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from './utils/util'
import Month from './components/Month'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import GlobalContext, { GlobalContextType } from './context/GlobalContext'
import { Dayjs } from 'dayjs'


function App() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth())
  const { monthIndex } = useContext<GlobalContextType>(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }), [monthIndex]

  return (
    <React.Fragment>
      <div className='h-screen flex flex-col'>
        <CalendarHeader />

        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
