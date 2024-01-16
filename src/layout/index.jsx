import React, { Suspense, useState } from 'react';
import { Layout } from 'antd';
import Navbar from './header';
import Sidebar from './sidebar';
const { Content } = Layout;
import PageLoader from '@/components/Loader/PageLoader';

import "./style.scss"

const AppLayout = ({ title, children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const currentYear = new Date().getFullYear()
    return (
        <Layout className='layout'>
            <Sidebar setCollapsed={setCollapsed} collapsed={collapsed} />
            <Layout className="layout-content">
                <Navbar title={title} />
                <Content className='layout-content-pages'>
                    <Suspense fallback={<PageLoader />}>
                        {children}
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;