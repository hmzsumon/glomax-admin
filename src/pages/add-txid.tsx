import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAddTxIdMutation } from '@/features/deposit/depositApi';
import TxIds from '@/components/Deposit/TxIds';

const AddTxId = () => {
	const [addTxId, { isLoading, isError, isSuccess, error }] =
		useAddTxIdMutation();
	const [txId, setTxId] = useState('');
	const [amount, setAmount] = useState('');

	// handle change
	const handleTxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'txId') {
			setTxId(e.target.value);
		} else if (e.target.name === 'amount') {
			setAmount(e.target.value);
		}
	};

	// handle submit
	const handleSubmit = () => {
		const data = {
			txId,
			amount: Number(amount),
		};

		addTxId(data);
	};

	// show toast
	useEffect(() => {
		if (isSuccess) {
			toast.success('Transaction Id added successfully');
			setTxId('');
			setAmount('');
		}

		if (isError) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<AdminLayout>
			<ProtectedRoute>
				<div>
					<h6 className='font-semibold text-center'>Add Transaction Id</h6>

					<div>
						<Form.Control
							type='text'
							placeholder='Normal text'
							name='txId'
							value={txId}
							onChange={handleTxIdChange}
						/>
						<br />
						<Form.Control
							type='number'
							placeholder='Amount'
							name='amount'
							value={amount}
							onChange={handleTxIdChange}
						/>
					</div>
					<div className='my-3 d-grid'>
						<Button
							variant='primary w-full'
							type='button'
							onClick={handleSubmit}
							disabled={isLoading || !txId || !amount}
						>
							<span>Submit</span>
						</Button>
					</div>
					<div>
						<TxIds />
					</div>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default AddTxId;
