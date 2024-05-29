import HeaderBox from '@/components/HeaderBox'
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
        <section className=" no-scrollbar flex w-full flex-row">
            <div className='no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll'>
                <header className='home-heaer'>
                    <HeaderBox
                        type="greeting"
                        title="Welome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Acess and manage your account and transactions efficiently"
                    />
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
                <RecentTransactions
                    accounts={accountsData}
                    transactions={account?.transactions}
                    appwriteItemId={appwriteItemId}
                    page={currentpage}
                />

            </div>
            <RightSideBar
                user={loggedIn}
                transactions={account?.transactions}
                banks={accountsData?.slice(0, 2)}
            />
        </section>
    )
}

export default Home