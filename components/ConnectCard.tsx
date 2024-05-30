'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { useRouter } from 'next/navigation'
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'
import PlaidLink from './PlaidLink'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { Plus } from 'lucide-react'

const ConnectCard = ({ user }: ConnetCardProps) => {
    const router = useRouter();
    const [token, setToken] = useState('')


    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })


        router.push('/')
    }, [user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);

    return (
        <button
            onClick={() => open()}
            className="relative flex flex-col gap-2 h-[190px] w-full max-w-[320px] justify-center text-blue-600 border-blue-400 items-center rounded-[20px] border hover:border-blue-600 hover:scale-95 animate-in transition-all duration-300 ease-in-out shadow-creditCard backdrop-blur-[6px]"
        >

            <Plus />
            <p>Add new bank acount</p>
        </button>
    )
}

export default ConnectCard