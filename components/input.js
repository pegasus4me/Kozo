import React from "react";
import AiOutlineSend from './icons/send'
const Input = ({ value , send}) => {
  return (
    <div className="relative ">
      <input
        type="text"
        className=" mt-7 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 block w-full p-3 "
        onChange={value}
      />
     <div className="absolute top-3 right-2 ">
     <button onClick={send}><AiOutlineSend/></button>
     </div>
    </div>
  );
};

export default Input;
