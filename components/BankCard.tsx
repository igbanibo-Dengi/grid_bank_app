import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Copy from './Copy'

const BankCard = ({ account, userName, firstName, lastName, showBalance = true }: CreditCardProps) => {


    return (
        <div className='flex flex-col'>
            <Link href={`/transaction-history/?id=${account.appwriteItemId}`} className='bank-card'>
                <div className='bank-card_content'>
                    <div>
                        <h1 className='text-sm font-semibold text-white'>{account.name}</h1>
                        <p className='font-ibm-plex-serif font-black text-white'>{formatAmount(account.currentBalance)}</p>
                    </div>

                    <article className='flex flex-col gap-2'>
                        <div className='flex justify-between'>
                            <h1 className='text-12 font-semibold text-white'>
                                {firstName}
                            </h1>
                            <h2 className='text-12 font-semibold text-white'>
                                ◐◐/◐◐
                            </h2>
                        </div>
                        <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                            ◐◐◐◐ ◐◐◐◐ ◐◐◐◐ <span className='text-16'>{account?.mask}</span>
                        </p>
                    </article>
                </div>

                <div className='bank-card_icon'>
                    <Image
                        src="/icons/Paypass.svg"
                        height={20}
                        width={20}
                        alt='pay'
                    />
                    <Image
                        src="/icons/mastercard.svg"
                        width={24}
                        height={24}
                        alt='mastercard'
                        className='ml-5'
                    />
                </div>
                <Image
                    src="/icons/lines.png"
                    width={316}
                    height={190}
                    alt='lines'
                    className='absolute top0 left-0'
                />
            </Link>
            {showBalance && <Copy title={account?.shareableId} />}
        </div>
    )
}

export default BankCard