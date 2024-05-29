'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const SideBar = ({ user }: SiderbarProps) => {

    const pathname = usePathname();

    return (
        <section className='p-5 flex flex-col justify-between border-r-2 w-[300px]'>
            <nav className='flex flex-col gap-4'>
                <Link
                    href="/"
                    className='mb-12 cursor-pointer items-center gap-2 flex'
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Gringotts logo'
                        className='size-[24px] max-xl:size-14 '
                    />
                    <h1 className='sidebar-logo'>Gringotts</h1>
                </Link>
                {sidebarLinks.map((item) => {
                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                    return (
                        <Link href={item.route} key={item.label}
                            className={cn('text-sm font font-semibold p-3 rounded-md flex gap-3 items-center', { 'bg-bank-gradient': isActive })}
                        >
                            <div className='relative size-6'>
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
                <PlaidLink user={user} />
            </nav>
            <Footer user={user} />
        </section>
    )
}

export default SideBar