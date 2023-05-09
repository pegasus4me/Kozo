import React from 'react';

const RoomTab = ({roomName}) => {
    return (
        <div className='max-w-lg bg-green-400 h-10 rounded-md flex justify-center items-center'>
            <p className='font-medium text-slate-200'>{roomName}</p>
        </div>
    );
}

export default RoomTab;
