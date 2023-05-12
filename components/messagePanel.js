import React from 'react';
const MessagePanel = ({children, channelName}) => {
    return (
        <div className='bg-white max-w-[70%] max-h-80 rounded-md shadow-lg p-6'>
            <p className='text-xl font-medium text-slate-900'># {channelName}soso</p> 
            {children}
          
        </div>
    );
}

export default MessagePanel;
