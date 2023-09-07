import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import {
	useApproveDepositMutation,
	useGetDepositByIdQuery,
	useGetDepositsQuery,
	useRejectDepositMutation,
} from '@/features/deposit/depositApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useRouter } from 'next/router';

import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import {
	useApproveWithdrawMutation,
	useGetWithdrawByIdQuery,
} from '@/features/withdraw/withdrawApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import CopyToClipboard from '@/lib/CopyToClipboard';

const Withdraw = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data, isLoading, isSuccess, isError, error } =
		useGetWithdrawByIdQuery(id as string, {
			skip: !id,
		});
	const { withdraw } = data || {};
	const {
		amount,
		net_amount,
		charge,
		customer_id,
		is_approved,
		is_rejected,
		name,
		phone,
		status,
		transactionId,
		user_id,
		_id,
		method,
	} = withdraw || {};

	const [reason, setReason] = useState('Transaction Id not matching');
	const [tnxId, setTnxId] = useState('');
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);

	const [
		approveWithdraw,
		{
			isLoading: a_isLoading,
			isError: a_isError,
			isSuccess: a_isSuccess,
			error: a_error,
		},
	] = useApproveWithdrawMutation();

	const [
		rejectDeposit,
		{
			isSuccess: r_isSuccess,
			isError: r_isError,
			error: r_error,
			isLoading: r_isLoading,
		},
	] = useRejectDepositMutation();

	// approve handler
	const handleApprove = async () => {
		const data = {
			id: _id,
			tnxId,
		};
		approveWithdraw(data);
	};

	useEffect(() => {
		if (a_isSuccess) {
			setShow(false);
			toast.success('Withdraw approved successfully');
			router.push('/withdraws');
		}

		if (a_isError && a_error) {
			toast.error((a_error as fetchBaseQueryError).data?.message);
		}
	}, [a_isSuccess, a_isError]);

	// reject handler
	const handleReject = async () => {
		const data = {
			id: _id,
			reason,
		};
		rejectDeposit(data);
	};

	useEffect(() => {
		if (r_isSuccess) {
			setShow2(false);
			toast.success('Deposit rejected successfully');
			router.push('/deposit');
		}

		if (r_isError && r_error) {
			toast.error((r_error as fetchBaseQueryError).data?.message);
		}
	}, [r_isSuccess, r_isError]);

	return (
		<AdminLayout>
			<ProtectedRoute>
				<Card>
					<Card.Body>
						<Card.Title className='text-center '>
							<span
								className={`text-capitalize ${
									status === 'pending' && 'text-warning'
								} ${status === 'approved' && 'text-success'} ${
									status === 'rejected' && 'text-danger'
								} `}
							>
								{withdraw?.status}
							</span>{' '}
							Withdraw Details
						</Card.Title>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<span>User name</span>
								<span className='float-end'>{name}</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>User Id</span>
								<span className='float-end'>{customer_id}</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Phone</span>
								<span className='float-end'>{phone}</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Amount</span>
								<span className='float-end'>
									{Number(amount).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Charge</span>
								<span className='float-end '>
									{Number(charge).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</span>
							</ListGroup.Item>
							<ListGroup.Item>
								<span>Net Amount</span>
								<span className='gap-1 float-end text-danger d-flex '>
									{Number(net_amount).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
									<CopyToClipboard text={net_amount} />
								</span>
							</ListGroup.Item>
							{method?.name === 'crypto' && (
								<>
									<ListGroup.Item>
										<span>Network</span>
										<span className='float-end'>{method?.network}</span>
									</ListGroup.Item>
									<ListGroup.Item>
										<span>Address</span>
										<span className='gap-1 float-end d-flex'>
											{method?.address}
											<CopyToClipboard text={method?.address} />
										</span>
									</ListGroup.Item>
								</>
							)}

							{method?.name === 'binance' && (
								<>
									<ListGroup.Item>
										<span>Binance Pay ID</span>
										<span className='gap-1 float-end d-flex'>
											{method?.pay_id}
											<CopyToClipboard text={method?.pay_id} />
										</span>
									</ListGroup.Item>
								</>
							)}
							{status === 'pending' && (
								<div className='gap-2 mt-2 d-grid'>
									<Button variant='success' onClick={handleShow}>
										<span>Approve</span>
									</Button>{' '}
									<Button variant='danger' onClick={handleShow2}>
										<span>Reject</span>
									</Button>{' '}
								</div>
							)}
						</ListGroup>
					</Card.Body>
				</Card>
				<>
					<Modal show={show} onHide={handleClose} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>
								<span>Approve Deposit</span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p className=' text-warning'>
								Are you sure you want to approve this deposit?
							</p>
							<div>
								<Form.Label htmlFor='basic-url'>
									<span>Enter Transaction id</span>
								</Form.Label>
								<Form.Control
									placeholder='Enter Transaction id'
									aria-label='Username'
									aria-describedby='basic-addon1'
									value={tnxId}
									onChange={(e) => setTnxId(e.target.value)}
								/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
							<Button
								variant='primary'
								onClick={handleApprove}
								disabled={tnxId === ''}
							>
								Approve
							</Button>
						</Modal.Footer>
					</Modal>
				</>
				{/* for reject */}
				<>
					<Modal show={show2} onHide={handleClose2} animation={false}>
						<Modal.Header closeButton>
							<Modal.Title>
								<span>Reject Deposit</span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<p className=' text-warning'>
								Are you sure you want to reject this deposit?
							</p>
							<div>
								<Form.Label htmlFor='basic-url'>
									<span>Enter reason for rejection</span>
								</Form.Label>
								<Form.Control
									placeholder='Enter reason for rejection'
									aria-label='Username'
									aria-describedby='basic-addon1'
									value={reason}
									onChange={(e) => setReason(e.target.value)}
								/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose2}>
								Close
							</Button>
							<Button variant='danger' onClick={handleReject}>
								Confirm Reject
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Withdraw;
