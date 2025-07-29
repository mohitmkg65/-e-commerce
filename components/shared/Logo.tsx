import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image src='/images/logo.png' width={120} height={0} alt='logo' priority style={{ width: 'auto', height: 'auto' }} />
  )
}

export default Logo
