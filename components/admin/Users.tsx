'use client'

import { Card, Skeleton } from 'antd'
import Image from 'next/image'
import React from 'react'

const Users = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
        <Skeleton active className='col-span-4' />
        {
            Array(16).fill(0).map((item, index) => (
                <Card key={index} hoverable>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image src="/images/avt.avif" width={100} height={100} alt={`avt-${index}`} className='rounded-full' objectFit='cover' />
                        <Card.Meta className='text-center' title='Mohit Gupta' description='email@gmail.com' />
                        <label className="text-gray-500 font-medium">July 26, 2025</label>
                    </div>
                </Card>
            ))
        }
    </div>
  )
}

export default Users
