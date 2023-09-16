import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import useSound from 'use-sound';
import { useCreateWinnerMutation } from '@/features/adminWinner/adminWinnerApi';
import {
	useFiveMActiveGameQuery,
	useGetWinGameResultQuery,
	useThreeMActiveGameQuery,
} from '@/features/winGame/winGameApi';
import TimerThree from '@/components/WineGame/TimerThree';
import TimerFive from '@/components/WineGame/TimerFive';
import Participants from '@/components/WineGame/Participants';
import Results from '@/components/WineGame/Results';
import { set } from 'nprogress';

const Game3m = () => {
	const { data, isLoading: g_isLoading, refetch } = useThreeMActiveGameQuery();
	const { game: gameData } = data || {};
	// console.log('gameData', gameData?._id);
	const [createWinner, { isError, isLoading, isSuccess, error }] =
		useCreateWinnerMutation();

	const [play, { stop }] = useSound('/assets/sounds/user-bet.wav', {
		volume: 3,
	});

	const [game, setGame] = useState(gameData);
	// console.log('game', game?._id);

	// setGame
	useEffect(() => {
		setGame(gameData);
	}, [gameData]);
	const {
		data: resultData,
		isLoading: r_isLoading,
		refetch: r_refetch,
	} = useGetWinGameResultQuery('3m');
	const { results } = resultData || [];
	// get first 6 results
	const lastSixResults = results?.slice(0, 6);
	// console.log('lastSixResults', lastSixResults);

	const [participants, setParticipants] = useState([] as any);
	const [btn, setBtn] = useState({} as any);
	const [disabled, setDisabled] = useState(false);
	const [number, setNumber] = useState({} as any);
	const [btnIds, setBtnIds] = useState([] as any);
	const [length, setLength] = useState(0);
	const [fetch, setFetch] = useState(false);
	const [profit, setProfit] = useState<number>(0);
	const [colorCodes, setColorCodes] = useState([] as any);
	const [winner, setWinner] = useState({
		number: '',
		bet_ids: [],
		length: 0,
		color_codes: [],
	} as any);

	// handle set result
	const handleSetResult = (e: any) => {
		// console.log('e', e);
		setBtn(e);
		if (e.btn_id === 'green') {
			const greenArray = [
				game?.buttons[1],
				game?.buttons[3],
				game?.buttons[7],
				game?.buttons[9],
			];
			// select smallest btn from greenArray
			const smallest = greenArray.reduce((prev, current) => {
				return prev.total_amount < current.total_amount ? prev : current;
			});
			setNumber(smallest);
			setBtnIds([e.btn_id, smallest.btn_id]);
			setLength(2);
			setColorCodes(['#388E3C']);
		} else if (e.btn_id === 'red') {
			const redArray = [
				game?.buttons[2],
				game?.buttons[4],
				game?.buttons[6],
				game?.buttons[8],
			];
			// select smallest btn from redArray
			const smallest = redArray.reduce((prev, current) => {
				return prev.total_amount < current.total_amount ? prev : current;
			});
			setNumber(smallest);
			setBtnIds([e.btn_id, smallest.btn_id]);
			setLength(2);
			setColorCodes(['#D32F2F']);
		} else if (e.btn_id === '0') {
			// select smallest number from 0,5
			const smallest = game?.buttons[0];
			setNumber(smallest);
			setBtnIds([e.btn_id, 'red', 'violet']);
			setLength(3);
			setColorCodes(['#6739B6', '#D32F2F']);
		} else if (e.btn_id === '5') {
			// select smallest number from 0,5
			const smallest = game?.buttons[5];
			setNumber(smallest);
			setBtnIds([e.btn_id, 'green', 'violet']);
			setLength(3);
			setColorCodes(['#6739B6', '#388E3C']);
		}
	};

	useEffect(() => {
		setWinner({
			number: number.btn_id,
			bet_ids: btnIds,
			length: length,
			color_codes: colorCodes,
		});
		// set profit
		let winners = [];
		let winAmount = 0;
		for (let i = 0; i < participants.length; i++) {
			if (winner.bet_ids.includes(participants[i].bet_id)) {
				// console.log('winner', participants[i].name);
				winners.push(participants[i]);
			}
		}

		for (let i = 0; i < winners.length; i++) {
			const win = winners[i];
			if (winner.bet_ids.length === 2) {
				winAmount += win.trade_amount * win.multiplier;
			} else if (winner.bet_ids.length === 3) {
				if (win.trade_number === 'red' || win.trade_number === 'green') {
					winAmount += win.trade_amount * 1.5;
				} else {
					winAmount += win.trade_amount * win.multiplier;
				}
			}
		}
		const profit2 = game?.total_trade_amount - winAmount;
		setProfit(profit2);
	}, [number, btnIds, length, colorCodes, participants, winner.bet_ids]);

	// handle confirm winner
	const handleConfirmWinner = () => {
		// send winner to server
		const data = {
			game_id: gameData?._id,
			period_no: gameData?.game_id,
			game_type: gameData?.game_type,
			trade_amount: gameData?.total_trade_amount,
			trade_charge: gameData?.total_trade_charge,
			profit: profit,
			winner: winner,
			participants: participants.length,
		};
		createWinner(data);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Winner confirmed');
			setDisabled(true);
		}

		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError]);

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('get-game', (data) => {
			// console.log('data io', data);
			if (data?.game?.game_type === '3m') {
				play();
				setFetch(true);
				setParticipants(data.participants);
				refetch();
			}
		});

		socket.on('win-result', async (data) => {
			if (data.game_type === '3m') {
				setDisabled(false);
				await r_refetch();
				setTimeout(async () => {
					await refetch();
				}, 6000);
				setDisabled(false);
			}
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.off('get-game'); // Remove the 'get-game' event listener
			socket.off('win-result'); // Remove the 'win-result' event listener
			socket.disconnect();
			// Remove the 'result-pop' event listener
		};
	}, [play]);

	return (
		<AdminLayout>
			<ProtectedRoute>
				<Container>
					<Card className='py-2 my-3'>
						<h3 className='text-center '>Wine Game 3 Minutes</h3>
					</Card>
					<Row>
						{/* Board Section */}
						<Col>
							<div>
								<div>
									<div className=''>
										<TimerThree />
										{game !== null && (
											<Card className='mt-2 '>
												<Card.Body className='gap-2 d-flex'>
													<div className='gap-2 d-flex'>
														<Card.Title>Total Trade</Card.Title>
														<Card.Text>
															{Number(game?.total_trade_amount).toLocaleString(
																'en-US',
																{
																	style: 'currency',
																	currency: 'USD',
																}
															)}
														</Card.Text>
													</div>
													<div className='gap-2 d-flex'>
														<Card.Title>Profit</Card.Title>
														<Card.Text>
															{Number(profit).toLocaleString('en-US', {
																style: 'currency',
																currency: 'USD',
															})}
														</Card.Text>
													</div>
													<div className='gap-2 d-flex'>
														<Card.Title>Participants</Card.Title>
														<Card.Text>{game?.participants}</Card.Text>
													</div>
												</Card.Body>
											</Card>
										)}
									</div>

									{g_isLoading ? (
										<div className=' d-flex justify-content-between align-items-center'>
											<h2>Waiting for the participant...</h2>
										</div>
									) : (
										<>
											<Row className='mt-2 '>
												{/* start Green Btn */}
												<Col>
													<Button
														variant='success'
														style={{
															width: '100%',
														}}
														onClick={() => handleSetResult(game?.buttons[11])}
													>
														{Number(
															game?.buttons[11]?.total_amount
														).toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD',
														})}
													</Button>
													<Row className='gap-2 mt-2 '>
														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 1</span>
																{Number(
																	game?.buttons[1]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 3</span>
																{Number(
																	game?.buttons[3]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
													</Row>
													<Row className='gap-2 mt-2 '>
														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 7</span>
																{Number(
																	game?.buttons[7]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>

														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 9</span>
																{Number(
																	game?.buttons[9]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
													</Row>
												</Col>
												{/* End Green Btn */}

												{/* Start Red Btn */}
												<Col>
													<Button
														variant='danger'
														onClick={() => handleSetResult(game?.buttons[10])}
														style={{
															width: '100%',
														}}
													>
														{Number(
															game?.buttons[10]?.total_amount
														).toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD',
														})}
													</Button>
													<Row className='gap-2 mt-2 '>
														{/* Btn - 2 */}
														<Col>
															<Button
																variant='danger'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 2</span>
																{Number(
																	game?.buttons[2]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
														{/* Btn - 4 */}
														<Col>
															<Button
																variant='danger'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 4</span>
																{Number(
																	game?.buttons[4]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
													</Row>
													<Row className='gap-2 mt-2 '>
														{/* Btn - 6 */}
														<Col>
															<Button
																variant='danger'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 6</span>
																{Number(
																	game?.buttons[6]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
														{/* Btn - 8 */}
														<Col>
															<Button
																variant='danger'
																className=' d-flex justify-content-between align-items-center'
																style={{
																	width: '100%',
																}}
															>
																<span>No: 8</span>
																{Number(
																	game?.buttons[8]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
													</Row>
												</Col>
												{/* End Red Btn */}

												{/* Start Violet Btn */}
												<Col>
													<Button
														variant='violet'
														className=''
														style={{
															backgroundColor: '#8a2be2',
															color: '#fff',
															width: '100%',
														}}
													>
														{Number(
															game?.buttons[12]?.total_amount
														).toLocaleString('en-US', {
															style: 'currency',
															currency: 'USD',
														})}
													</Button>

													<Row className='gap-2 mt-2 '>
														{/* Btn - 0 */}
														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																onClick={() =>
																	handleSetResult(game?.buttons[0])
																}
																style={{
																	backgroundImage:
																		'linear-gradient(160deg, #6739b6 50%, #e54d42 0)',
																	width: '100%',
																}}
															>
																<span>No: 0</span>
																{Number(
																	game?.buttons[0]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
														{/* Btn - 5 */}
														<Col>
															<Button
																variant='success'
																className=' d-flex justify-content-between align-items-center'
																onClick={() =>
																	handleSetResult(game?.buttons[5])
																}
																style={{
																	backgroundImage:
																		'linear-gradient(160deg, #6739b6 50%, #39b54a 0)',
																	width: '100%',
																}}
															>
																<span>No: 5</span>
																{Number(
																	game?.buttons[5]?.total_amount
																).toLocaleString('en-US', {
																	style: 'currency',
																	currency: 'USD',
																})}
															</Button>
														</Col>
													</Row>
												</Col>
												{/* End Violet Btn */}
											</Row>
											<Row className='mt-2 '></Row>
											<Row className='mt-2 '></Row>
										</>
									)}

									{game == null && (
										<>
											<div className=' d-flex justify-content-between align-items-center'>
												<h2>Waiting for the participant...</h2>
											</div>
										</>
									)}
								</div>
							</div>
						</Col>
						{/* End Board Section */}
						<Col>
							<h3>Create Result</h3>
							{/* Show Winner */}
							{winner.length > 0 && (
								<Row>
									<Col className='mt-2'>
										<Row>
											<Col>
												<h5>Number: {winner.number}</h5>
											</Col>
											<Col>
												<h5>
													Colors:
													{winner.color_codes.map((color: any, i: any) => (
														<span
															key={i}
															className='mx-2'
															style={{
																backgroundColor: color,
																width: '20px',
																height: '20px',
																display: 'inline-block',
																borderRadius: '50%',
															}}
														></span>
													))}
												</h5>
											</Col>
										</Row>
									</Col>
									<div className='mt-1 '>
										<Button
											variant='warning'
											disabled={disabled}
											onClick={() => handleConfirmWinner()}
											style={{
												cursor: disabled ? 'not-allowed' : 'pointer',
												width: '100%',
											}}
										>
											Confirm
										</Button>
									</div>
								</Row>
							)}
							<Row className='my-2 '>
								<Results results={lastSixResults} />
							</Row>
						</Col>
					</Row>
					<Row>
						<Card className='py-2 my-3'>
							<h4 className='text-center '>Wine Game 3 Minutes Participants</h4>
						</Card>
						{game !== null && <Participants id={game?._id} />}
					</Row>
				</Container>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Game3m;
