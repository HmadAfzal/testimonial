'use client'

import React, { useEffect, useState } from 'react'
import Main from '@/components/dashboard/main'
import Createspace from '@/components/dashboard/Createspace';
import axios from 'axios';
import { useAppDispatch} from '@/redux/hooks';
import { initializeUser } from '@/redux/UserSlice';

const Page = () => {
  const [createSpace, setCreateSpace] = useState(false);
const dispatch=useAppDispatch();
  useEffect(() => {
      const getUser = async () => {
        try {
          const response = await axios.get(`/api/get-user/hmadafzal`);
          dispatch(initializeUser(response?.data))
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
  }, [dispatch]);

  return (
    <div className='max-w-screen min-h-screen px-20 bg-[#030816] text-white'>
      {createSpace ? <Createspace setCreateSpace={setCreateSpace} /> : <Main setCreateSpace={setCreateSpace} />}
    </div>
  )
}

export default Page
