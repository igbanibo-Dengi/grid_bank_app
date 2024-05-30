import BankCard from '@/components/BankCard';
import ConnectCard from '@/components/ConnectCard';
import PlaidLink from '@/components/PlaidLink';
import { getAccounts } from '@/lib/actions/bank.action';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })


    // const loggedIn = await getLoggedInUser();


    return (
        <div className='flex rounded-tl-3xl bg-white'>
            <div className="my-banks">
                <div className="space-y-10 md:space-y-5 w-fit">
                    <div className='flex items-center justify-between'>
                        <h2 className="header-2">
                            Your cards
                        </h2>

                        <span className='lg:hidden'>
                            <PlaidLink user={loggedIn} variant='primary' />
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20 place-content-center">
                        {accounts && accounts.data.map((a: Account) => (
                            <BankCard
                                key={accounts.id}
                                account={a}
                                userName={`${loggedIn?.firstName}${loggedIn?.lastName}`}
                                firstName={loggedIn?.firstName}
                                lastName={loggedIn?.lastName}
                            />
                        ))}
                        <ConnectCard user={loggedIn} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBanks