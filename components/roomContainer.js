import React from 'react';
import RoomTab from './roomTab';
const RoomContainer = ({children, rooms, name}) => {
    return (
        <div className="border-dotted border-2 border-gray-200 shadow-inner max-w-xs m-auto mt-7 h-4/6 rounded-md ">
            {children}
        {!rooms === [] ? <div>
            {rooms.map((one) => {
                return <RoomTab roomName={name}/> // info room derriere
            })}
        </div> : <div className='flex justify-center items-center mt-80 w-32 m-auto'><p className='text-md text-gray-300 font-medium'>Create New Channel</p></div>}
        
        </div>
    );
}

export default RoomContainer;
