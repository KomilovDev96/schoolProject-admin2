import { Input, Typography } from 'antd'
import React from 'react'
import { Controller} from 'react-hook-form'

const { Password } = Input



const TextField = ({ name, control, required, wrapperClass, label, validation, isPassword, ...props }) => {

	const MyInput = isPassword ? Password : Input

	return (
		<Controller
			render={({
				field: { onChange, onBlur, value, name, ref },
				fieldState: { error },
			}) => (
				<div className={wrapperClass} style={{ width: "100%" }}>
					{label && <Typography.Text style={{ marginBottom: 4, display: "block" }} type={error && "danger"}>{label}</Typography.Text>}
					<MyInput
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						ref={ref}
						status={error && "error"}
						name={name}
						size="large"
						autoComplete='off'
						{...props}
					/>
					{error && <Typography.Text style={{ fontSize: 12 }} type="danger">{error.message}</Typography.Text>}
				</div>
			)}
			name={name}
			control={control}
			rules={{ required: required, ...validation }}
		/>
	)
}

export default TextField