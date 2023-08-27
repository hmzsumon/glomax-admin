import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Actions = ({
	id,
	deleteHandler,
	status,
	editRoute,
	cancelWithdraw,
	method,
}) => {
	const btnRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [action, setAction] = useState('');

	const handleClose = () => {
		setOpen(false);
	};

	// handle change action
	const handleChangeAction = (action) => {
		if (action === 'delete') {
			setAction('delete');
		} else if (action === 'cancel') {
			setAction('cancel');
		}
		setOpen(true);
	};

	// handle action
	const handleAction = () => {
		if (action === 'delete') {
			deleteHandler(id);
		} else if (action === 'cancel') {
			cancelWithdraw(id);
		}
		setOpen(false);
	};

	return (
		<>
			<div className='flex items-center justify-between gap-3'>
				{editRoute !== 'review' && (
					<Link
						to={`/admin/${editRoute}/edit/${id}`}
						state={{
							method,
						}}
						className='p-1 text-blue-600 bg-blue-100 rounded-full hover:bg-blue-200'
					>
						<EditIcon />
					</Link>
				)}
				<button
					ref={btnRef}
					name='cancel'
					onClick={() => handleChangeAction('cancel')}
					className='p-1 text-orange-500 bg-red-100 rounded-full hover:bg-red-200'
				>
					<CancelIcon />
				</button>
				<button
					ref={btnRef}
					name='delete'
					onClick={() => handleChangeAction('delete')}
					className='p-1 text-red-600 bg-red-100 rounded-full disabled:cursor-not-allowed hover:bg-red-200'
					disabled={status === 'pending' ? true : false}
				>
					<DeleteIcon />
				</button>
			</div>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
			>
				<DialogTitle id='alert-dialog-title'>{'Are you sure?'}</DialogTitle>
				<DialogContent>
					<p className='text-gray-500'>
						Do you really want to{' '}
						<span
							className={`${
								action === 'delete' ? 'text-red-500' : 'text-orange-500'
							}`}
						>
							{action === 'delete' ? 'Delete' : 'Cancel'}
						</span>{' '}
						This process cannot be undone.
					</p>
				</DialogContent>
				<DialogActions>
					<button
						onClick={handleClose}
						className='px-6 py-2 text-white bg-gray-400 rounded shadow hover:bg-gray-500'
					>
						No
					</button>
					<button
						onClick={handleAction}
						className='px-6 py-2 ml-4 text-white bg-red-600 rounded shadow hover:bg-red-700'
					>
						Yeas
					</button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default Actions;
