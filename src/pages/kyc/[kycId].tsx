import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import React, { use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { useRouter } from 'next/router';
import {
	useApproveKycByIdMutation,
	useGetPendingKycByIdQuery,
	useRejectKycByIdMutation,
} from '@/features/kyc/kycApi';
import {
	Button,
	Card,
	Col,
	ListGroup,
	Row,
	Modal,
	Form,
} from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import Spinner from 'react-bootstrap/Spinner';
import { formatDate } from '@/lib/functions';

interface RejectionReason {
	value: string;
	label: string;
}

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

	// for reject
	const [
		rejectKycById,
		{
			isLoading: r_isLoading,
			isSuccess: r_isSuccess,
			isError: r_isError,
			error: r_error,
		},
	] = useRejectKycByIdMutation();

	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);
	// State for rejection reasons
	const [reasons, setReasons] = useState<RejectionReason[]>([]);

	// re reject handler
	const handleReReject = async () => {
		console.log('re reject with reasons', reasons);
		const reasonValues = reasons.map((reason) => reason.label);
		const data = {
			id: kycId as string,
			reasons: reasonValues,
		};

		rejectKycById(data);
		console.log(data);
	};

	useEffect(() => {
		if (r_isSuccess) {
			toast.success('KYC rejected successfully');
			handleClose2();
			router.push('/kyc');
		}

		if (r_isError) {
			if (r_isError && r_error) {
				toast.error((r_error as fetchBaseQueryError).data?.message);
			}
		}
	}, [r_isSuccess, r_isError, r_error]);

	// Explicitly define the type for options
	const rejectionReasonsOptions: RejectionReason[] = [
		{ value: 'document_issue', label: 'Document Not Clear' },
		{ value: 'information_mismatch', label: 'Information Mismatch' },
		// Add more rejection reasons as needed
	];

	// approve handler
	const handleApprove = async () => {
		approveKycById(kycId as string);
	};

	useEffect(() => {
		if (a_isSuccess) {
			toast.success('KYC approved successfully');
			handleClose();
			router.push('/kyc');
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
									<span>Nid No</span>
									<span className='float-end'>{kyc?.nid_no}</span>
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

								<ListGroup.Item>
									<span>Date of Birth</span>
									<span className='float-end '>
										{formatDate(kyc?.date_of_birth)}
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
								<span>Reject KYC</span>
							</Modal.Title>
						</Modal.Header>
						{r_isLoading ? (
							<div className='d-flex align-items-center justify-content-center'>
								<Spinner animation='border' role='status'>
									<span className='visually-hidden'>Loading...</span>
								</Spinner>
							</div>
						) : (
							<Modal.Body>
								<p className=' text-warning'>
									Are you sure you want to reject this KYC?
								</p>
								<div>
									<Form.Label htmlFor='rejection-reasons'>
										<span>Select reasons for rejection</span>
									</Form.Label>
									{/* Use react-select for a multi-select dropdown */}
									<Select
										id='rejection-reasons'
										isMulti
										options={rejectionReasonsOptions}
										value={reasons}
										onChange={(selectedOptions) =>
											setReasons(selectedOptions as RejectionReason[])
										}
									/>
								</div>
							</Modal.Body>
						)}
						<Modal.Footer>
							<Button variant='secondary' onClick={handleClose2}>
								Close
							</Button>
							<Button
								variant='danger'
								onClick={handleReReject}
								disabled={reasons.length === 0 || r_isLoading}
							>
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
