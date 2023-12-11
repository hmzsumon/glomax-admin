import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { useRouter } from 'next/router';
import {
	useApproveKycByIdMutation,
	useGetPendingKycByIdQuery,
} from '@/features/kyc/kycApi';
import { Button, Card, Col, ListGroup, Row, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const Kyc = () => {
	const router = useRouter();
	const { kycId } = router.query;
	const { data, isLoading, isSuccess, isError, error } =
		useGetPendingKycByIdQuery(kycId as string);
	const { kyc } = data || {};

	// for approve
	const [
		approveKycById,
		{
			isLoading: a_isLoading,
			isSuccess: a_isSuccess,
			isError: a_isError,
			error: a_error,
		},
	] = useApproveKycByIdMutation();

	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);

	// re reject handler
	const handleReReject = async () => {
		console.log('re reject');
	};

	// approve handler
	const handleApprove = async () => {
		approveKycById(kycId as string);
	};

	useEffect(() => {
		if (a_isSuccess) {
			toast.success('KYC approved successfully');
		}

		if (a_isError) {
			if (a_isError && a_error) {
				toast.error((a_error as fetchBaseQueryError).data?.message);
			}
		}
	}, [a_isSuccess, a_isError, a_error]);
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div>
					<Card>
						<Card.Body>
							<Card.Title className='text-center '>
								<span
									className={`text-capitalize ${
										kyc?.status === 'pending' && 'text-warning'
									} ${kyc?.status === 'approved' && 'text-success'} ${
										kyc?.status === 'rejected' && 'text-danger'
									} `}
								>
									{kyc?.name}
								</span>{' '}
								KYC Details
							</Card.Title>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<span>Full name</span>
									<span className='float-end'>{kyc?.name}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									<span>Rank</span>
									<span className='float-end'>{kyc?.rank}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									<span>User Id</span>
									<span className='float-end'>
										{kyc?.customer_id}
										<Link
											href={`/users/${kyc?.customer_id}`}
											passHref
											className='text-success ms-2 '
											style={{ cursor: 'pointer', fontSize: '0.8rem' }}
										>
											<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
										</Link>
									</span>
								</ListGroup.Item>

								<ListGroup.Item>
									<span>Amount</span>
									<span className='float-end'>
										{Number(kyc?.balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>

								<ListGroup.Item>
									<span>Email</span>
									<span className='float-end'>{kyc?.email}</span>
								</ListGroup.Item>

								<ListGroup.Item>
									<span>Submit Date</span>
									<span className='float-end '>
										{new Date(kyc?.date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
										})}
									</span>
								</ListGroup.Item>

								<ListGroup.Item>
									<span>Join date</span>
									<span className='float-end '>
										{new Date(kyc?.join_date).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
											hour: 'numeric',
											minute: 'numeric',
										})}
									</span>
								</ListGroup.Item>
								{/*Start NID1 */}
								<ListGroup.Item>
									<Row md={12}>
										<span>NID1</span>
									</Row>
									<Row md={12}>
										<span className='float-end '>
											<img src={kyc?.nid_1} alt='' />
										</span>
									</Row>
								</ListGroup.Item>
								{/*END NID1 */}

								{/*Start NID2 */}
								<ListGroup.Item>
									<Row md={12}>
										<span>NID1</span>
									</Row>
									<Row md={12}>
										<span className='float-end '>
											<img src={kyc?.nid_2} alt='' />
										</span>
									</Row>
								</ListGroup.Item>
								{/*END NID2 */}

								{/*Start Photo */}
								<ListGroup.Item>
									<Row md={12}>
										<span>NID1</span>
									</Row>
									<Row md={12}>
										<span className='float-end '>
											<img src={kyc?.photo} alt='' />
										</span>
									</Row>
								</ListGroup.Item>
								{/*END Photo */}
								{kyc?.status === 'pending' && (
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
				</div>
				{/* For Approve */}
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
							{/* Check box */}
							{/* <Form.Check
								type='checkbox'
								id='default-checkbox'
								label='Demo deposit'
								checked={is_demo}
								onChange={(e) => setIs_demo(e.target.checked)}
							/> */}
						</Modal.Body>
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose}>
								Close
							</Button>
							<Button variant='primary' onClick={handleApprove}>
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
						{/* <Modal.Body>
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
						</Modal.Body> */}
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose2}>
								Close
							</Button>
							<Button variant='danger' onClick={handleReReject}>
								Confirm Reject
							</Button>
						</Modal.Footer>
					</Modal>
				</>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Kyc;
