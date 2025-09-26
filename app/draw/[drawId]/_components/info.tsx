"use client";

import React from 'react'

const Info = () => {

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md h-12'>
      Info Component
    </div>
  );
}

export default Info


export const InfoSkeleton = () => {

  return (
      <div className='absolute top-2 left-2
       bg-white rounded-md px-1.5 flex items-center shadow-md h-12
       w-[300px]
       '/>
 

  );


}