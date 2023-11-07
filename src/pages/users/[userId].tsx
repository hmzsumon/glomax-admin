import { useGetUserDetailsByIdQuery } from '@/features/auth/authApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { Accordion, Button, Col, Row } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Main } from 'next/document';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import path from 'path';

const UserInfo = () => {
	const router = useRouter();
	const userId = router.query.userId as string;

	const { data } = useGetUserDetailsByIdQuery(userId);
	const {
		user,
		aiRobotRecord,
		convertRecord,
		depositDetails,
		withdrawDetails,
		tradeRecord,
		team,
		transactions,
		activeMembers,
		allTeamMembers,
	} = data || {};

	console.log(data);

	return (
		<AdminLayout>
			<ProtectedRoute>
				<Card style={{ width: '100%' }}>
					<Card.Header className='text-center text-success font-weight-bold h5'>
						{user?.name}
						<span
							className={`float-end ${
								user?.is_active ? 'text-success' : 'text-danger'
							}`}
						>
							{user?.rank}
						</span>
					</Card.Header>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<span>User name</span>
							<span className='float-end'>{user?.username}</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>User Id</span>
							<span className='float-end'>{user?.customer_id}</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Email</span>
							<span className='float-end'>{user?.email}</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Phone</span>
							<span className='float-end'>{user?.phone}</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Total Team Member</span>
							<span className='float-end'>
								{allTeamMembers} / {activeMembers}
							</span>
						</ListGroup.Item>

						<ListGroup.Item>
							<span>Parent 1</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_1?.name}</span>
								<span className='float-end'>
									{user?.parent_1?.customer_id}
									<Link
										href={`/users/${user?.parent_1?.customer_id}`}
										passHref
										className='text-success ms-2 '
										style={{ cursor: 'pointer', fontSize: '0.8rem' }}
									>
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</Link>
								</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 2</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_2?.name}</span>
								<span className='float-end'>
									{user?.parent_2?.customer_id}
									<Link
										href={`/users/${user?.parent_2?.customer_id}`}
										passHref
										className='text-success ms-2 '
										style={{ cursor: 'pointer', fontSize: '0.8rem' }}
									>
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</Link>
								</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 3</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_3?.name}</span>
								<span className='float-end'>
									{user?.parent_3?.customer_id}
									<Link
										href={`/users/${user?.parent_3?.customer_id}`}
										passHref
										className='text-success ms-2 '
										style={{ cursor: 'pointer', fontSize: '0.8rem' }}
									>
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</Link>
								</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 4</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_4?.name}</span>
								<span className='float-end'>
									{user?.parent_3?.customer_id}
									<Link
										href={`/users/${user?.parent_4?.customer_id}`}
										passHref
										className='text-success ms-2 '
										style={{ cursor: 'pointer', fontSize: '0.8rem' }}
									>
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</Link>
								</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 5</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_5?.name}</span>
								<span className='float-end'>
									{user?.parent_3?.customer_id}
									<Link
										href={`/users/${user?.parent_5?.customer_id}`}
										passHref
										className='text-success ms-2 '
										style={{ cursor: 'pointer', fontSize: '0.8rem' }}
									>
										<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
									</Link>
								</span>
							</div>
						</ListGroup.Item>
					</ListGroup>
					<Accordion>
						{/* Start Balance Info */}
						<Accordion.Item eventKey='0'>
							<Accordion.Header>Balance Info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Main Balance</span>
									<span className='float-end'>
										{Number(user?.m_balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Ai Balance</span>
									<span className='float-end'>
										{Number(user?.ai_balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Active Ai Balance</span>
									<span className='float-end'>
										{Number(aiRobotRecord?.current_investment).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Refer Bonus</span>
									<span className='float-end'>
										{Number(user?.referral_bonus).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Total Deposit</span>
									<span className='float-end'>
										{Number(user?.total_deposit).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Total Withdraw</span>
									<span className='float-end'>
										{Number(user?.total_withdraw).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Trad Volume</span>
									<span className='float-end'>
										{Number(user?.trading_volume).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* End Balance Info */}
						<Accordion.Item eventKey='1'>
							<Accordion.Header>Trade commission</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Level 01</span>
									<span className='float-end'>
										{Number(user?.trade_com?.level_1).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Level 02</span>
									<span className='float-end'>
										{Number(user?.trade_com?.level_2).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Level 03</span>
									<span className='float-end'>
										{Number(user?.trade_com?.level_3).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* Start Deposit  */}
						<Accordion.Item eventKey='2'>
							<Accordion.Header>Deposit Info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Total Deposit</span>
									<span className='float-end'>
										{Number(depositDetails?.total_deposit).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Deposit Amount</span>
									<span className='float-end'>
										{Number(depositDetails?.last_deposit_amount).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Deposit Date</span>
									<span className='float-end'>
										{new Date(
											depositDetails?.last_deposit_date
										).toLocaleDateString()}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>First Deposit Amount</span>
									<span className='float-end'>
										{Number(
											depositDetails?.first_deposit_amount
										).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* End Deposit  */}
						{/* Start Withdraw */}
						<Accordion.Item eventKey='3'>
							<Accordion.Header>Withdraw Info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Total Withdraw</span>
									<span className='float-end'>
										{Number(withdrawDetails?.total_withdraw).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Withdraw Amount</span>
									<span className='float-end'>
										{Number(
											withdrawDetails?.last_withdraw_amount
										).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Withdraw Date</span>
									<span className='float-end'>
										{new Date(
											withdrawDetails?.last_withdraw_date
										).toLocaleDateString()}
									</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* End Withdraw */}
						{/* Start Convert */}
						<Accordion.Item eventKey='4'>
							<Accordion.Header>Convert Info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Total Convert</span>
									<span className='float-end'>
										{Number(convertRecord?.total_convert).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Convert Amount</span>
									<span className='float-end'>
										{Number(convertRecord?.last_convert?.amount).toLocaleString(
											'en-US',
											{
												style: 'currency',
												currency: 'USD',
											}
										)}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Convert Date</span>
									<span className='float-end'>
										{new Date(
											convertRecord?.last_convert?.date
										).toLocaleDateString()}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Last Convert From</span>
									{convertRecord?.last_convert?.from === 'main' ? (
										<span className='float-end'>
											{convertRecord?.last_convert?.from} {'->'} {''}
											Ai
										</span>
									) : (
										<span className='float-end'>
											{convertRecord?.last_convert?.from} {'->'} {''}
											Main
										</span>
									)}
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* End Convert */}

						{/* Start Trade Record */}
						{tradeRecord && (
							<Accordion.Item eventKey='5'>
								<Accordion.Header>Trade Record</Accordion.Header>
								<Accordion.Body>
									<ListGroup.Item>
										<span>Total Trade</span>
										<span className='float-end'>
											{Number(tradeRecord?.total_trade_amount).toLocaleString(
												'en-US',
												{
													style: 'currency',
													currency: 'USD',
												}
											)}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Total Profit</span>
										<span className='float-end'>
											{Number(tradeRecord?.total_profit).toLocaleString(
												'en-US',
												{
													style: 'currency',
													currency: 'USD',
												}
											)}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Total Loss</span>
										<span className='float-end'>
											{Number(tradeRecord?.total_loss).toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
											})}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Last Trade ID</span>
										<span className='float-end'>
											{tradeRecord?.last_trade_id}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Last Trade Date</span>
										<span className='float-end'>
											{new Date(
												tradeRecord?.last_trade_date
											).toLocaleDateString()}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Last Trade Type</span>
										<span className='float-end'>
											{tradeRecord?.last_trade_type}
										</span>
									</ListGroup.Item>
								</Accordion.Body>
							</Accordion.Item>
						)}
						{/* End Trade Record */}

						{/* Start Ai Record */}
						{aiRobotRecord && (
							<Accordion.Item eventKey='6'>
								<Accordion.Header>Ai Record</Accordion.Header>
								<Accordion.Body>
									<ListGroup.Item>
										<span>Current Investment</span>
										<span className='float-end'>
											{Number(aiRobotRecord?.current_investment).toLocaleString(
												'en-US',
												{
													style: 'currency',
													currency: 'USD',
												}
											)}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Created At</span>
										<span className='float-end'>
											{new Date(aiRobotRecord?.updatedAt).toLocaleDateString(
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
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Total Investment</span>
										<span className='float-end'>
											{Number(aiRobotRecord?.total_investment).toLocaleString(
												'en-US',
												{
													style: 'currency',
													currency: 'USD',
												}
											)}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Total Profit</span>
										<span className='float-end'>
											{Number(aiRobotRecord?.total_profit).toLocaleString(
												'en-US',
												{
													style: 'currency',
													currency: 'USD',
												}
											)}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Total Count</span>
										<span className='float-end'>
											{aiRobotRecord?.total_robot_count}
										</span>
									</ListGroup.Item>
									<hr />
									<ListGroup.Item>
										<span>Active Ai ID</span>
										<span className='float-end'>
											{aiRobotRecord?.active_robot_id}
											{/* <Link
												href={`/users/${user?.parent_3?.customer_id}`}
												passHref
												className='text-success ms-2 '
												style={{ cursor: 'pointer', fontSize: '0.8rem' }}
											>
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</Link> */}
										</span>
									</ListGroup.Item>
									<hr />

									<ListGroup.Item>
										<span>Last Ai Type</span>
										<span className='float-end'>
											{aiRobotRecord?.last_ai_type}
										</span>
									</ListGroup.Item>
								</Accordion.Body>
							</Accordion.Item>
						)}
						{/* End Ai Record */}

						{/* Start Team info */}
						<Accordion.Item eventKey='7'>
							<Accordion.Header>Team Info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Total Team Member</span>
									<span className='float-end'>
										{team?.level_1?.length +
											team?.level_2?.length +
											team?.level_3?.length}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>First Level Member </span>
									<span className='float-end'>{team?.level_1?.length}</span>
								</ListGroup.Item>

								<hr />
								<ListGroup.Item>
									<span>Second Level Member </span>
									<span className='float-end'>{team?.level_2?.length}</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Third Level Member </span>
									<span className='float-end'>{team?.level_3?.length}</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* End Team info */}
						{/* Start Transactions */}
						<Accordion.Item eventKey='8'>
							<Accordion.Header>Transactions</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<Row>
										<Col>
											<span>Date</span>
										</Col>
										<Col>
											<span>Type</span>
										</Col>
										<Col>
											<span>Amount</span>
										</Col>
										<Col className=''>
											<span>Purpose</span>
										</Col>
									</Row>
								</ListGroup.Item>
								<hr />
								{transactions?.map((transaction: any) => (
									<ListGroup.Item key={transaction._id}>
										<Row>
											<Col>
												<span>
													{new Date(transaction?.createdAt).toLocaleDateString(
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
											<Col>
												{transaction?.isCashIn && (
													<span className='text-success'>Cash In</span>
												)}
												{transaction?.isCashOut && (
													<span className='text-danger'>Cash Out</span>
												)}
											</Col>
											<Col>
												<span>
													{Number(transaction?.amount).toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</span>
											</Col>
											<Col>
												<span>{transaction?.purpose}</span>
											</Col>
										</Row>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<Row className='mt-2 '>
										<Col>
											<Link
												href={{
													pathname: '/transactions',
													query: { userId: user?._id },
												}}
											>
												<Button variant='primary' className='w-100'>
													Load More
												</Button>
											</Link>
										</Col>
									</Row>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/* Start Transactions */}

						{/* Login Info */}
						<Accordion.Item eventKey='9'>
							<Accordion.Header>Last login info</Accordion.Header>
							<Accordion.Body>
								<ListGroup.Item>
									<span>Date</span>
									<span className='float-end'>
										{new Date(user?.last_login_info?.date).toLocaleDateString()}
									</span>
								</ListGroup.Item>
								<hr />
								<ListGroup.Item>
									<span>Ip Address</span>
									<span className='float-end'>
										{user?.last_login_info?.ip_address}
									</span>
								</ListGroup.Item>
							</Accordion.Body>
						</Accordion.Item>
						{/*End Login Info */}
					</Accordion>
				</Card>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default UserInfo;
