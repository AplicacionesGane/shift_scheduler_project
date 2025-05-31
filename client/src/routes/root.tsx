import { NavBar } from '@/components/nav-bar'

import { Outlet } from 'react-router'

export default function Root() {
    return (
        <section className='flex w-full'>
            <nav className='h-screen w-2/12 border-r-2'>
                <NavBar />
            </nav>
            <main className='h-screen w-10/12 p-1 overflow-y-auto'>
                <Outlet />
            </main>
        </section>
    )
}