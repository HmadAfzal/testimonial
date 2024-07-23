'use client'

import React, { useState } from 'react'
import Main from '@/components/dashboard/main'
import Createspace from '@/components/dashboard/Createspace';

const page = () => {
const [createSpace, setCreateSpace]=useState(false);
console.log(createSpace)
  return (
    <div className='max-w-screen min-h-screen px-20 bg-[#030816] text-white'>
      { createSpace? <Createspace setCreateSpace={setCreateSpace}/> : <Main setCreateSpace={setCreateSpace}/>  }

    </div>
  )
}

export default page
