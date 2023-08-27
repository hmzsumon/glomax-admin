import { useGetUserDetailsByIdQuery } from '@/features/auth/authApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { Accordion } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const UserInfo = () => {
	const router = useRouter();
	const userId = router.query.userId as string;

	const { data } = useGetUserDetailsByIdQuery(userId);
	const { user } = data || {};

	return (
		<AdminLayout>
			<ProtectedRoute>
				<Card style={{ width: '100%' }}>
					<Card.Header className='text-center text-success font-weight-bold h5'>
						{user?.name}
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
							<span>Parent 1</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_1?.name}</span>
								<span className='float-end'>{user?.parent_1?.customer_id}</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 2</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_2?.name}</span>
								<span className='float-end'>{user?.parent_2?.customer_id}</span>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<span>Parent 3</span>
							<div className='flex-column d-flex float-end'>
								<span className='float-end'>{user?.parent_3?.name}</span>
								<span className='float-end'>{user?.parent_3?.customer_id}</span>
							</div>
						</ListGroup.Item>
					</ListGroup>
					<Accordion>
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
									<span>Active Balance</span>
									<span className='float-end'>
										{Number(user?.active_balance).toLocaleString('en-US', {
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
						<Accordion.Item eventKey='2'>
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
					</Accordion>
				</Card>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default UserInfo;
