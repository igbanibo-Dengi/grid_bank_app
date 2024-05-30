import BankCard from '@/components/BankCard';
import ConnectCard from '@/components/ConnectCard';
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
                <div className="space-y-4">
                    <h2 className="header-2">
                        Your cards
                    </h2>
                    <div className="flex flex-wrap gap-6">
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