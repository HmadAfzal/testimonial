import React from 'react'
import { dbConnect } from '@/lib/dbconnect'
import Main from '@/components/sendMessage/Main'
import { SpaceModel } from '@/model/Space'

const SpacePage = async ({ params }: { params: { spacename: string } }) => {
  await dbConnect()
  const space = await SpaceModel.findOne({ name: params.spacename }).lean()

  if (!space) {
    return <div className='flex bg-black font-3xl text-white items-center justify-center h-screen w-screen'>Space not found</div>
  }

  return <Main spaceData={JSON.parse(JSON.stringify(space))} />
}

export default SpacePage
