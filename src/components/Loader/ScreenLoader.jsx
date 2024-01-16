import { Spin } from 'antd'
import React from 'react'
import logo from "@/assets/logobe.png"
import "./loader.scss"
const ScreenLoader = () => {
	return (
		<div className='screen-loader'>
			<div className="screen-loader-content">
				<img src={logo} alt="" />
				<Spin />
			</div>
		</div>
	)
}

export default ScreenLoader