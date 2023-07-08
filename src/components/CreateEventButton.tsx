import { useContext } from 'react'
import plusImg from '../assets/plus.svg'
import GlobalContext, { GlobalContextType } from '../context/GlobalContext'

const CreateEventButton = () => {
    const { setShowEventModal } = useContext<GlobalContextType>(GlobalContext)
    return (
        <button
            onClick={() => setShowEventModal(true)}
            className='border p-2 rounded-full flex items-center shadow-md hover:shadow'
        >
            <img src={plusImg} alt='create_event' className='w-7 h-7' />
            <span className='pl-3 pr-7'>Create</span>
        </button>
    )
}

export default CreateEventButton