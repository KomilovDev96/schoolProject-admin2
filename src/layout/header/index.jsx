import { CloseSquareOutlined, FormatPainterOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Typography } from 'antd'
import React from 'react'
import { removeLocalStorage } from '@/utils/localStorage';

import { LOGIN, USER_TOKEN, USER_DATA, SET_AUTH } from '@/utils/variables';
const { Header } = Layout


const Navbar = ({ title }) => {

	const logout = () => {
		removeLocalStorage(USER_TOKEN)
		removeLocalStorage(USER_DATA)
		removeLocalStorage(SET_AUTH)
		window.location.reload()
	}

	const items = [
		{
			key: '1',
			label: "Chiqish",
			icon: <LogoutOutlined />,
			danger: true,
			onClick: logout
		}
	]

	return (
		<Header className='layout-content-head' >
			<Typography.Title level={4}>{title}</Typography.Title>
			<Dropdown menu={{ items }} trigger={["click"]}>
				<div className='user-menu'>
					{/* <Typography.Text >{userData?.login}</Typography.Text> */}
					<Avatar shape="square" icon={<CloseSquareOutlined />} />
				</div>
			</Dropdown>
		</Header>
	)
}

export default Navbar