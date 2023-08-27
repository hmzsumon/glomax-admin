import {
	faArrowDown,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const UsersCard = ({ users }: any) => {
	return (
		<div className='col-sm-6 col-lg-3'>
			<Card bg='primary' text='white' className='mb-4'>
				<Card.Body className='pb-0 d-flex justify-content-between align-items-start'>
					<div>
						<div className=''>
							<p>New Users: {users?.new_users}</p>
							<p>Active Users: {users?.total_active_users}</p>
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
				<div className='mx-3 mt-3' style={{ height: '70px' }}>
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
				</div>
			</Card>
		</div>
	);
};

export default UsersCard;
