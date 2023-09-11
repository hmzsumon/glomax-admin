import {
	faArrowDown,
	faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const AiRobotCard = () => {
	return (
		<div>
			<Card bg='danger' text='white' className='mb-4'>
				<Card.Body className='pb-0 d-flex justify-content-between align-items-start'>
					<div>
						<div className='fs-4 fw-semibold'>
							44K
							<span className='fs-6 ms-2 fw-normal'>
								(-23.6%
								<FontAwesomeIcon icon={faArrowDown} fixedWidth />)
							</span>
						</div>
						<div>Sessions</div>
					</div>
					<Dropdown align='end'>
						<Dropdown.Toggle
							as='button'
							bsPrefix='btn'
							className='p-0 text-white shadow-none btn-link rounded-0'
							id='dropdown-chart4'
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
					<Bar
						options={{
							maintainAspectRatio: false,
							plugins: {
								legend: {
									display: false,
								},
							},
							scales: {
								x: {
									grid: {
										display: false,
										drawTicks: false,
									},
									ticks: {
										display: false,
									},
								},
								y: {
									grid: {
										display: false,
										drawBorder: false,
										drawTicks: false,
									},
									ticks: {
										display: false,
									},
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
								'August',
								'September',
								'October',
								'November',
								'December',
								'January',
								'February',
								'March',
								'April',
							],
							datasets: [
								{
									label: 'My First dataset',
									backgroundColor: 'rgba(255,255,255,.2)',
									borderColor: 'rgba(255,255,255,.55)',
									data: [
										78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67,
										82,
									],
									barPercentage: 0.6,
								},
							],
						}}
					/>
				</div>
			</Card>
		</div>
	);
};

export default AiRobotCard;
