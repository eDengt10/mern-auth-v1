import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectUserPages({ children }) {
	const token = useSelector((state) => state?.user?.token);
	if (!token) {
		return <Navigate to="/signin" replace />;
	}
	return children;
}

function ProtectUserAuth({ children }) {
	const adminToken = useSelector((state) => state?.admin?.adminToken);
	const token = useSelector((state) => state?.user?.token);
	if (token) {
		return <Navigate to="/home" replace />;
	} else  if (adminToken) {
		return <Navigate to="/admin" replace />;
	}

	return children;
}

function InitialPathHandle() {
	const token = useSelector((state) => state?.user?.token);
	const adminToken = useSelector((state) => state?.admin?.adminToken);

	return !token && !adminToken ? (
		<Navigate to="/signin" replace />
	) : (
		<Navigate to="/home" replace />
	);
}

function ProtectAdminPages({ children }) {
	const adminToken = useSelector((state) => state?.admin?.adminToken);
	if (!adminToken) {
		return <Navigate to="/admin/signin" replace />;
	}
	return children;
}

function ProtectAdminAuth({ children }) {
	const adminToken = useSelector((state) => state?.admin?.adminToken);
	const token = useSelector((state) => state?.user?.token);

	if (adminToken) {
		return <Navigate to="/admin/home" replace />;
	} else  if (token) {
		return <Navigate to="/home" replace />;
	}

	return children;
}

function AdminInitialPathHandle() {
	const adminToken = useSelector((state) => state?.admin?.adminToken);
	const token = useSelector((state) => state?.user?.token);

	return !adminToken && !token ? (

		<Navigate to="/admin/signin" replace />
	) : (
		<Navigate to="/admin/home" replace />
	);
}

export {
	ProtectUserPages,
	ProtectUserAuth,
	InitialPathHandle,
	ProtectAdminPages,
	ProtectAdminAuth,
	AdminInitialPathHandle,
};
