'use client'

import ChildrenInterface from '@/interface/children.interface'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import React, { FC } from 'react'
import 'animate.css'
import Logo from './shared/Logo'
import Link from 'next/link'
import { UserAddOutlined } from '@ant-design/icons'
import { Footer } from 'antd/es/layout/layout'
import { usePathname } from 'next/navigation'

const Layout:FC<ChildrenInterface> = ({children}) => {
  const pathname = usePathname()

  const blacklists = [
    "/admin",
    "/login",
    "/signup"
  ]

  const isBlacklist = blacklists.some((path) => pathname.startsWith(path))

  const menus = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Products',
      href: '/products'
    },
    {
      label: 'Carts',
      href: '/carts'
    },
    {
      label: 'Sign In',
      href: '/login'
    },
  ] 

  if(isBlacklist) {
    return (
      <AntdRegistry>
        <div>{children}</div>
      </AntdRegistry>
    )
  }

  return (
    <AntdRegistry>
      <nav className='bg-white shadow-lg px-12 sticky top-0 left-0 z-10 flex justify-between items-center'>
        <Logo />
        <div className='flex items-center'>
          {
            menus.map((item, index) => (
              <Link key={index} href={item.href} className='py-6 px-12 hover:bg-indigo-500 hover:text-white'>{item.label}</Link>
            ))
          }
        </div>
        <Link href='/signup' className='py-6 px-12 bg-rose-500 text-white font-medium hover:bg-blue-500'>
          <UserAddOutlined className='mr-2' />
          Sign Up
        </Link>
      </nav>
      <div className='w-8/12 mx-auto py-24'>{children}</div>
      <Footer className='bg-zinc-900 flex items-center justify-center text-white'>
          <h1>My Footer</h1>
      </Footer>
    </AntdRegistry>
  )
}

export default Layout
