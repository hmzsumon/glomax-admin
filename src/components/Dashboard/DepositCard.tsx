import {
	faArrowUp,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const DepositCard = ({ deposit }: any) => {
	return (
		<div>
			<Card bg='info' text='white' className='mb-4'>
				<Card.Body className='pb-0 d-flex justify-content-between align-items-start'>
					<div>
						<div className=''>
							<p>
								New Deposit:{' '}
								{Number(deposit?.new_deposit_amount).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
								<sup>{deposit?.new_deposit_count}</sup>
							</p>
							<p>
								Total Deposit:{' '}
								{Number(deposit?.total_deposit_amount).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
								<sup>{deposit?.total_deposit_count}</sup>
							</p>
						</div>
					</div>
					<Dropdown align='end'>
						<Dropdown.Toggle
							as='button'
							bsPrefix='btn'
							className='p-0 text-white shadow-none btn-link rounded-0'
							id='dropdown-chart2'
						>
							<FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
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
									min: -9,
									max: 39,
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
								'January',
								'February',
								'March',
								'April',
								'May',
								'June',
								'July',
							],
							datasets: [
								{
									label: 'My First dataset',
									backgroundColor: 'transparent',
									borderColor: 'rgba(255,255,255,.55)',
									data: [1, 18, 9, 17, 34, 22, 11],
								},
							],
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default DepositCard;
