import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectUserPages({ children }) {
    const token = useSelector((state) => state?.user?.token);
		if (!token) {
			return <Navigate to="/signin" />;
		}
	return children;
}

function ProtectUserAuth({ children }) {
	const token = useSelector((state) => state?.user?.token);
		if (token) {
			return <Navigate to="/home" />;
		}
	return children;
}

function InitialPathHandle() {
	const token = useSelector(state=> state?.user?.token)
	if(token) {
		return <Navigate to="/home" />;
	} else {
		return <Navigate to="/signin" />;
	}
}

export {ProtectUserPages, ProtectUserAuth, InitialPathHandle};
