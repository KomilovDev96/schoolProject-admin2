import { Layout, Menu } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import logo from "@/assets/logobe.png"
import logoM from "@/assets/logo.png"
import { Link, NavLink, useLocation } from 'react-router-dom';


import "./style.scss"
import { FormatPainterOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Sider } = Layout


const Sidebar = ({ collapsed, setCollapsed }) => {


    const [active, setActive] = useState()
    const { pathname } = useLocation()
    const role = useSelector((state) => state.auth.role)
    let items;
    if (role === 'admin') {
        items = [
            {
                label: "Фойдаланувчилар",
                key: "/users",
                icon: <ShoppingOutlined />
            },
            {
                label: "Мактаблар",
                key: "/maktab",
                icon: <FormatPainterOutlined />
            },
        ];
    } else {
        items = [
            {
                label: "Мактаблар",
                key: "/maktab",
                icon: <FormatPainterOutlined />
            },
        ];
    }


    const linkedItems = items.map((el) => {
        return {
            ...el,
            label: <Fragment>{el.label} <NavLink to={el.key} /></Fragment>
        }
    })



    useEffect(() => {
        const item = items.find((el) => pathname.startsWith(el.key))
        setActive(item?.key)
    }, [pathname])




    return (
        <Sider className='layout-sider' theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className='layout-sider-logo'>
                <Link to={"/"}><img src={collapsed ? logo : logoM} alt="png" /></Link>
            </div>
            <Menu className='layout-sider-menu' mode="inline" items={linkedItems} selectedKeys={[active || ""]} onSelect={({ key }) => setActive(key)} />
        </Sider>
    )
}

export default Sidebar