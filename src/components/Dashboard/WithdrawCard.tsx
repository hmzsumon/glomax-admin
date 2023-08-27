import {
	faArrowUp,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

const WithdrawCard = () => {
	return (
		<div className='col-sm-6 col-lg-3'>
			<Card bg='warning' text='white' className='mb-4'>
				<Card.Body className='pb-0 d-flex justify-content-between align-items-start'>
					<div>
						<div className='fs-4 fw-semibold'>
							2.49%
							<span className='fs-6 ms-2 fw-normal'>
								(84.7%
								<FontAwesomeIcon icon={faArrowUp} fixedWidth />)
							</span>
						</div>
						<div>Conversion Rate</div>
					</div>
					<Dropdown align='end'>
						<Dropdown.Toggle
							as='button'
							bsPrefix='btn'
							className='p-0 text-white shadow-none btn-link rounded-0'
							id='dropdown-chart3'
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
									display: false,
								},
								y: {
									display: false,
								},
							},
							elements: {
								line: {
									borderWidth: 2,
									tension: 0.4,
								},
								point: {
									radius: 0,
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
									backgroundColor: 'rgba(255,255,255,.2)',
									borderColor: 'rgba(255,255,255,.55)',
									data: [78, 81, 80, 45, 34, 12, 40],
									fill: true,
								},
							],
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default WithdrawCard;
