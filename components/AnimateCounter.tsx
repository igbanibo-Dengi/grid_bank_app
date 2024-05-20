"use client"

import React from 'react'
import CountUp from 'react-countup'

const AnimateCounter = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp
                decimal=','
                decimals={2}
                duration={1.75}
                prefix='$'
                end={amount} />
        </div>

    )
}

export default AnimateCounter