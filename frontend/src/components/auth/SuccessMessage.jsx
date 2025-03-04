import React from 'react';

const SuccessMessage = ({ message }) => (
  <div className="fixed top-4 right-4 z-50 animate-fade-in">
    <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 min-w-[200px]">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 bg-green-500"></div>
        <p className="text-sm font-['Press_Start_2P'] text-black">{message}</p>
      </div>
    </div>
  </div>
);

export { SuccessMessage };