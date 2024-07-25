'use client'
import React, { useState } from 'react'
import WriteMessage from './WriteMessage'
import Spaceinfo from './Spaceinfo'
import { Space } from '@/schemas/SpaceSchema'


const Main = ({spaceData }: { spaceData:Space }) => {
const [sendMessage, setSendMessage]=useState(false)
  return (
    <div>
{
    sendMessage ? <WriteMessage  spaceData={spaceData}  setSendMessage={setSendMessage}/> : <Spaceinfo spaceData={spaceData} setSendMessage={setSendMessage}/>
}
    </div>
  )
}


export default Main

