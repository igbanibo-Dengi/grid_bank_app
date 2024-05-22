import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async () => {


    const loggedIn = await getLoggedInUser();


    return (
        <section className="home">
            <div className='home-content'>
                <header className='home-heaer'>
                    <HeaderBox
                        type="greeting"
                        title="Welome"
                        user={loggedIn?.name || 'Guest'}
                        subtext="Acess and manage your account and transactions efficiently"
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250.35}
                    />
                </header>
            </div>
            <RightSideBar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50 }, { currentBalance: 503.50 }]}
            />
        </section>
    )
}

export default Home