import React from 'react';
import AiOutlinePlusCircle from "./icons/plus"
const RoomsContainer = ({children, newRoom}) => {
    return (

        <div className=' shadow-md block rounded-md bg-white max-w-md  h-[60rem] ml-20  text-center'>
            <div>
                <h2 className='text-2xl font-medium text-gray-900 p-5 '>Rooms</h2>
                <button onClick={newRoom}><AiOutlinePlusCircle className='text-2xl text-gray-500'/></button> 
            </div>
            {children}
        </div>
    );
}

export default RoomsContainer;
