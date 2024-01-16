import React from 'react'
import { Button, message } from 'antd';
import logo from '@/assets/logo.png'
import TextField from '@/components/TextField/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useApiMutation from '@/hooks/useApiMutation';

import { LOGIN, USER_TOKEN, USER_DATA, SET_AUTH } from '@/utils/variables';
import { setLocalStorage } from '@/utils/localStorage';
import { useDispatch } from 'react-redux';

import { setIsAuth, setToken, setRole, setUserData } from '@/store/slices/features/auth.slice';
import "./style.scss"

export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const PASSWORD_VALIDATE = {
        minLength: { message: "Kamida 6 ta belgi kiriting", value: 6 },
    }
    const [messageApi, contextHolder] = message.useMessage();
    const { control, handleSubmit } = useForm()
    const { mutateAsync, isLoading } = useApiMutation(LOGIN)
    const submit = (data) => {
        mutateAsync(data, {
            onSuccess: ({ data }) => {
                setLocalStorage(USER_TOKEN, data.token)
                setLocalStorage(USER_DATA, data.user)
                setLocalStorage(SET_AUTH, true)
                dispatch(setIsAuth(true))
                dispatch(setToken(data.token))
                dispatch(setRole(data.user.role))
                dispatch(setUserData(data.user))
                navigate("/", { replace: true })

            },
            onError: err => {
                // console.log(err.response.data.message)
                messageApi.error(err.response.data.message)
            }
        })


    }


    return (
        <div>

            <div className='login'>
                {contextHolder}
                <div className='login-content'>
                    <div className="login-content-logo">
                        <img src={logo} alt="" />
                    </div>
                    <form onSubmit={handleSubmit(submit)} className="login-form">
                        <TextField
                            wrapperClass='login-form-item'
                            label='Login'
                            name='username'
                            control={control}
                            addonBefore={<UserOutlined />}
                            required
                        />
                        <TextField
                            wrapperClass='login-form-item'
                            label='Parol'
                            autoComplete="off"
                            name='password'
                            isPassword
                            control={control}
                            addonBefore={<LockOutlined />}
                            required
                            validation={PASSWORD_VALIDATE}
                        />
                        <Button loading={isLoading} className='login-form-button' htmlType="submit" block size="large" type="primary" >Kirish</Button>
                        {/* <Button className='login-form-button' htmlType="submit" block size="large" type="primary" >Kirish</Button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
