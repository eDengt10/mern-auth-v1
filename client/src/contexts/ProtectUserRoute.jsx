import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function ProtectUserPages({ children }) {
    const token = useSelector((state) => state.user.token);
		if (!token) {
			return <Navigate to="/signin" />;
		}
	return children;
}

function ProtectUserAuth({ children }) {
	const token = useSelector((state) => state.user.token);
		if (token) {
			return <Navigate to="/home" />;
		}
	return children;
}

export {ProtectUserPages, ProtectUserAuth};
