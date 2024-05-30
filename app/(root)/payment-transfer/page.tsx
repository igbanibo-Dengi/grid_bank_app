import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.action';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Transfer = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if (!accounts) return;

    const accountsData = accounts?.data;

    return (
        <section className="payment-transfer">
            <section className="size-full">
                <PaymentTransferForm accounts={accountsData} />
            </section>
        </section>
    )
}

export default Transfer