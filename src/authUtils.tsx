// authUtils.js
import { useSelector } from 'react-redux';

export function getAuthenticationStatus() {
	const { isAuthenticated } = useSelector((state: any) => state.auth);
	return isAuthenticated;
}
