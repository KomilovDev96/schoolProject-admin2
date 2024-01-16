import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '@/hooks/useApi'

import { Button, Form, Input } from 'antd';
import { useMutation } from 'react-query';
import { userAddservises } from './adduser.servises';
export default function UserUpdatePage() {
    const navigate = useNavigate()
    const { mutateAsync } = useMutation(
        "add users",
        (data) => userAddservises.create(data),
        {
            onError(error) {
                console.log(error)
            },
            onSuccess(data) {
                navigate('/users')
            },
        }
    );

    const onFinish = async (values) => {
        mutateAsync(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="role"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your role!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Кушиш
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
