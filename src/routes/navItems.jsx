import { ShoppingOutlined, FormatPainterOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const items = [
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

const linkedItems = items.map((el) => {
	return {
		...el,
		label: <Fragment>{el.label} <NavLink to={el.key} /></Fragment>
	}
})

export default linkedItems