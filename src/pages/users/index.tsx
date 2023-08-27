import React from 'react';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useGetAllUsersQuery } from '@/features/auth/authApi';
import { formatDate } from '@/lib/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

const Users = () => {
	const { data, isLoading, isSuccess, isError, error } = useGetAllUsersQuery();
	const { users } = data || [];
	const columns = [
		{
			field: 'date',
			headerName: 'Created At',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.date}</p>
				</div>
			),
		},
		{
			field: 'name',
			headerName: 'Name',
			width: 150,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.name}</p>
				</div>
			),
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
			renderCell: (params: any) => (
				<div className=''>
					<p>{params.row.email}</p>
				</div>
			),
		},

		{
			field: 'customer_id',
			headerName: 'Customer ID',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.customer_id}</p>
				</div>
			),
		},

		{
			field: 'is_active',
			headerName: 'Status',
			width: 150,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.is_active ? (
							<p className='text-success '>
								<span>Active</span>
							</p>
						) : (
							<p className='text-danger '>
								<span>Inactive</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 60,
			renderCell: (params: any) => {
				return (
					<div
						className='d-flex align-items-center justify-content-center w-100'
						style={{ cursor: 'pointer' }}
					>
						<Link href={`/users/${params.row.customer_id}`} passHref>
							<FontAwesomeIcon icon={faEye} />
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	users &&
		users.map((user: any) => {
			return rows.unshift({
				id: user._id,
				name: user.name,
				email: user.email,
				customer_id: user.customer_id,
				date: formatDate(user.createdAt),
				is_active: user.is_active,
			});
		});
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div style={{ height: 300, width: '100%' }}>
					<Card className='my-2 d-flex align-items-center '>
						<Card.Body className='gap-2 d-flex '>
							<Card.Text className='text-success h5'> Total Users :</Card.Text>
							<Card.Text className=' text-success h5'>
								{users?.length}
							</Card.Text>
						</Card.Body>
					</Card>

					<DataGrid rows={rows} columns={columns} />
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Users;
