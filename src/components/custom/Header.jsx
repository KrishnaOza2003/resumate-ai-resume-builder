import React from 'react'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router';

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-1 px-5 flex justify-between shadow-md sticky'>
            <Link to={'/'}>
                <img src='/logo2.png' className='cursor-pointer' width={100} height={100} />
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header