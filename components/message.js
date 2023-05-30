import React from 'react';

const Message = ({sender, message}) => {
    return (
        <>
        <div className='bg-white max-w-[70%] m-auto max-h-80 rounded-md shadow-lg p-6'>
            <h3 className='font-medium text-slate-900'>{message}</h3>
        </div>
        <p className='text-xs text-slate-500'>send by : {sender}</p>
        </>
    );
}

export default Message;
