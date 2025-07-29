'use client'

import { FC } from 'react';
import { CreditCardOutlined, LoginOutlined, ProfileOutlined, ReconciliationOutlined, SettingOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import ChildrenInterface from '@/interface/children.interface';
import Logo from '../shared/Logo';
import { usePathname } from 'next/navigation';
import { title } from 'process';

const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    left: 250
}

const App: FC<ChildrenInterface> = ({children}) => {
    const { token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const pathName = usePathname()

    const menus:MenuProps['items'] = [
        {
            icon: <ShoppingOutlined />,
            label: <Link href='/admin/products'>Products</Link>,
            key: 'products'
        },
        {
            icon: <ReconciliationOutlined />,
            label: <Link href='/admin/orders'>Orders</Link>,
            key: 'orders'
        },
        {
            icon: <CreditCardOutlined />,
            label: <Link href='/admin/payments'>Payments</Link>,
            key: 'Payments'
        },
        {
            icon: <UserOutlined />,
            label: <Link href='/admin/users'>Users</Link>,
            key: 'users'
        },
    ]

    const accountMenus = {
        items: [
            {
                icon: <ProfileOutlined />,
                label: 'Er. Mohit',
                key: 'fullname'
            },
            {
                icon: <LoginOutlined />,
                label: 'Logout',
                key: 'logout'
            },
            {
                icon: <SettingOutlined />,
                label: 'Settings',
                key: 'settings'
            },
        ]
    }

    const getBreadcrumbs = (pathName: string) => {
        const arr = pathName.split("/")
        const bread = arr.map((item) => ({
            title: item
        }))
        return bread
    }

    return (
        <Layout hasSider>
            <Sider style={siderStyle} width={250}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" items={menus} />
            </Sider>
            <Layout>
                <Header className='flex items-center' style={{ padding: 0, background: colorBgContainer }} >
                    <div className="px-4 flex justify-between items-center w-full">
                        <Logo />
                        <div>
                            <Dropdown menu={accountMenus}>
                                <Avatar src='/images/avt.avif' size='large' />
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Content className='flex flex-col gap-2' style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Breadcrumb items={getBreadcrumbs(pathName)}/>
                    <div style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                        <>Mohit</>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App