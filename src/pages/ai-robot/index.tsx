import React from 'react';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import { AdminLayout } from '@layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useGetAllAiRobotForAdminQuery } from '@/features/aiRobot/aiRobotApi';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formDateWithTime } from '@/lib/functions';
import { DataGrid } from '@mui/x-data-grid';

const AiRobots: NextPage = () => {
	const { data, isLoading, isError, isSuccess, error } =
		useGetAllAiRobotForAdminQuery(undefined);
	const { aiRobots } = data || [];

	// total completed ai robot
	const totalCompletedAiRobot = aiRobots?.filter(
		(aiRobot: any) => aiRobot.status === 'completed'
	).length;

	// total canceled ai robot
	const totalCanceledAiRobot = aiRobots?.filter(
		(aiRobot: any) => aiRobot.status === 'canceled'
	).length;

	// total active ai robots
	const totalActiveAiRobot = aiRobots?.filter(
		(aiRobot: any) => aiRobot.is_active === true
	).length;

	// get total ai robot investment
	const totalInvestment = aiRobots?.reduce((acc: any, aiRobot: any) => {
		return acc + aiRobot.total_investment;
	}, 0);

	// total ai robot active investment by status = is_active
	const totalActiveInvestment = aiRobots
		?.filter((aiRobot: any) => aiRobot.is_active === true)
		.reduce((acc: any, aiRobot: any) => {
			return acc + aiRobot.current_investment;
		}, 0);
	// total profit
	const totalProfit = aiRobots?.reduce((acc: any, aiRobot: any) => {
		return acc + aiRobot.profit;
	}, 0);

	const columns = [
		{
			field: 'date',
			headerName: 'Created At',
			width: 180,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.date}</p>
				</div>
			),
		},
		{
			field: 'endDate',
			headerName: 'Close At',
			width: 180,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.endDate}</p>
				</div>
			),
		},

		{
			field: 'is_claimed',
			headerName: 'Claimed',
			width: 100,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					{params.row.status === 'pending' && !params.row.is_claimed && (
						<p className='text-warning '>
							<span>Pending</span>
						</p>
					)}

					{params.row.status === 'pending' && params.row.is_claimed && (
						<p className='text-success '>
							<span>Ready</span>
						</p>
					)}

					{params.row.status === 'completed' && !params.row.is_claimed && (
						<p className='text-danger'>
							<span>Done</span>
						</p>
					)}

					{params.row.status === 'cancelled' && !params.row.is_claimed && (
						<p className='text-danger'>
							<span>Cancelled</span>
						</p>
					)}
				</div>
			),
		},
		{
			field: 'customer_id',
			headerName: 'Customer ID',
			width: 100,
			renderCell: (params: any) => (
				<div className='flex items-center gap-2 text-xs'>
					<p>{params.row.customer_id}</p>
				</div>
			),
		},

		{
			field: 'investment',
			headerName: 'Investment',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center gap-2 text-xs'>
						<p>
							{params.row.investment?.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'profit',
			headerName: 'Profit',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center gap-2 text-xs'>
						<p>
							{params.row.profit?.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					</div>
				);
			},
		},
		{
			field: 'gird',
			headerName: 'Grid',
			width: 50,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center gap-2 text-xs'>
						<p>{params.row.gird}</p>
					</div>
				);
			},
		},
		{
			field: 'percent',
			headerName: 'Percent',
			width: 80,
			renderCell: (params: any) => {
				return (
					<>
						{params.row.status === 'completed' && (
							<div className='flex items-center gap-2 text-xs'>
								<p>{params.row.percent}</p>
							</div>
						)}
						{params.row.status === 'pending' && (
							<p className='text-warning '>
								<span>Pending</span>
							</p>
						)}
						{params.row.status === 'cancelled' && (
							<p className='text-danger '>
								- <span>{params.row.cancelCharge}</span>
							</p>
						)}
					</>
				);
			},
		},

		{
			field: 'status',
			headerName: 'Status',
			width: 100,
			renderCell: (params: any) => {
				return (
					<div className='flex items-center'>
						{params.row.status === 'completed' && (
							<p className='text-success '>
								<span>Completed</span>
							</p>
						)}
						{params.row.status === 'cancelled' && (
							<p className='text-danger '>
								<span>
									{params.row.status.charAt(0).toUpperCase() +
										params.row.status.slice(1)}
								</span>
							</p>
						)}

						{params.row.status === 'pending' && (
							<p className='text-warning '>
								<span>Pending</span>
							</p>
						)}
					</div>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 60,
			renderCell: (params: any) => {
				return (
					<div
						className='d-flex align-items-center justify-content-center w-100'
						style={{ cursor: 'pointer' }}
					>
						<Link href={`/ai-robot/${params.row.id}`} passHref>
							<FontAwesomeIcon icon={faEye} />
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any = [];

	aiRobots &&
		aiRobots.map((robot: any) => {
			return rows.unshift({
				id: robot._id,
				status: robot.status,
				customer_id: robot.customer_id,
				date: formDateWithTime(robot.createdAt),
				endDate: formDateWithTime(robot.close_time),
				is_active: robot.is_active,
				investment: robot.current_investment,
				profit: robot.take_profit,
				gird: robot.grid_no,
				percent: robot.profit_percent,
				cancelCharge: robot.cancel_charge,
				is_claimed: robot.is_claimed,
			});
		});

	return (
		<AdminLayout>
			<ProtectedRoute>
				{isLoading ? (
					<Container fluid>
						<Row>
							<Col>
								<Card>
									<Card.Body>
										<Card.Text>Loading...</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>
				) : (
					<>
						{/* Top */}
						<Card>
							<Card.Header>
								<Card.Title as='h5' className='text-center'>
									Ai Robot
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Card.Text>
									<Row>
										<Col>
											<div>
												<span className='me-2'>Total Ai Robots</span>
												<span>{aiRobots?.length}</span>
											</div>
										</Col>
										<Col>
											<div>
												<span className='me-2'>Total Active Robots</span>
												<span>{totalActiveAiRobot}</span>
											</div>
										</Col>
										<Col>
											<div>
												<span className='me-2'>Total Canceled Ai Robots</span>
												<span>{totalCanceledAiRobot}</span>
											</div>
										</Col>
									</Row>
									<Row className='mt-2 '>
										<Col>
											<div>
												<span className='me-2'>Total Investment</span>
												<span>
													{totalInvestment?.toLocaleString('en-US', {
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
													{totalActiveInvestment?.toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</span>
											</div>
										</Col>
										<Col>
											<div>
												<span className='me-2'>Total Profit</span>
												<span>
													{totalProfit?.toLocaleString('en-US', {
														style: 'currency',
														currency: 'USD',
													})}
												</span>
											</div>
										</Col>
									</Row>
								</Card.Text>
								<Card.Text></Card.Text>
							</Card.Body>
						</Card>
						{/*End Top */}
						<div className='my-4 '>
							<DataGrid rows={rows} columns={columns} />
						</div>
					</>
				)}
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default AiRobots;
