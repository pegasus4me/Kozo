import React from 'react';

const RoomContainer = ({children}) => {
    return (
        <div className="border-dotted border-2 border-gray-100 shadow-inner max-w-xs m-auto mt-7 h-4/6 rounded-md">
            {children}
        </div>
    );
}

export default RoomContainer;
