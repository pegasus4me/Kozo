import React from 'react';

const RoomTab = ({roomName, showDiscussionModal, color}) => {
    return (
        <div className={'max-w-lg h-10 rounded-md flex justify-center items-center bg-green-500 mb-2 hover:bg-green-600'}>
            <p className='font-medium text-slate-200' onClick={showDiscussionModal}>{roomName}</p>
            {/* il lique sur la tab et il a affiche les discussions */}
        </div>
    );
}

export default RoomTab;
