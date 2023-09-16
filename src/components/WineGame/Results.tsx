import React from 'react';
import { Card, Container, Table } from 'react-bootstrap';

const Results = ({ results }: { results: any[] }) => {
	return (
		<Container>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Period No</th>
						<th>Wine Number</th>
						<th>Wine Colors</th>
					</tr>
				</thead>
				<tbody>
					{results?.map((result: any, index: number) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{result?.period_no}</td>
							<td>
								<span
									style={{
										// backgroundColor: result?.win_colors[0],
										color: result?.win_colors[0],
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										fontWeight: 'bold',
									}}
								>
									{result?.win_number}
								</span>
							</td>
							<td
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{result?.win_colors?.map((color: string, index: number) => (
									<span
										key={index}
										className='mx-1'
										style={{
											backgroundColor: color,
											display: 'inline-block',
											padding: '2px 5px',
											height: '20px',
											width: '20px',
											borderRadius: '50%',
										}}
									></span>
								))}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Results;
