import { Button, Space, Table } from 'antd'
import api from "@/api";
import React, { useEffect } from 'react'
import { PORTFOLIO_GET_ALL, USER_DELETE, SCHOOL_GET_ALL } from '@/utils/variables';
import useApi from '@/hooks/useApi'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteConfirm from './DeleteConfirm/DeleteConfirm';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { MaktabService } from '../MaktabPage/maktab.servise';
import { useDispatch } from 'react-redux';
import { setUsers } from '@/store/slices/features/auth.slice';
export default function PortfolioPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const QureData = useQuery(
    ["getALl MaktabService"],
    async () => {
      return await api.get(`${SCHOOL_GET_ALL}`);
    },
    {
      select: ({ data }) => {

        return data
      },
      onError(error) {
        console.log(error)
      },
    }
  );
  const { isLoading: isloadnigUsers, data: dataUsersScholl } = QureData

  const redirect = (id) => {
    if (id) navigate(`/users/update/${id}`)
    else navigate("/users")
  }
  const redirectAdd = () => {
    navigate(`/users/add`)
  }

  const { data, isLoading, refetch } = useApi(PORTFOLIO_GET_ALL)
  const users = data?.data
  const mapTableData = (arr) => {
    return arr.map((el, index) => {
      return {
        ...el,
        no: index + 1,
        key: el._id,
      };
    });
  };
  const deleteItem = async (id) => {
    if (dataUsersScholl.length === 0) {
      await api.get(`${USER_DELETE}/${id}`)
    } else {
      const idSchool = await dataUsersScholl[0]._id
      await api.get(`${USER_DELETE}/${id}/${idSchool}`)
    }
    QureData.refetch()
    refetch()
  }
  const columns = [
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'id',
      key: '_id',
      dataIndex: '_id',
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Tahrirlash',
      dataIndex: '_id',
      key: '_id',
      render: (id) => (
        <Space>
          <Button icon={<EditOutlined />} shape="circle" onClick={() => redirect(id)} />
          <DeleteConfirm
            onConfirm={() => deleteItem(id)}
            button={(showModal) => <Button icon={<DeleteOutlined />} type="primary" danger shape="circle" onClick={showModal} />}
          />
        </Space>
      )
    },
  ];

  useEffect(() => {
    dispatch(setUsers(users))
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])
  return (
    <div>
      <div className="page-head">
        <div />
        <Button icon={<PlusOutlined />} type="primary" onClick={() => redirectAdd()}>Yaratish</Button>
      </div>

      <Table
        columns={columns}
        dataSource={mapTableData(users || [])}
        pagination={false}
        loading={isLoading}
        scroll={{ x: "max-content" }}
      />
    </div>
  )
}
