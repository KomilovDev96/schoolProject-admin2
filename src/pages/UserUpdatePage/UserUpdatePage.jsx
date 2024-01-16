import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '@/hooks/useApi'
import { USERS_GET_ONE, USER_UPDATE } from '@/utils/variables';
import { Button, Checkbox, Form, Input } from 'antd';
import useApiMutationID from '@/hooks/useApiMutation';
import { UsersService } from './portfolio.service';
import { useMutation } from 'react-query';
export default function UserUpdatePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data } = useApi(`${USERS_GET_ONE}/${id}`, { enabled: Boolean(id), suspense: true, keepPreviousData: false })
    const { mutateAsync } = useMutation(
        "update users",
        (data) => UsersService.update(id, data),
        {
            onError(error) {
                console.log(error)
            },
            onSuccess() {
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
                        Узгартириш
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
