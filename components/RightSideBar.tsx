import Image from 'next/image'
import React from 'react'
import BankCard from './BankCard'
import { countTransactionCategories } from '@/lib/utils'
import Category from './Category'
const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] = countTransactionCategories(transactions);

    return (
        <aside className=''>
            <section className='flex flex-col lg:flex-row gap-10'>
                {banks?.length > 0 && (

                    <div className='relative flex-col gap-5 h-full lg:w-1/3 my-auto mx-auto hidden lg:flex md:w-[400px]'>
                        {/* <h2 className='header-2'>My Banks</h2> */}
                        <div className='relative z-10 h-full pt-20'>
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName}  ${user.lastName}`}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className='absolute right-0 top-0 z-0 w-[90%]'>
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName}  ${user.lastName}`}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-1 flex-col gap-6 w-full xl:w-2/3">
                    <h2 className="header-2">Top categories</h2>

                    <div className='space-y-5'>
                        {categories.map((category, index) => (
                            <Category key={category.name} category={category} />
                        ))}
                    </div>
                </div>
            </section>
        </aside>
    )
}

export default RightSideBar