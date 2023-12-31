// components/CopyToClipboard.tsx

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

type CopyToClipboardProps = {
	text: string;
	size?: string;
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setIsCopied(true);
		} catch (error) {
			console.error('Failed to copy text: ', error);
		}
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isCopied) {
			timeout = setTimeout(() => setIsCopied(false), 3000);
		}

		return () => clearTimeout(timeout);
	}, [isCopied]);

	return (
		<div>
			<button
				onClick={copyToClipboard}
				style={{
					backgroundColor: 'transparent',
					border: 'none',
					outline: 'none',
				}}
			>
				<FontAwesomeIcon
					icon={faCopy}
					className={`text-${isCopied ? 'primary ' : 'success'}`}
				/>
			</button>
		</div>
	);
};

export default CopyToClipboard;
