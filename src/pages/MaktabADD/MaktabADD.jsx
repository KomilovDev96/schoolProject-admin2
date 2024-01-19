import React, { useState } from 'react';
import { Form, Input, Button, Select, TimePicker, Space, Checkbox, Radio, Col, Row } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { addSChoolADmin } from './scholl.servises';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

const { Option } = Select;

const MaktabADD = () => {
    const navigate = useNavigate()
    const { mutateAsync, refetch } = useMutation(
        "add school",
        (data) => addSChoolADmin.create(data),
        {
            onError(error) {
                console.log(error)
            }
        }
    );
    const [idUser, setIdUser] = useState(null)
    const adminRole = useSelector((state) => state.auth.userData)
    const users = useSelector((state) => state.auth.users)

    const [form] = Form.useForm();

    console.log(adminRole.id)

    const onFinish = async (values) => {
        try {
            if (adminRole.role != "admin") {
                const combinedObject = Object.assign({}, values, { userID: adminRole.id });
                mutateAsync(combinedObject)
                navigate('/maktab')
            }
            else {
                mutateAsync(values)
                navigate('/maktab')
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };
    const onChange = (e) => {
        setIdUser(e.target.value);
    };

    return (
        <Form
            form={form}
            name="school-schedule-form"
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
        >
            <Form.Item
                label="School Name"
                name="name"
                rules={[{ required: true, message: 'Please input the school name!' }]}
            >
                <Input />
            </Form.Item>
            {adminRole.role === "admin" && <Form.Item
                name="userID"
            >
                <Radio.Group onChange={(e) => onChange(e)}>
                    <Space direction="vertical">
                        {users.map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    <Radio value={item._id}>{item.username}</Radio>
                                </Col>
                            </Row>
                        ))}
                    </Space>
                </Radio.Group>
            </Form.Item>}

            <Form.List name="classes">
                {(classFields, { add: addClass, remove: removeClass }) => (
                    <>
                        {classFields.map((classField, classIndex) => (
                            <div key={classIndex}>
                                <Form.Item
                                    label={`Class ${classIndex + 1} Name`}
                                    {...classField}
                                    name={[classField.name, 'name']}
                                    fieldKey={[classField.fieldKey, 'name']}
                                    rules={[{ required: true, message: 'Please input the class name!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.List
                                    name={[classField.name, 'days']}
                                    initialValue={[{ name: 'Dushanba', lessons: [] }]}
                                >
                                    {(dayFields, { add: addDay, remove: removeDay }) => (
                                        <>
                                            {dayFields.map((dayField, dayIndex) => (
                                                <div key={dayIndex}>
                                                    <Form.Item
                                                        label={`Day ${dayIndex + 1}`}
                                                        {...dayField}
                                                        name={[dayField.name, 'name']}
                                                        fieldKey={[dayField.fieldKey, 'name']}
                                                    >
                                                        <Select style={{ width: 120 }}>
                                                            <Option value="Dushanba">Dushanba</Option>
                                                            <Option value="Seshanba">Seshanba</Option>
                                                            <Option value="Chorshanba">Chorshanba</Option>
                                                            <Option value="Payshanba">Payshanba</Option>
                                                            <Option value="Juma">Juma</Option>
                                                            <Option value="Shanba">Shanba</Option>
                                                        </Select>
                                                    </Form.Item>

                                                    <Form.List
                                                        name={[dayField.name, 'lessons']}
                                                        initialValue={[{}]}
                                                    >
                                                        {(lessonFields, { add: addLesson, remove: removeLesson }) => (
                                                            <>
                                                                {lessonFields.map((lessonField, lessonIndex) => (
                                                                    <div key={lessonIndex}>
                                                                        <Form.Item
                                                                            label={`Lesson ${lessonIndex + 1}`}
                                                                            {...lessonField}
                                                                            name={[lessonField.name, 'subject']}
                                                                            fieldKey={[lessonField.fieldKey, 'subject']}
                                                                        >
                                                                            <Input placeholder="Subject" />
                                                                        </Form.Item>

                                                                        <Form.Item
                                                                            label={`Teacher ${lessonIndex + 1}`}
                                                                            {...lessonField}
                                                                            name={[lessonField.name, 'teacher']}
                                                                            fieldKey={[lessonField.fieldKey, 'teacher']}
                                                                        >
                                                                            <Input placeholder="Teacher" />
                                                                        </Form.Item>

                                                                        <Form.Item
                                                                            label={`Room Number ${lessonIndex + 1}`}
                                                                            {...lessonField}
                                                                            name={[lessonField.name, 'roomNumber']}
                                                                            fieldKey={[lessonField.fieldKey, 'roomNumber']}
                                                                        >
                                                                            <Input placeholder="Room Number" />
                                                                        </Form.Item>

                                                                        <Form.Item
                                                                            label={`Start Time ${lessonIndex + 1}`}
                                                                            {...lessonField}
                                                                            name={[lessonField.name, 'startDate']}
                                                                            fieldKey={[lessonField.fieldKey, 'startDate']}
                                                                        >
                                                                            <TimePicker format="HH:mm" />
                                                                        </Form.Item>

                                                                        <Form.Item
                                                                            label={`End Time ${lessonIndex + 1}`}
                                                                            {...lessonField}
                                                                            name={[lessonField.name, 'endDate']}
                                                                            fieldKey={[lessonField.fieldKey, 'endDate']}
                                                                        >
                                                                            <TimePicker format="HH:mm" />
                                                                        </Form.Item>
                                                                    </div>
                                                                ))}
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => addLesson()}
                                                                    >
                                                                        Add Lesson
                                                                    </Button>
                                                                </Form.Item>
                                                            </>
                                                        )}
                                                    </Form.List>

                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => removeDay(dayIndex)}
                                                        >
                                                            Remove Day
                                                        </Button>
                                                    </Form.Item>
                                                </div>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => addDay()}
                                                >
                                                    Add Day
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => removeClass(classIndex)}
                                    >
                                        Remove Class
                                    </Button>
                                </Form.Item>
                            </div>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => addClass()}
                            >
                                Add Class
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit" >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MaktabADD;
