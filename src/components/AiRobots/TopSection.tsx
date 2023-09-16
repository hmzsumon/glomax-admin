import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const TopSection = (aiRobots: any) => {
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
	return (
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
								<span className='me-2'>Total Active Ai Robots</span>
								<span>{aiRobots?.length}</span>
							</div>
						</Col>
						<Col>
							<div>
								<span className='me-2'>Total Ai Robots</span>
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
								<span className='me-2'>Total Investment</span>
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
	);
};

export default TopSection;
