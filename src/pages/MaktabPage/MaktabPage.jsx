import React, { useEffect } from 'react'
import api from "@/api";
import { useNavigate } from 'react-router-dom'
import { USER_DATA, SCHOLL_DELETE } from '@/utils/variables';
import { MaktabService } from './maktab.servise';
import { useQuery } from 'react-query';
import { Button, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteConfirm from '../UserPage/DeleteConfirm/DeleteConfirm';
export default function MaktabPage() {
    const navigate = useNavigate()


    const readAll = (id) => {
        navigate(`/maktab/${id}`)
    }

    const mapTableData = (arr) => {
        return arr.map((el, index) => {
            return {
                ...el,
                no: index + 1,
                key: el._id,
            };
        });
    };
    const userParse = localStorage.getItem(USER_DATA)
    const user = JSON.parse(userParse)
    const admin = user?.role
    const userID = user.id

    const redirect = (id) => {
        if (id) navigate(`/maktab/update/${userID}`)
        else navigate("/maktab/add")
    }
    const QureData = useQuery(
        ["getALl MaktabService"],
        () => MaktabService.getAll(userID, admin),
        {
            select: ({ data }) => {
                return data
            },
            onError(error) {
                console.log(error)
            },
        }

    );
    const { isLoading, data } = QureData
    console.log(data)
    const deleteItem = async (id) => {
        await api.delete(`${SCHOLL_DELETE}/${id}`)
        QureData.refetch()

    }
    const columns = [
        {
            title: 'имя',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Классы',
            key: 'classes',
            dataIndex: 'classes',
            render: (data, index) => {
                return <div key={index}>
                    {data.map((tag, index) => {
                        return (
                            <Tag color={"orange"} key={index}>
                                {tag.name}
                            </Tag>
                        );
                    })}
                </div>
            }
        },
        {
            title: 'Дни',
            key: 'classes',
            dataIndex: 'classes',
            render: (days, index) => {
                return <div >
                    {days.map((days, index) => {
                        return (
                            <div key={index}>
                                {days.days.map((day, index) => {
                                    return (
                                        <Tag color={"purple"} key={index}>
                                            {day.name}
                                        </Tag>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
        },
        {
            title: 'Придметы Учителя Номер комнот',
            key: 'classes',
            dataIndex: 'classes',
            render: (days) => {
                return <div>
                    {days.map((days, index) => {
                        return (
                            <div key={index}>
                                {days.days.map((day, index) => {
                                    return (
                                        day.lessons.map((lesson, index) => (
                                            <div key={index}>
                                                <Tag color={"green"} key={day}>
                                                    {lesson.teacher}
                                                </Tag>
                                                <Tag color={"yellow"} key={day}>
                                                    {lesson.roomNumber}
                                                </Tag>
                                                <Tag color={"blue"} key={day}>
                                                    {lesson.subject}
                                                </Tag>
                                            </div>
                                        ))
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            }
        },
        {
            title: 'Tahrirlash',
            dataIndex: '_id',
            key: '_id',
            render: (id) => (
                <Space>
                    <DeleteConfirm
                        onConfirm={() => deleteItem(id)}
                        button={(showModal) => <Button icon={<DeleteOutlined />} type="primary" danger shape="circle" onClick={showModal} />}
                    />
                    <Button icon={<EyeOutlined />} ghost type="primary" onClick={() => readAll(id)}>
                        Ko'rish
                    </Button>
                </Space>
            )
        }
    ];
    return (
        <div>
            <div className="page-head">
                <div />
                <Button icon={<PlusOutlined />} type="primary" onClick={() => redirect()}>Yaratish</Button>
            </div>
            <Table
                columns={columns}
                dataSource={mapTableData(data || [])}
                pagination={false}
                loading={isLoading}
                scroll={{ x: "max-content" }}
            />

        </div>
    )
}
