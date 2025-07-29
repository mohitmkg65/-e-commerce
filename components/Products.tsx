'use client'

import DataInterface from '@/interface/data.interface'
import { Card } from 'antd'
import Image from 'next/image'
import React, { FC } from 'react'

const Products:FC<DataInterface> = ({data}) => {
  return (
    <div className='grid grid-cols-4 gap-10'>
      {
        data.data.map((item:any, index:number)=>(
          <Card key={index} hoverable cover={
            <div className='relative w-full h-[180px]'>
              <Image src={item.image} layout="fill" alt={`product-${index}`} objectFit='cover' className='rounded-t-lg'/>
            </div>
          }>
            <Card.Meta  title={item.title} description={
                <div className='flex gap-2'>
                  <label>₹{item.price}</label>
                  <del>₹{item.price}</del>
                  <label>({item.discount}% Off)</label>
                </div>
              }
            />
          </Card>
        ))
      }
    </div>
  )
}

export default Products
