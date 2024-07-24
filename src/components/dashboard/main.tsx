import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/UserSlice';

const Main = ({ setCreateSpace }:{setCreateSpace:any}) => {
  const handleSignout = async () => {
    await signOut();
  };
  const user=useAppSelector(selectUser)
  return (
    <div>
      <nav className='flex justify-between py-4'>
        <h1 className='font-bold text-xl text-white'>Feedback😇</h1>
        <Button onClick={handleSignout}>Signout</Button>
      </nav>
      <div className='flex flex-col pt-32 gap-20 h-[80%] w-full'>
        <div className='flex w-full justify-between py-20'>
          <h1 className='font-bold text-5xl text-start'>
            Welcome back {user?.username}!👋
          </h1>
          <Button onClick={() => setCreateSpace(true)}>
            <Plus /> Create space
          </Button>
        </div>
        {/* <div className='font-semibold text-lg'>
          <h3>No spaces Yet</h3>  
        </div> */}

        <div className='grid grid-cols-3 gap-4'>
          {
            user?.spaces.map((space)=>{
           return <div key={space._id}  className='w-80 cursor-pointer hover:scale-95 transition-transform'>
              <Card>
                <CardHeader>
                  <CardTitle>{space.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Messages: {space.messages.length}</p>
                </CardContent>
              </Card>
            </div>
            })
          }
            
          
        </div>
      </div>
    </div>
  );
};

export default Main;
