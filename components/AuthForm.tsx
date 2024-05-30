'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInput from './CustomInput'
import { Form } from './ui/form'

import { authFormSchema } from '@/lib/utils'
import { CircleOff, CircleX, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'
import { useToast } from './ui/use-toast'


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { toast } = useToast()
    const formSchema = authFormSchema(type);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        setIsLoading(true)

        const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email!,
            password: data.password!
        }

        try {
            // sign up with appwrite & create a plaid link token
            if (type === 'sign-up') {
                const newUser = await signUp(userData);

                setUser(newUser)
            }
            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if (response) router.push('/')
            }

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Invalid credentials",
                description: "Please check your email an password.",
                action: <CircleOff color="#f00000" size={40} />
            })
        } finally {
            setIsLoading(false)
        }

        setIsLoading(false)
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link
                    href="/"
                    className='cursor-pointer items-center gap-1 flex'
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Gringotts logo'
                        className='size-[24px] max-xl:size-14 '
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Gringotts</h1>
                </Link>
                <div className='flex flex-col gap1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user ?
                            'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                        }
                        <p className='text-16 font-normal text-gray-600'>
                            {user ?
                                'Link your account to get started'
                                : 'Please enter your details to get started'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* {plaid  llink} */}
                    <PlaidLink user={user} variant="primary" />
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name="firstName"
                                            label="First Name"
                                            type="text"
                                            placeholder="Enter your first name"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="lastName"
                                            label="Last Name"
                                            type="text"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name="address1"
                                        label="Address"
                                        type="text"
                                        placeholder="Enter your permanent address"
                                    />
                                    <CustomInput
                                        control={form.control}
                                        name="city"
                                        label="City"
                                        type="text"
                                        placeholder="Enter your city"
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name="state"
                                            label="State"
                                            type="text"
                                            placeholder="Example: NY"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="postalCode"
                                            label="Postal Codde"
                                            type="text"
                                            placeholder="Example: 11102"
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name="dateOfBirth"
                                            label="Date of birth"
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="ssn"
                                            label="SSN"
                                            type="text"
                                            placeholder="XXX-XX-XXXX"
                                        />
                                    </div>
                                </>
                            )}
                            <CustomInput
                                control={form.control}
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="enter email"
                            />
                            <CustomInput
                                control={form.control}
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="enter your password"
                            />
                            <div className='flex flex-col gap-4'>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className='form-btn'
                                >
                                    {isLoading ? (<>
                                        <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                    </>) : (
                                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex items-center justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>{type === 'sign-in' ?
                            "Don't have an account ?" : "Already have an account?"
                        }</p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm