import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from './utils/util'
import Month from './components/Month'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import GlobalContext, { GlobalContextType } from './context/GlobalContext'
import { Dayjs } from 'dayjs'
import EventModal from './components/EventModal'


function App() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth())
  const { monthIndex, showEventModal } = useContext<GlobalContextType>(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }), [monthIndex]

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
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
