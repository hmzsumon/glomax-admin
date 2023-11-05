import { useGetAllUsersQuery } from '@/features/auth/authApi';
import { useGetDepositsQuery } from '@/features/deposit/depositApi';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { formatDate } from '@/lib/functions';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdminLayout } from '@layout';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';

type Deposit = {
	id: string;
	name: string;
	customer_id: string;
	amount: number;
	status: string;
	date: string;
	tnx_id: string;
	sl_no: number;
};

const Deposits = () => {
	const { data, isLoading, isSuccess, isError, error } = useGetDepositsQuery();
	const { deposits } = data || [];
	const [selectedTab, setSelectedTab] = useState('all');

	// Filter deposits based on selected tab's criteria
	const filteredDeposits = deposits?.filter((deposit: Deposit) => {
		if (selectedTab === 'all') return true;
		if (selectedTab === 'new') return deposit.status === 'pending';
		if (selectedTab === 'approve') return deposit.status === 'approved';
		if (selectedTab === 'rejected') return deposit.status === 'rejected';
		return true;
	});

	// Calculate total deposit amount based on the selected tab's criteria
	const totalAmount = filteredDeposits?.reduce((total: any, deposit: any) => {
		return total + deposit.amount;
	}, 0);

	const columns: GridColDef<any>[] = [
		{
			field: 'sl_no',
			headerName: 'SL No',
			width: 80,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.sl_no}</p>
				</div>
			),
		},
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
			field: 'amount',
			headerName: 'Amount',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>
						{Number(params.row.amount).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</p>
				</div>
			),
		},
		{
			field: 'tnx_id',
			headerName: 'Transaction ID',
			width: 300,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.tnx_id}</p>
				</div>
			),
		},

		{
			field: 'status',
			headerName: 'Status',
			width: 150,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'pending' && (
							<p className='text-warning '>
								<span>Pending</span>
							</p>
						)}
						{params.row.status === 'approved' && (
							<p className='text-success '>
								<span>Approved</span>
							</p>
						)}

						{params.row.status === 'rejected' && (
							<p className='text-danger '>
								<span>Rejected</span>
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
						<Link href={`/deposit/${params.row.id}`} passHref>
							<FontAwesomeIcon icon={faEye} />
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	deposits &&
		filteredDeposits.map((deposit: any) => {
			return rows.unshift({
				id: deposit._id,
				sl_no: deposit.sl_no,
				name: deposit.name,
				customer_id: deposit.customer_id,
				amount: deposit.amount,
				status: deposit.status,
				date: formatDate(deposit.createdAt),
				tnx_id: deposit.transactionId,
			});
		});
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div style={{ height: '100%', width: '100%' }}>
					<Card className='my-2 d-flex align-items-center '>
						<Card.Body className='gap-2 d-flex '>
							<Card.Text className='text-success h5'> All Deposit :</Card.Text>
							<Card.Text className=' text-success h5'>
								{deposits?.length}
							</Card.Text>
						</Card.Body>
					</Card>

					<Tabs
						defaultActiveKey='all'
						id='fill-tab-example'
						className='mb-3'
						fill
						onSelect={(k: any) => setSelectedTab(k)}
					>
						<Tab eventKey='all' title='All Deposits' className='mb-3'>
							Total Amount:{' '}
							{Number(totalAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</Tab>
						<Tab eventKey='new' title='New Deposits' className='mb-3'>
							New Deposits:{' '}
							{Number(totalAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</Tab>
						<Tab eventKey='approve' title=' Approve Deposits ' className='mb-3'>
							Approved Deposits:{' '}
							{Number(totalAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</Tab>
						<Tab eventKey='rejected' title='Rejected Deposits' className='mb-3'>
							Rejected Deposits:{' '}
							{Number(totalAmount).toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</Tab>
					</Tabs>

					<DataGrid rows={rows} columns={columns} />
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Deposits;
