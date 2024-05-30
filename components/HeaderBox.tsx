'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderBox = ({
    // type = "title",
    // title,
    // subtext,
    user }: HeaderBoxProps) => {

    const pathname = usePathname();

    return (
        <div className='header-box'>
            {pathname === '/' && (
                <div>
                    <h1 className='header-box-title'>
                        Welocme  <span className='text-bankGradient'>&nbsp;{user}</span>
                    </h1>
                    <p className='header-box-subtext'>Acess and manage your account and transactions efficiently.</p>
                </div>
            )}
            {pathname === '/my-banks' && (
                <div>
                    <h1 className='header-box-title'>
                        My Bank Accounts
                    </h1>
                    <p className='header-box-subtext'>Effortlessly manage your banking activites.</p>
                </div>
            )}
            {pathname === '/transaction-history' && (
                <div>
                    <h1 className='header-box-title'>
                        Transaction History
                    </h1>
                    <p className='header-box-subtext'>See your bank details and transactions.</p>
                </div>
            )}
            {pathname === '/payment-transfer' && (
                <div>
                    <h1 className='header-box-title'>
                        Payment Transfer
                    </h1>
                    <p className='header-box-subtext'>Please provide any specific details or notes related to the payment transfer."</p>
                </div>
            )}
        </div>
    )
}

export default HeaderBox