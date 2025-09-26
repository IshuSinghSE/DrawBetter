"use client";

import React from 'react'
import Info from './info';
import Participants from './participants';
import ToolBar from './toolbar';

import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
    drawId: string
}



const Canvas = ({ drawId }: CanvasProps) => {

  const info = useSelf((me) => me.info);

  console.log(info); 
  return (
    <main
    className='h-full w-full relative bg-neutral-100 touch-none'
    >
      <Info />
      <Participants />
      <ToolBar />
    </main>
  )
}

export default Canvas
