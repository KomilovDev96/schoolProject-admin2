import React from 'react'
import { useQuery } from 'react-query';
import { MaktabService } from '../MaktabPage/maktab.servise';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

export default function MaktabRead() {
    const mapTableData = (arr) => {
        return arr.map((el, index) => {
            return {
                ...el,
                no: index + 1,
                key: el._id,
            };
        });
    };
    const { id } = useParams()
    const { isLoading, data } = useQuery(
        ["getALl MaktabService"],
        () => MaktabService.getAll(id),
        {
            select: ({ data }) => {
                return data
            },
            onError(error) {
                console.log(error)
            },
        }
    );

    const columns = [
        {
            title: "Класс",
            dataIndex: "classes",
            key: "classes",
            render: (scholl) => {
                return (
                    <ul>
                        {scholl.map((clases) => (
                            <li key={clases.name}>
                                {clases.name}
                                <ul>
                                    {clases.days.map((days, index) => (
                                        <li key={index}>
                                            {days.name}
                                            <ul>
                                                {days.lessons.map((lesson, index) => (
                                                    <li>
                                                        {lesson.subject} - {lesson.teacher} - {lesson.roomNumber}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )
            }
        },

    ];
    return (
        <div>
            <Table dataSource={mapTableData(data || [])} isLoading={isLoading} columns={columns} />
        </div>
    )
}
