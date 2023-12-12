import {
	faArrowDown,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Withdraw from '../../pages/withdraws/[id]';
import { useGetBalanceInfoQuery } from '@/features/company/companyApi';

const UsersCard = ({ company }: any) => {
	const { data, isError, isLoading, isSuccess, error } =
		useGetBalanceInfoQuery();
	const { balanceInfo } = data || {};
	const {
		total_ai_active_balance,
		total_ai_balance,
		total_main_balance,
		total_trade_volume,
		total_e_balance,
	} = balanceInfo || {};
	const { users } = company || {};

	const totalBalance =
		total_main_balance + total_ai_balance + total_ai_active_balance;

	const activeBalance =
		total_main_balance +
		total_ai_active_balance +
		total_ai_balance -
		total_trade_volume;
	const cost = company?.withdraw?.total_withdraw_amount + totalBalance;
	const netProfit = company?.deposit?.total_deposit_amount - cost;
	return (
		<div className=''>
			<Card bg='primary' text='white' className='mb-4'>
				{isLoading ? (
					<h4 className='text-center '>Loading...</h4>
				) : (
					<Card.Body className='pb-0 d-flex justify-content-between align-items-start'>
						<div>
							<div>
								<h5>User Info</h5>
								<div className='gap-3 d-flex'>
									<p>Total Users: {users?.total_users}</p>
									<p>New Users: {users?.new_users}</p>
									<p>Active Users: {users?.total_active_users}</p>
								</div>
							</div>

							<div>
								<h5>User Earn Balance</h5>
								<div className='gap-3 d-flex'>
									<p>Total Earn Balance: {total_e_balance}</p>
								</div>
							</div>
							<div>
								<h5>User Balance Info</h5>
								<div className='gap-3 d-flex'>
									<p>
										Main Balance:{' '}
										{Number(total_main_balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Active Balance:
										{Number(activeBalance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Ai Balance:{' '}
										{Number(total_ai_balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Ai Active Balance:{' '}
										{Number(total_ai_active_balance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
								</div>
							</div>
							<div>
								<h5>Deposit & Withdraw info</h5>
								<div className='gap-3 d-flex'>
									<p>
										Total Deposit:{' '}
										{Number(
											company?.deposit?.total_deposit_amount
										).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Total Withdraw:
										{Number(
											company?.withdraw?.total_withdraw_amount
										).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Total Balance:{' '}
										{Number(totalBalance).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
									<p>
										Net Profit:{' '}
										{Number(netProfit).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</p>
								</div>
							</div>
						</div>
						<Dropdown align='end'>
							<Dropdown.Toggle
								as='button'
								bsPrefix='btn'
								className='p-0 text-white shadow-none btn-link rounded-0'
								id='dropdown-chart1'
							>
								<FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href='/users'>Action</Dropdown.Item>
								<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
								<Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Card.Body>
				)}

				{/* <div className='mx-3 mt-3' style={{ height: '70px' }}>
					<Line
						options={{
							plugins: {
								legend: {
									display: false,
								},
							},
							maintainAspectRatio: false,
							scales: {
								x: {
									grid: {
										display: false,
										drawBorder: false,
									},
									ticks: {
										display: false,
									},
								},
								y: {
									min: 0,
									max: 200,
									display: false,
									grid: {
										display: false,
									},
									ticks: {
										display: false,
									},
								},
							},
							elements: {
								line: {
									borderWidth: 1,
									tension: 0.4,
								},
								point: {
									radius: 4,
									hitRadius: 10,
									hoverRadius: 4,
								},
							},
						}}
						data={{
							labels: [
								'01-08-2023',
								'02-08-2023',
								'03-08-2023',
								'04-08-2023',
								'05-08-2023',
								'06-08-2023',
							],
							datasets: [
								{
									label: 'Users count',
									backgroundColor: 'transparent',
									borderColor: 'rgba(255,255,255,.55)',
									data: [10, 59, 84, 84, 51, 100],
								},
							],
						}}
					/>
				</div> */}
			</Card>
		</div>
	);
};

export default UsersCard;
