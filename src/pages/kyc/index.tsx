import React from 'react';
import { useGetPendingKycQuery } from '@/features/kyc/kycApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { formatDate } from '@/lib/functions';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import { Box } from '@mui/material';

const KYCList = () => {
	const { data, isLoading } = useGetPendingKycQuery();
	const { kycList } = data || [];
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
			field: 'rank',
			headerName: 'Rank',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.rank}</p>
				</div>
			),
		},

		{
			field: 'balance',
			headerName: 'Balance',
			width: 130,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>
						{Number(params.row.balance).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
							maximumFractionDigits: 2,
						})}
					</p>
				</div>
			),
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
						<Link href={`/kyc/${params.row.id}`} passHref>
							<FontAwesomeIcon icon={faEye} />
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	kycList &&
		kycList.map((kyc: any) => {
			return rows.unshift({
				id: kyc._id,
				name: kyc.name,
				email: kyc.email,
				customer_id: kyc.customer_id,
				date: formatDate(kyc.createdAt),
				is_active: kyc.is_active,
				rank: kyc.rank,
				balance: kyc.balance,
			});
		});
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div style={{ height: '100%', width: '100%' }}>
					<Card className='my-2 d-flex align-items-center '>
						<Card.Body className='gap-2 d-flex '>
							<Card.Text className='text-success h5'> Total KYC :</Card.Text>
							<Card.Text className=' text-success h5'>
								{kycList?.length}
							</Card.Text>
						</Card.Body>
					</Card>
					<Box sx={{ height: 400, width: '100%' }}>
						<DataGrid rows={rows} columns={columns} loading={isLoading} />
					</Box>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default KYCList;
