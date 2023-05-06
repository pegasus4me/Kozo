import React from 'react';
import AiOutlineArrowRight from "./icons/arrow"
const Popup = ({roomName, addRoom}) => {
    return (
        <div className='bg-white max-w-md p-10 rounded-md shadow-md flex flex-col'> 
            <div className='ml-28  text-right mb-8'>
                <h3 className='text-4xl  text-gray-400'>name your R<span className='text-green-400 '>oo</span>m</h3>
            </div>

            <input type="text" className='focus:outline-none border-b-2 p-1 bg-transparent' onChange={roomName} />
            <div className='text-right'>
                <button onClick={addRoom} className='mt-6'><AiOutlineArrowRight className='text-2xl text-green-400'/></button>
            </div>
        </div>
    );
}

export default Popup;
