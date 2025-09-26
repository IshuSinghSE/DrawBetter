
import React from 'react'
import Canvas from './_components/canvas'

interface DrawIdPageProps {

    params: {
        drawId: string
    }

}

const DrawIdPage = ({ params }: DrawIdPageProps) => {
  return (
   
      <Canvas 
      drawId={params.drawId}
      />

  )
}

export default DrawIdPage
