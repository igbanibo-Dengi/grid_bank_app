import RecentTransactions from '@/components/RecentTransactions';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.action';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentpage = Number(page as string) || 1;

    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({ userId: loggedIn.$id })
    if (!accounts) return

    const accountsData = accounts?.data
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId
    const account = await getAccount({ appwriteItemId })

    return (
        <section className='bg-white'>
            <div className=" no-scrollbar flex flex-col bg-white overflow-y-scroll p-5 lg:p-10 h-full rounded-tl-3xl">
                <div className='home-header'>
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </div>
                <RightSideBar
                    user={loggedIn}
                    transactions={account?.transactions}
                    banks={accountsData?.slice(0, 2)}
                />
                <RecentTransactions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentpage}
                />
            </div>
        </section>
    )
}

export default Home