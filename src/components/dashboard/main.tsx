import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

const Main = ({ setCreateSpace }:{setCreateSpace:any}) => {
  const { data } = useSession();

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <div>
      <nav className='flex justify-between py-4'>
        <h1 className='font-bold text-xl text-white'>Feedback😇</h1>
        <Button onClick={handleSignout}>Signout</Button>
      </nav>
      <div className='flex flex-col pt-32 gap-20 h-[80%] w-full'>
        <div className='flex w-full justify-between py-20'>
          <h1 className='font-bold text-5xl text-start'>
            Welcome back {data?.user.username || data?.user.name}!👋
          </h1>
          <Button onClick={() => setCreateSpace(true)}>
            <Plus /> Create space
          </Button>
        </div>
        {/* <div className='font-semibold text-lg'>
          <h3>No spaces Yet</h3>  
        </div> */}

        <div className='grid grid-cols-3 gap-4'>
          {Array(3).fill().map((_, index) => (
            <div key={index} className='w-80 cursor-pointer hover:scale-95 transition-transform'>
              <Card>
                <CardHeader>
                  <CardTitle>Space Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Messages: 4</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
