import { useGetAllUsersQuery } from '@/features/auth/authApi';
import {
	useGetDepositsQuery,
	useGetTxIdsQuery,
} from '@/features/deposit/depositApi';
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
	is_demo: boolean;
};

const TxIds = () => {
	const { data, isLoading, isSuccess, isError, error } = useGetTxIdsQuery();
	const { txIds } = data || [];

	const columns: GridColDef<any>[] = [
		{
			field: 'tx_id',
			headerName: 'Tx Id',
			width: 550,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.tx_id}</p>
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
	];

	const rows: any = [];

	txIds &&
		txIds.map((deposit: any) => {
			return rows.unshift({
				id: deposit._id,
				amount: deposit.amount,
				tx_id: deposit.tx_id,
			});
		});
	return (
		<div style={{ height: '100%', width: '100%' }}>
			<Card className='my-2 d-flex align-items-center '>
				<Card.Body className='gap-2 d-flex '>
					<Card.Text className='text-success h5'> All Tx Ids :</Card.Text>
					<Card.Text className=' text-success h5'>{txIds?.length}</Card.Text>
				</Card.Body>
			</Card>

			<DataGrid rows={rows} columns={columns} />
		</div>
	);
};

export default TxIds;
