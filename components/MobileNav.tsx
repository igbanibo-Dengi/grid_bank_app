'use client'

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'


const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[246px]'>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        alt='menu'
                        width={30}
                        height={30}
                    />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-white'>
                    <Link
                        href="/"
                        className='cursor-pointer items-center gap-1 px-4 flex'
                    >
                        <Image
                            src="/icons/logo.svg"
                            width={34}
                            height={34}
                            alt='Grid Wallet logo'
                            className='size-[24px] max-xl:size-14 '
                        />
                        <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Grid Wallet</h1>
                    </Link>
                    <div className='mobilenav-sheet pb-10'>
                        <SheetClose asChild>
                            <nav className='flex h-ful flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                                    return (


                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', { 'bg-bank-gradient': isActive })}
                                            >
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        'brightness-[3] invert-0': isActive
                                                    })}
                                                />
                                                <p className={cn('text-16 font-semibold text-black-2', { '!text-white': isActive })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}

                                USER
                            </nav>
                        </SheetClose>
                        <Footer user={user} type='mobile' />
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav