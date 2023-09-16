import React from 'react';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { AdminLayout } from '@layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useRouter } from 'next/router';
import { useGetAiRobotQuery } from '@/features/aiRobot/aiRobotApi';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';

const AiRobot = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data, isLoading, isError, isSuccess, error } = useGetAiRobotQuery(id);
	const { aiRobot, aiRobotRecord, user } = data || {};
	let content = null;
	if (isLoading) {
		content = <div>Loading...</div>;
	}

	if (isError) {
		const err = error as fetchBaseQueryError;
		content = (
			<div>
				<h4 className='text-center text-danger'>{err.data?.message}</h4>
			</div>
		);
	}

	if (isSuccess) {
		content = (
			<Container>
				<Card>
					<Card.Header>
						<Card.Title as='h5' className='text-center'>
							<span>{user?.name}</span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<div>
									<span className='me-2'>Username</span>
									<span>{user?.username}</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>User ID</span>
									<span>{user?.customer_id}</span>
								</div>
							</Col>
						</Row>
						<Row className='mt-2 '>
							<Col>
								<div>
									<span className='me-2'>Main Balance</span>
									<span>
										{user?.m_balance.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>Total Active </span>
									<span>
										{user?.ai_balance.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className='mt-3'>
					<Card.Header>
						<Card.Title as='h5' className='text-center'>
							<span>AI Robot Record </span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col>
								<div>
									<span className='me-2'>Total Robot Created</span>
									<span>{aiRobotRecord?.total_robot_count}</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>Completed</span>
									<span>{aiRobotRecord?.t_close_robot}</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>
										<span className='text-danger'>Canceled</span>
									</span>
									<span>{aiRobotRecord?.t_cancel_robot}</span>
								</div>
							</Col>

							<Col>
								<div>
									<span className='me-2'>Total profit</span>
									<span>
										{aiRobotRecord?.total_profit.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
						</Row>
						<Row className='mt-2 '>
							<Col>
								<div>
									<span className='me-2'>Total Investment</span>
									<span>
										{aiRobotRecord?.total_investment.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>Current Investment</span>
									<span>
										{aiRobotRecord?.current_investment.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>Total Trade Charge</span>
									<span>
										{aiRobotRecord?.t_trade_charge.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
							<Col>
								<div>
									<span className='me-2'>Total C Charge</span>
									<span>
										{aiRobotRecord?.t_cancel_charge.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<Card className='mt-3'>
					<Card.Header>
						<Card.Title as='h5' className='text-center'>
							<span>AI Robot </span>
						</Card.Title>
					</Card.Header>
					<Card.Body>
						<ListGroup>
							<ListGroup.Item>
								<Row>
									<Col>
										<span className='me-5'>Status</span>
									</Col>
									<Col>
										<span>{aiRobot?.status}</span>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										<span className='me-5'>Created At</span>
									</Col>
									<Col>
										<span>
											{new Date(aiRobot?.createdAt).toLocaleDateString(
												'en-US',
												{
													year: 'numeric',
													month: 'short',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric',
												}
											)}
										</span>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										<span className='me-5'>Close At</span>
									</Col>
									<Col>
										<span>
											{new Date(aiRobot?.updatedAt).toLocaleDateString(
												'en-US',
												{
													year: 'numeric',
													month: 'short',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric',
												}
											)}
										</span>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										<span className='me-5'>Investment</span>
									</Col>
									<Col>
										<span>
											{aiRobot?.current_investment.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
											})}
										</span>
									</Col>
								</Row>
							</ListGroup.Item>
							{aiRobot?.status === 'cancelled' && (
								<>
									<ListGroup.Item>
										<Row>
											<Col>
												<span className='me-5'>
													<span className='text-danger'>Refund</span>
												</span>
											</Col>
											<Col>
												<span className='float-right '>
													{aiRobot?.refund_amount.toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</span>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<span className='me-5'>
													<span className='text-danger'>Cancel Charge</span>
												</span>
											</Col>
											<Col>
												<span className='float-right '>
													{aiRobot?.cancel_charge.toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</span>
											</Col>
										</Row>
									</ListGroup.Item>
								</>
							)}

							{aiRobot?.status === 'completed' && (
								<>
									<ListGroup.Item>
										<Row>
											<Col>
												<span className='me-5'>Profit</span>
											</Col>
											<Col>
												<span className='float-right '>
													{aiRobot?.take_profit.toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
														minimumFractionDigits: 2,
														maximumFractionDigits: 5,
													})}
												</span>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>
												<span className='me-5'>Grid</span>
											</Col>
											<Col>
												<span className='float-right '>{aiRobot?.grid_no}</span>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>
												<span className='me-5'>Percentage</span>
											</Col>
											<Col>
												<span className='float-right '>
													{aiRobot?.profit_percent}
												</span>
											</Col>
										</Row>
									</ListGroup.Item>
								</>
							)}

							<ListGroup.Item>
								<Row>
									<Col>
										<span className='me-5'>Pair</span>
									</Col>
									<Col>
										<span className='float-right '>{aiRobot?.pair}</span>
									</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card.Body>
				</Card>
			</Container>
		);
	}

	return (
		<AdminLayout>
			<ProtectedRoute>{content}</ProtectedRoute>
		</AdminLayout>
	);
};

export default AiRobot;
